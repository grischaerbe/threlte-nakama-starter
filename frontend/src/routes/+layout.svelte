<script lang="ts">
	import '../app.postcss'

	export let data
</script>

<!-- Use this with the alternative layout.ts file -->
<!-- {#if data.authenticated}
	<div>authenticated!</div>
{:else}
	<SignIn redirectUrl={data.redirectTo}>
		<svelte:fragment let:googleAuthCallback>
			<GoogleLogin clientId={'GOOGLE CLIENT ID'} callback={googleAuthCallback} />
		</svelte:fragment>
	</SignIn>
{/if} -->
