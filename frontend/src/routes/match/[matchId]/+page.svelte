<script lang="ts">
	import { onDestroy } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	data.matchManager.on('MatchRestart', (message) => {
		console.log('Match is restarting!')
	})

	onDestroy(() => {
		data.matchManager.leave()
	})
</script>
