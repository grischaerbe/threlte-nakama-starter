import { SessionManager } from '../../../lib/nakama/SessionManager'
import { SocketManager } from '../../../lib/nakama/SocketManager'
import { TimeTrialMatchManager } from '../../../lib/nakama/TimeTrial/TimeTrialMatchManager'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
	// we need the session here, so we await it
	await SessionManager.awaitSession()

	// realtime matches need the socket, so we connect it here
	await SocketManager.connect()

	const matchManager = new TimeTrialMatchManager(params.matchId)

	await matchManager.join()

	return {
		matchManager
	}
}) satisfies PageLoad
