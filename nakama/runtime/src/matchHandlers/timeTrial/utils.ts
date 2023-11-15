import {
	TimeTrialClientMessage,
	TimeTrialClientOpCode,
	TimeTrialServerMessage,
	TimeTrialServerOpCode
} from 'shared'

/**
 * Utility function to create a server message based on the opcode.
 */
export const createServerMessage = <T extends TimeTrialServerOpCode>(
	opcode: T,
	data: TimeTrialServerMessage[T]
): [opcode: number, data: string] => {
	return [opcode, JSON.stringify(data)]
}

/**
 * Utility function to extract the data from a client message based on the
 * opcode.
 */
export const extractClientMessageData = <T extends TimeTrialClientOpCode>(
	nk: nkruntime.Nakama,
	data: ArrayBuffer,
	opCode: T
) => {
	return JSON.parse(nk.binaryToString(data)) as TimeTrialClientMessage[T]
}
