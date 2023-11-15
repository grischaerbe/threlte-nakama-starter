// we're a game! No SSR for us!
export const ssr = false

import { v4 } from 'uuid'
import { SessionManager } from '../lib/nakama/SessionManager'
import type { LayoutLoad } from './$types'

// This enables easy, device-id based authentication for the game.

export const load = (async () => {
	const sessionRestored = await SessionManager.restore()

	if (!sessionRestored) {
		let deviceId = localStorage.getItem('deviceId')
		if (!deviceId) {
			deviceId = v4()
			localStorage.setItem('deviceId', deviceId)
		}
		await SessionManager.signInWithDeviceId(deviceId)
	}
}) satisfies LayoutLoad

/*
// This enables protected routes that are not available without
// authentication as well as authentication with Google Auth and
// redirection to the original target route.

import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'
import { SessionManager } from '../lib/nakama/SessionManager'
import type { LayoutLoad } from './$types'

export const load = (async ({ route, url, depends }) => {
	// we depend on the authenticated state
	depends('app:authenticated')

	// if we're not in the browser, we're just going to return nothing,
	// we're in a game, so server-side rendering doesn't matter
	if (!browser) {
		return {
			authenticated: false
		}
	}

	// if there's a session, return that we're authenticated
	if (SessionManager.isValidSession()) {
		return {
			authenticated: true
		}
	}

	// if there's no session, we try to restore it
	const restored = await SessionManager.restore()

	// if this is successful, we return that we're authenticated
	if (restored) {
		return {
			authenticated: true
		}
	}

	// all routes except the main route are protected
	const onProtectedRoute = route.id !== '/'

	if (onProtectedRoute) {
		// if we're on a protected route, we redirect to the main route to log in
		// and pass the current route as a redirect query param
		throw redirect(302, '/?redirect=' + encodeURIComponent(url.pathname))
	} else {
		// if there is a redirect query param (see above), we pass it along
		return {
			redirectTo: url.searchParams.get('redirect') ?? undefined,
			authenticated: false
		}
	}
}) satisfies LayoutLoad
*/
