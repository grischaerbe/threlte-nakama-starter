import {
	matchInit,
	matchJoin,
	matchJoinAttempt,
	matchLeave,
	matchLoop,
	matchSignal,
	matchTerminate
} from './matchHandlers/timeTrial'

/**
 * Use this function to guard parts of the api.
 */
const guardFunction = function () {
	return null
}

const InitModule: nkruntime.InitModule = function (ctx, logger, nk, initializer) {
	logger.info('Initializing module')

	// Register as an after hook for the appropriate feature, this call should be in InitModule.
	initializer.registerRpc('some_function', someFunction)

	// match stuff
	initializer.registerMatch('time_trial', {
		matchInit: matchInit,
		matchJoinAttempt: matchJoinAttempt,
		matchJoin: matchJoin,
		matchLeave: matchLeave,
		matchLoop: matchLoop,
		matchSignal: matchSignal,
		matchTerminate: matchTerminate
	})

	// guard fns
	// initializer.registerRtBefore('ChannelJoin', guardFunction)
	// initializer.registerRtBefore('ChannelLeave', guardFunction)
	// initializer.registerRtBefore('ChannelMessageSend', guardFunction)
	// initializer.registerRtBefore('ChannelMessageUpdate', guardFunction)
	// initializer.registerRtBefore('ChannelMessageRemove', guardFunction)
	// initializer.registerRtBefore('MatchCreate', guardFunction)
	// initializer.registerRtBefore('MatchDataSend', guardFunction)
	// initializer.registerRtBefore('MatchJoin', guardFunction)
	// initializer.registerRtBefore('MatchLeave', guardFunction)
	// initializer.registerRtBefore('MatchmakerAdd', guardFunction)
	// initializer.registerRtBefore('MatchmakerRemove', guardFunction)
	// initializer.registerRtBefore('Ping', guardFunction)
	// initializer.registerRtBefore('Pong', guardFunction)
	// initializer.registerRtBefore('StatusFollow', guardFunction)
	// initializer.registerRtBefore('StatusUnfollow', guardFunction)
	// initializer.registerRtBefore('StatusUpdate', guardFunction)
	// initializer.registerBeforeUpdateAccount(guardFunction)
	// initializer.registerBeforeAuthenticateApple(guardFunction)
	// initializer.registerBeforeAuthenticateCustom(guardFunction)
	// initializer.registerBeforeAuthenticateDevice(guardFunction)
	// initializer.registerBeforeAuthenticateEmail(guardFunction)
	// initializer.registerBeforeAuthenticateFacebook(guardFunction)
	// initializer.registerBeforeAuthenticateFacebookInstantGame(guardFunction)
	// initializer.registerBeforeAuthenticateGameCenter(guardFunction)
	// initializer.registerBeforeAuthenticateGoogle(guardFunction)
	// initializer.registerBeforeAuthenticateSteam(guardFunction)
	// initializer.registerBeforeListChannelMessages(guardFunction)
	// initializer.registerBeforeListFriends(guardFunction)
	// initializer.registerBeforeAddFriends(guardFunction)
	// initializer.registerBeforeDeleteFriends(guardFunction)
	// initializer.registerBeforeBlockFriends(guardFunction)
	// initializer.registerBeforeImportFacebookFriends(guardFunction)
	// initializer.registerBeforeCreateGroup(guardFunction)
	// initializer.registerBeforeUpdateGroup(guardFunction)
	// initializer.registerBeforeDeleteGroup(guardFunction)
	// initializer.registerBeforeJoinGroup(guardFunction)
	// initializer.registerBeforeLeaveGroup(guardFunction)
	// initializer.registerBeforeAddGroupUsers(guardFunction)
	// initializer.registerBeforeBanGroupUsers(guardFunction)
	// initializer.registerBeforeKickGroupUsers(guardFunction)
	// initializer.registerBeforePromoteGroupUsers(guardFunction)
	// initializer.registerBeforeDemoteGroupUsers(guardFunction)
	// initializer.registerBeforeListGroupUsers(guardFunction)
	// initializer.registerBeforeListUserGroups(guardFunction)
	// initializer.registerBeforeListGroups(guardFunction)
	// initializer.registerBeforeDeleteLeaderboardRecord(guardFunction)
	// initializer.registerBeforeListLeaderboardRecords(guardFunction)
	// initializer.registerBeforeWriteLeaderboardRecord(guardFunction)
	// initializer.registerBeforeListLeaderboardRecordsAroundOwner(guardFunction)
	// initializer.registerBeforeLinkApple(guardFunction)
	// initializer.registerBeforeLinkCustom(guardFunction)
	// initializer.registerBeforeLinkDevice(guardFunction)
	// initializer.registerBeforeLinkEmail(guardFunction)
	// initializer.registerBeforeLinkFacebook(guardFunction)
	// initializer.registerBeforeLinkFacebookInstantGame(guardFunction)
	// initializer.registerBeforeLinkGameCenter(guardFunction)
	// initializer.registerBeforeLinkGoogle(guardFunction)
	// initializer.registerBeforeLinkSteam(guardFunction)
	// initializer.registerBeforeListNotifications(guardFunction)
	// initializer.registerBeforeDeleteNotifications(guardFunction)
	// initializer.registerBeforeListStorageObjects(guardFunction)
	// initializer.registerBeforeReadStorageObjects(guardFunction)
	// initializer.registerBeforeWriteStorageObjects(guardFunction)
	// initializer.registerBeforeDeleteStorageObjects(guardFunction)
	// initializer.registerBeforeJoinTournament(guardFunction)
	// initializer.registerBeforeListTournamentRecords(guardFunction)
	// initializer.registerBeforeListTournaments(guardFunction)
	// initializer.registerBeforeWriteTournamentRecord(guardFunction)
	// initializer.registerBeforeListTournamentRecordsAroundOwner(guardFunction)
	// initializer.registerBeforeUnlinkApple(guardFunction)
	// initializer.registerBeforeUnlinkCustom(guardFunction)
	// initializer.registerBeforeUnlinkDevice(guardFunction)
	// initializer.registerBeforeUnlinkEmail(guardFunction)
	// initializer.registerBeforeUnlinkFacebook(guardFunction)
	// initializer.registerBeforeUnlinkFacebookInstantGame(guardFunction)
	// initializer.registerBeforeUnlinkGameCenter(guardFunction)
	// initializer.registerBeforeUnlinkSteam(guardFunction)
	// initializer.registerBeforeGetUsers(guardFunction)

	// initializer.registerAfterDeleteAccount(afterAccountDelete)
}

const someFunction: nkruntime.RpcFunction = (ctx, logger, nk, payload) => {
	return JSON.stringify({
		foo: 'bar'
	})
}

// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null)
