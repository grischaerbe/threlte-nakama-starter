import type { Presence } from '@heroiclabs/nakama-js'
import { currentWritable, type CurrentWritable } from '@threlte/core'
import {
	TimeTrialClientOpCode,
	TimeTrialMatchState,
	TimeTrialServerOpCode,
	type TimeTrialClientMessage,
	type TimeTrialServerMessage
} from 'shared'
import { AbstractMatchManager } from '../AbstractMatchManager'
import { SocketManager } from '../SocketManager'

export class TimeTrialMatchManager extends AbstractMatchManager<
	typeof TimeTrialClientOpCode,
	typeof TimeTrialServerOpCode,
	TimeTrialClientMessage,
	TimeTrialServerMessage
> {
	// define state here
	public matchState: CurrentWritable<TimeTrialMatchState> = currentWritable(
		TimeTrialMatchState.WarmUp
	)
	public players: Presence[] = []

	constructor(matchId: string) {
		super(matchId, SocketManager.socket, TimeTrialClientOpCode, TimeTrialServerOpCode)
		this.matchState.set(TimeTrialMatchState.WarmUp)
	}

	protected processMessage<OpCode extends keyof TimeTrialServerMessage>(
		message: OpCode extends keyof TimeTrialServerMessage
			? { opcode: OpCode; data: TimeTrialServerMessage[OpCode] }
			: never
	): void {
		// incoming server message! process it here with a switch statement, e.g.:
		switch (message.opcode) {
			case TimeTrialServerOpCode.GameUpdate:
				this.matchState.set(message.data.matchState)
				break
			// …
			default:
				break
		}
	}

	protected processJoins(joins: Presence[]): void {
		// process player joins here, e.g.:
		this.players.push(...joins)
	}

	protected processLeaves(leaves: Presence[]): void {
		// process player leaves here, e.g.:
		this.players = this.players.filter(
			(player) => !leaves.some((leave) => leave.user_id === player.user_id)
		)
	}

	protected onJoin(): void {}

	protected onLeave(): void {}
}
