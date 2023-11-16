export enum TimeTrialMatchState {
	WarmUp = 0,
	InProgress = 1,
	CoolDown = 2
}

export type TimeTrialServerMessage = {
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

export type TimeTrialClientMessage = {
	Ready: {}
	Update: {
		position: number
	}
}

export const timeTrialServerOpCodes: { [K in keyof TimeTrialServerMessage]: number } = {
	GameUpdate: 1,
	MatchFinished: 2,
	MatchRestart: 3,
	MatchStarted: 4
}

export const timeTrialClientOpCodes: { [K in keyof TimeTrialClientMessage]: number } = {
	Ready: 1,
	Update: 2
}
