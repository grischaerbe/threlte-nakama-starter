// Distributive conditional type
type ClientMessageType<
	ClientMessage extends Record<string, unknown>,
	OpCode extends keyof ClientMessage
> = OpCode extends keyof ClientMessage
	? {
			data: ClientMessage[OpCode]
			opCode: OpCode
			sender: nkruntime.Presence
			receiveTimeMs: number
	  }
	: never

export const createMessageUtilities = <
	ServerMessageTypes extends Record<string, unknown>,
	ClientMessageTypes extends Record<string, unknown>
>(
	nk: nkruntime.Nakama,
	serverOpCodes: Record<keyof ServerMessageTypes, number>,
	clientOpCodes: Record<keyof ClientMessageTypes, number>,
	logger: nkruntime.Logger
) => {
	const inverseClientOpCodes = Object.fromEntries(
		Object.entries(clientOpCodes).map(([key, value]) => [value, key])
	) as Record<number, keyof ClientMessageTypes>

	/**
	 * Utility function to create a server message based on the opcode.
	 */
	const createServerMessage = <T extends keyof ServerMessageTypes>(
		opCode: T,
		data: ServerMessageTypes[T]
	): [opcode: number, data: string] => {
		return [serverOpCodes[opCode], JSON.stringify(data)]
	}

	/**
	 * Utility function to type and extract the data from a client message based on the
	 * opcode.
	 */
	const extractClientMessageData = <T extends keyof ClientMessageTypes>(
		data: ArrayBuffer,
		opCode: T
	) => {
		return JSON.parse(nk.binaryToString(data)) as ClientMessageTypes[T]
	}

	/**
	 * Utility function to process client messages based on the opcode.
	 */
	const processClientMessages = <OpCode extends keyof ClientMessageTypes>(
		messages: nkruntime.MatchMessage[],
		callback: (message: ClientMessageType<ClientMessageTypes, OpCode>) => void
	) => {
		for (const message of messages) {
			const stringOpCode = inverseClientOpCodes[message.opCode]
			if (!stringOpCode) {
				logger.warn(`Unknown OpCode: ${message.opCode}`)
				continue
			}
			const data = JSON.parse(nk.binaryToString(message.data))
			callback({
				data,
				opCode: stringOpCode,
				sender: message.sender,
				receiveTimeMs: message.receiveTimeMs
			} as ClientMessageType<ClientMessageTypes, OpCode>)
		}
	}

	return {
		createServerMessage,
		extractClientMessageData,
		processClientMessages
	}
}
