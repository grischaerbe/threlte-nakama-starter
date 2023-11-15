<script lang="ts">
	import { goto, invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { GoogleSignInResponse } from '../Google/types'
	import { SessionManager } from '../../nakama/SessionManager'

	export let redirectUrl: string | undefined = undefined

	onMount(async () => {
		await SessionManager.restore()
	})

	const googleAuthCallback = async (args: GoogleSignInResponse) => {
		await SessionManager.signInWithGoogle(args.credential)
		await invalidate('app:authenticated')
		if (redirectUrl) goto(redirectUrl)
	}
</script>

<slot {googleAuthCallback} />
