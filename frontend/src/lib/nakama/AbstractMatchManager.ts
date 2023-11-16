import type { Match, MatchData, MatchPresenceEvent, Presence, Socket } from '@heroiclabs/nakama-js'

// Distributive conditional type
type ServerMessageType<
	ServerMessage extends Record<string, unknown>,
	OpCode extends keyof ServerMessage
> = OpCode extends keyof ServerMessage
	? ServerMessage[OpCode] & {
			opCode: OpCode
	  }
	: never

/**
 * This is an abstract class to extend actual MatchManagers from to support different
 * modes, states and OpCodes.
 */
export abstract class AbstractMatchManager<
	ClientMessages extends Record<string, unknown>,
	ServerMessages extends Record<string, unknown>
> {
	public matchId: string
	public match: Match | undefined
	public socket: Socket

	private clientOpCodes: { [K in keyof ClientMessages]: number }
	private inverseServerOpCodes: Map<number, keyof ServerMessages>

	private textDecoder = new TextDecoder()
	private sendOrReceiveMessages = false

	constructor(
		matchId: string,
		socket: Socket,
		clientOpCodes: { [K in keyof ClientMessages]: number },
		serverOpCodes: { [K in keyof ServerMessages]: number }
	) {
		this.socket = socket
		this.matchId = matchId
		this.clientOpCodes = clientOpCodes
		this.inverseServerOpCodes = new Map(
			Object.entries(serverOpCodes).map(([key, value]) => [value, key])
		)
	}

	protected abstract processMessage<OpCode extends keyof ServerMessages>(
		message: ServerMessageType<ServerMessages, OpCode>
	): void

	protected abstract processJoins(joins: Presence[]): void

	protected abstract processLeaves(leaves: Presence[]): void

	protected abstract onJoin(): void

	protected abstract onLeave(): void

	private onMatchData(matchData: MatchData) {
		if (!this.sendOrReceiveMessages) return
		const data = JSON.parse(this.textDecoder.decode(matchData.data))
		// opcode is a number and needs to be looked up in the opcodes map
		const stringOpCode = this.inverseServerOpCodes.get(matchData.op_code)
		if (!stringOpCode) {
			console.warn(`Unknown OpCode: ${matchData.op_code}`)
			return
		}
		const message = {
			...data,
			opCode: stringOpCode
		}
		this.processMessage(message as ServerMessageType<ServerMessages, keyof ServerMessages>)
	}

	public async send<T extends keyof ClientMessages>(opCode: T, data: ClientMessages[T]) {
		if (!this.sendOrReceiveMessages) return
		// opCode is string and needs to be looked up in the map
		const oc = this.clientOpCodes[opCode]
		await this.socket.sendMatchState(this.matchId, oc, JSON.stringify(data))
	}

	private onMatchPresence(matchPresence: MatchPresenceEvent) {
		if (!this.sendOrReceiveMessages) return
		if (matchPresence.joins && matchPresence.joins.length) {
			this.processJoins(matchPresence.joins)
		}
		if (matchPresence.leaves && matchPresence.leaves.length) {
			this.processLeaves(matchPresence.leaves)
		}
	}

	async join() {
		this.sendOrReceiveMessages = true
		this.socket.onmatchdata = this.onMatchData.bind(this)
		this.socket.onmatchpresence = this.onMatchPresence.bind(this)
		this.match = await this.socket.joinMatch(this.matchId)
		if (this.match.presences && this.match.presences.length) {
			this.processJoins(this.match.presences)
		}
		this.onJoin()
	}

	async leave() {
		if (!this.match) return
		// we set this early in order to prevent sending or receiving messages
		this.sendOrReceiveMessages = false
		await this.socket.leaveMatch(this.matchId)
		this.match = undefined
		this.onLeave()
	}
}
