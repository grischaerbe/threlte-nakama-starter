import {
	TimeTrialClientMessage,
	TimeTrialServerMessage,
	timeTrialClientOpCodes,
	timeTrialServerOpCodes
} from 'shared'
import { createMessageUtilities } from '../utils'

/**
 * HOF to create the message utilities for the time trial match.
 */
export const createTimeTrialMessageUtils = (nk: nkruntime.Nakama, logger: nkruntime.Logger) => {
	return createMessageUtilities<TimeTrialServerMessage, TimeTrialClientMessage>(
		nk,
		timeTrialServerOpCodes,
		timeTrialClientOpCodes,
		logger
	)
}
