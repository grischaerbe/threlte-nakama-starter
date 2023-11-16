import {
	TimeTrialClientMessages,
	TimeTrialServerMessages,
	timeTrialClientOpCodes,
	timeTrialServerOpCodes
} from 'shared'
import { createMessageUtilities } from '../utils'

/**
 * HOF to create the message utilities for the time trial match.
 */
export const createTimeTrialMessageUtils = (nk: nkruntime.Nakama, logger: nkruntime.Logger) => {
	return createMessageUtilities<TimeTrialServerMessages, TimeTrialClientMessages>(
		nk,
		timeTrialServerOpCodes,
		timeTrialClientOpCodes,
		logger
	)
}
