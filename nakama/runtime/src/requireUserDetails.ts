/**
 * Utility to require a username to be present in the context. Call this
 * function immediately when an RPC is called.
 */
export const requireUserDetails = (ctx: nkruntime.Context) => {
	if (!ctx.username || !ctx.username.length || !ctx.userId || !ctx.userId.length) {
		throw new Error('Error: username and userId is required')
	}
}
