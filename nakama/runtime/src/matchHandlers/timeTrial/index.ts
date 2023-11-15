/**
 * Example Match Handler: Time Trial
 */

import { TimeTrialMatchState, TimeTrialServerOpCode } from 'shared'
import { createServerMessage } from './utils'

type State = {
	matchState: TimeTrialMatchState
	players: {
		[userId: string]: {
			presence: nkruntime.Presence
		}
	}
}

export const matchInit: nkruntime.MatchInitFunction<State> = (ctx, logger, nk, params) => {
	// create the leaderboard

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

	// update the joined players with the current game state
	dispatcher.broadcastMessageDeferred(
		...createServerMessage(TimeTrialServerOpCode.GameUpdate, {
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
