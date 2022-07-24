export const RecordingDetailsConfig = {
	HIGHLIGHT_CLASS: {
		SEARCH_HIGHLIGHT: 'do-search-highlight',
		SEARCH_HIGHLIGHT_ACTIVE: 'active',
		SEARCH_HIGHLIGHT_CLICKED: 'clicked',
	},
	LOADER_IDS: {
		RECORDING_DETAIL_HEADER_PANEL: 'recording-details-header-panel',
		TRANSCRIPTS_PANEL: 'transcripts-panel',
		VIDEO_PLAYER: 'video-player',
		AUDIO_PLAYER: 'audio-player',
		TALK_RATIO: 'talk-ratio',
		TOPICS: 'topics',
		PARTICIPANT_DETAILS: 'participant-details',
		CONVERSATION: (dialogId: number) => `conversation_${dialogId}`,
		RECORDING_LISTING_PANEL: 'recording-listing-panel',
		INVITED_USERs_TABLE: 'invited-users-table',
		ADMIN_ACCOUNT_DETAILS: 'admin-account-details',
		ADMIN_RECORDING_SETTINGS: 'admin-recordings-setting',
		MEETING_DETAILS: 'meeting-details',
		ACTION_ITEMS: 'action-item',
		QUESTION_LIST: 'question-list',
	},
};
