import type { Presence } from '@heroiclabs/nakama-js'
import { currentWritable, type CurrentWritable } from '@threlte/core'
import {
	timeTrialClientOpCodes,
	TimeTrialMatchState,
	timeTrialServerOpCodes,
	type TimeTrialClientMessages,
	type TimeTrialServerMessages
} from 'shared'
import { AbstractMatchManager } from '../AbstractMatchManager'
import { SocketManager } from '../SocketManager'

export class TimeTrialMatchManager extends AbstractMatchManager<
	TimeTrialClientMessages,
	TimeTrialServerMessages
> {
	// define state here
	public matchState: CurrentWritable<TimeTrialMatchState> = currentWritable(
		TimeTrialMatchState.WarmUp
	)
	public players: Presence[] = []

	constructor(matchId: string) {
		super(matchId, SocketManager.socket, timeTrialClientOpCodes, timeTrialServerOpCodes)
		this.matchState.set(TimeTrialMatchState.WarmUp)
	}

	protected processMessage<OpCode extends keyof TimeTrialServerMessages>(
		message: OpCode extends keyof TimeTrialServerMessages
			? TimeTrialServerMessages[OpCode] & { opCode: OpCode }
			: never
	): void {
		// incoming server message! process it here with a switch statement, e.g.:
		switch (message.opCode) {
			case 'GameUpdate':
				this.matchState.set(message.matchState)
				break

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
