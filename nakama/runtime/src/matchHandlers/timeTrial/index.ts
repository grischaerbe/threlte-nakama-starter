/**
 * Example Match Handler: Time Trial
 */

import { TimeTrialMatchState } from 'shared'
import { createTimeTrialMessageUtils } from './createTimeTrialMessageUtils'

type State = {
	matchState: TimeTrialMatchState
	players: {
		[userId: string]: {
			presence: nkruntime.Presence
		}
	}
}

export const matchInit: nkruntime.MatchInitFunction<State> = (ctx, logger, nk, params) => {
	return {
		label: 'match-label',
		state: {
			matchState: TimeTrialMatchState.WarmUp,
			players: {}
		},
		tickRate: 10
	}
}

export const matchJoinAttempt: nkruntime.MatchJoinAttemptFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	presence,
	metadata
) => {
	return {
		accept: true,
		state
	}
}

export const matchJoin: nkruntime.MatchJoinFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	presences
) => {
	presences.forEach(function (p) {
		state.players[p.userId] = {
			presence: p
		}
	})

	// create the message utilities
	const { createServerMessage } = createTimeTrialMessageUtils(nk, logger)

	// update the joined players with the current game state
	dispatcher.broadcastMessageDeferred(
		...createServerMessage('GameUpdate', {
			matchState: state.matchState
		}),
		presences
	)

	return {
		state
	}
}

export const matchLeave: nkruntime.MatchLeaveFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	presences
) => {
	presences.forEach(function (p) {
		delete state.players[p.userId]
	})

	return {
		state
	}
}

export const matchLoop: nkruntime.MatchLoopFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	messages
) => {
	// update the game state here!
	// create the message utilities
	const { processClientMessages } = createTimeTrialMessageUtils(nk, logger)

	processClientMessages(messages, (message) => {
		switch (message.opCode) {
			case 'Update':
				// update the player's state
				const { position } = message.data() // use the data function to get the data
				break
			case 'Ready':
				// update the player's ready state
				message.data // etc.
				break
			default:
				break
		}
	})

	return {
		state
	}
}

export const matchTerminate: nkruntime.MatchTerminateFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	graceSeconds
) => {
	logger.debug('Lobby match terminated')

	return {
		state
	}
}

export const matchSignal: nkruntime.MatchSignalFunction<State> = (
	ctx,
	logger,
	nk,
	dispatcher,
	tick,
	state,
	data
) => {
	return {
		state
	}
}
