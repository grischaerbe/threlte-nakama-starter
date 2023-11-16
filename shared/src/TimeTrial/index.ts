export enum TimeTrialMatchState {
	WarmUp = 0,
	InProgress = 1,
	CoolDown = 2
}

export type TimeTrialServerMessages = {
	GameUpdate: {
		matchState: TimeTrialMatchState
	}
	MatchStarted: {}
	MatchFinished: {}
	MatchRestart: {
		trackId: string
		matchStartTime: number
		matchEndTime: number
		restartMatchTime: number
		matchDurationInMs: number
		serverTime: number
	}
}

export type TimeTrialClientMessages = {
	Ready: {}
	Update: {
		position: number
	}
}

export const timeTrialServerOpCodes: { [K in keyof TimeTrialServerMessages]: number } = {
	GameUpdate: 1,
	MatchFinished: 2,
	MatchRestart: 3,
	MatchStarted: 4
}

export const timeTrialClientOpCodes: { [K in keyof TimeTrialClientMessages]: number } = {
	Ready: 1,
	Update: 2
}
