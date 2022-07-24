import { environment } from 'src/environments/environment';

const BASE_URL = environment.urls.apiBaseUrl;
export const ApiConstants = {
	GET_MEETING_DETAILS: (recordingId: string) =>
		BASE_URL + `/event/${recordingId}`,
	GET_TRANSCRIPTS: (recordingId: string) =>
		BASE_URL + `/event/${recordingId}/transcript`,
	// GET_PARTICIPANTS: (recordingId: string) =>  BASE_URL + `/meeting/talkRatio/${recordingId}`,
	GET_PARTICIPANT_DETAILS: (recordingId: string) =>
		`${BASE_URL}/event/${recordingId}/participant`,
	PUT_NON_ORG_NAME: (recordingId: string) => `${BASE_URL}/event/${recordingId}`,
	MATCH_LAST_THREE_PASSWORD: `${BASE_URL}/user/check-password`,
	SAVE_NEW_PASSWORD: `${BASE_URL}/user/save-password`,
	GET_TALK_RATIO_DETAILS: (recordingId: string) =>
		`${BASE_URL}/event/${recordingId}/talk-ratio`,
	GET_TOPICS_DETAILS: (recordingId: string) =>
		`${BASE_URL}/event/${recordingId}/topic`,
	AUDIO_VIDEO_URL: (recordingId: string) =>
		`/api/event/${recordingId}/recording`,
	INVITE_USER: `${BASE_URL}/user/invite`,
	FETCH_INVITED_USER_DETAILS: `${BASE_URL}/user`,
	FETCH_LAST_SIGN_IN: `${BASE_URL}/user/sign-in`,
	USER_SIGN_UP: `${BASE_URL}/user/sign-up`,
	GET_USER_IDENTITY_PROVIDER: (userName: string) =>
		`${BASE_URL}/user/identity-provider?email=${userName}`,

	CALENDAR_SYNC_URL: () => `${BASE_URL}/calendar/authorize/oauth2/account`,
	CALENDAR_SYNC_POST_CODE: () => `${BASE_URL}/calendar/authorize/oauth2/token`,
	CALENDAR_SYNC_GET_ACCOUNTS: () => `${BASE_URL}/calendar/user/accounts`,
	// CALENDAR_SYNC_ADD_ACCOUNT: () =>  `${BASE_URL}/calendar/account`,
	CALENDAR_SYNC_GET_EVENTS_BY_USER_ID: `${BASE_URL}/calendar/events`,
	CALENDAR_SYNC_REMOVE_ACCOUNT: (userGoogleAccountId: number) =>
		`${BASE_URL}/calendar/disconnect?userGoogleAccountId=${userGoogleAccountId}`,
	CALENDAR_SYNC_SKIP: `${BASE_URL}/user/skip`,
	CALENDAR_SYNC_COMPLETED: `${BASE_URL}/user/complete`,

	CALENDAR_SYNC_GET_RULES: () => `${BASE_URL}/calendar/rule`,
	CALENDAR_SYNC_SET_RULE: () => `${BASE_URL}/calendar/rule`,
	RECORDING_SETTING_GET_RULES: () => `${BASE_URL}/calendar/rule`,
	CALENDAR_SYNC_AFTER_RULES_SETUP: `${BASE_URL}/calendar/sync`,

	GET_USER_DESIGNATION: `${BASE_URL}/user/designation`,
	POST_USER_REGISTRATION: `${BASE_URL}/user/registration`,
	GET_USER_REGISTRATION: `${BASE_URL}/user/registration`,
	POST_USER_VOICE_PRINT: `${BASE_URL}/user/voice-print`,

	GET_EVENTS_LIST: `${BASE_URL}/event`,

	PUT_SPEAKER: (recordingId: string) =>
		`${BASE_URL}/event/${recordingId}/speaker`,

	//Get & Post topic api end-points
	GET_TOPIC_LIST_ADMIN: () => `${BASE_URL}/topic`,
	ADD_TOPIC: () => `${BASE_URL}/topic`,
	/* End-points of action item and question list API's */
	GET_ACTION_ITEMS: (eventId: string) =>
		BASE_URL + `/event/${eventId}/actionItem`,
	GET_QUESTION_LIST: (eventId: string) =>
		BASE_URL + `/event/${eventId}/question`,

	GET_USER_PROFILE: `${BASE_URL}/user/profile`,
	GET_VOICE_PRINT: `${BASE_URL}/user/voice-print`,
	GET_VOICE_PRINT_COOKIE_PATH: `/api/user/voice-print`,

	/* display rules update status */
	RULES_UPDATED_STATUS: `${BASE_URL}/calendar/rule/eventSyncUpdate`,
};
