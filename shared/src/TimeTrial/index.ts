export enum TimeTrialMatchState {
	WarmUp = 0,
	InProgress = 1,
	CoolDown = 2
}

export enum TimeTrialClientOpCode {
	NoOp,
	Ready
}

export enum TimeTrialServerOpCode {
	NoOp,
	GameUpdate,
	MatchStarted,
	MatchFinished,
	MatchRestart
}

export type TimeTrialServerMessage = {
	[TimeTrialServerOpCode.NoOp]: {}
	[TimeTrialServerOpCode.GameUpdate]: {
		matchState: TimeTrialMatchState
	}
	[TimeTrialServerOpCode.MatchStarted]: {}
	[TimeTrialServerOpCode.MatchFinished]: {}
	[TimeTrialServerOpCode.MatchRestart]: {
		trackId: string
		matchStartTime: number
		matchEndTime: number
		restartMatchTime: number
		matchDurationInMs: number
		serverTime: number
	}
}

export type TimeTrialClientMessage = {
	[TimeTrialClientOpCode.NoOp]: {}
	[TimeTrialClientOpCode.Ready]: {}
}
