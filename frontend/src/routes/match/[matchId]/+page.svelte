<script lang="ts">
	import { onDestroy } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	onDestroy(() => {
		data.matchManager.leave()
	})
</script>
