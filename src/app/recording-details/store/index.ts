import {
	Action,
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import { ActionItems } from 'src/app/models/action-item.model';
import { ConversationCard } from 'src/app/models/conversation.model';
import { ParticipantDetails } from 'src/app/models/participant-details.model';
import { QuestionList } from 'src/app/models/question-list.model';
import {
	RecordingDetails,
	RecordingType,
} from 'src/app/models/recording.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';
import { Dialogue, Topic, TopicsDetails } from 'src/app/models/tracker.model';
import {
	TranscriptSearch,
	TranscriptSearchResult,
} from 'src/app/models/transcript-search.model';
import { TranscriptFilterKey } from '../transcript-filters/transcript-filters.component';
import * as RecordingDetailsActions from './recording-details.actions';

export const recordingDetailsFeatureKey = 'recordingDetails';

export interface RecordingDetailsState {
	recordingId: string | undefined;
	recordingDetails: RecordingDetails | undefined;
	recordingPath: string | undefined;
	recordingType: RecordingType;
	transcripts: ConversationCard[];
	transcriptSearch: TranscriptSearch | undefined;
	transcriptSearchResults: TranscriptSearchResult[] | undefined;
	activeTranscriptFilter: TranscriptFilterKey;
	isQuestionFilterEnabled: boolean;
	activeTranscriptSearchResult: number | undefined;
	activeConversationCardId: {
		id: number | undefined;
		triggeredOnCardSelect?: boolean;
	};
	participantDetails: ParticipantDetails | undefined;
	talkRatioDetails: TalkRatioDetails | undefined;
	topicsDetails: TopicsDetails | undefined;
	actionItems: ActionItems[] | undefined;
	questionList: QuestionList[] | undefined;
	skipTranscriptScroll: boolean;
	isSpeakerUpdateInProgress: boolean;
	activeTopicIndex: number | undefined;
	emptyWidgetMessages: {
		transcript?: string;
		topic?: string;
		talkRatio?: string;
		actionItem?: string;
		questionList?: string;
	};
	jumpToTime: {
		startTime: number;
		endTime?: number;
		autoStop?: boolean;
	};
	enableClearFilter: boolean;
	activeConversationCardByStartTime: {
		startTime: number;
		triggeredOnCardSelect?: boolean;
	};
}

const initialState: RecordingDetailsState = {
	recordingId: undefined,
	recordingDetails: undefined,
	recordingPath: undefined,
	recordingType: undefined,
	transcripts: [],
	transcriptSearch: undefined,
	transcriptSearchResults: undefined,
	isQuestionFilterEnabled: false,
	activeTranscriptSearchResult: undefined,
	activeConversationCardId: { id: undefined },
	participantDetails: undefined,
	talkRatioDetails: undefined,
	topicsDetails: undefined,
	actionItems: [],
	questionList: [],
	// selectedTopics: [],
	skipTranscriptScroll: false,
	isSpeakerUpdateInProgress: false,
	emptyWidgetMessages: {},
	activeTopicIndex: undefined,
	activeTranscriptFilter: 'topics',
	jumpToTime: {
		startTime: 0,
	},
	enableClearFilter: false,
	activeConversationCardByStartTime: { startTime: 0 },
};

const recordingDetailsReducer = createReducer(
	initialState,
	on(
		RecordingDetailsActions.getRecordingDetailsSuccess,
		(state, { recordingDetails }) => ({ ...state, recordingDetails })
	),
	on(
		RecordingDetailsActions.getTranscriptsSuccess,
		(state, { transcripts, recordingPath, recordingType }) => ({
			...state,
			transcripts,
			recordingPath,
			recordingType,
		})
	),
	on(
		RecordingDetailsActions.setSearchTranscriptResults,
		(state, { transcriptSearchResults }) => ({
			...state,
			transcriptSearchResults,
			activeTranscriptSearchResult: undefined,
		})
	),
	on(
		RecordingDetailsActions.searchTranscript,
		(state, { transcriptSearch }) => ({
			...state,
			transcriptSearch,
			topicsDetails: state.topicsDetails && {
				...state.topicsDetails,
				topics: state.topicsDetails?.topics?.map((t) => ({
					...t,
					isSelected: false,
				})),
			},
			enableClearFilter: false,
		})
	),
	on(RecordingDetailsActions.resetSearchTranscript, (state) => ({
		...state,
		transcriptSearch: undefined,
		transcriptSearchResults: undefined,
	})),
	on(RecordingDetailsActions.toggleQuestionFilter, (state) => ({
		...state,
		isQuestionFilterEnabled: !state.isQuestionFilterEnabled,
		transcriptSearch: state.transcriptSearch
			? { ...state.transcriptSearch, activeSearchIndex: 0 }
			: undefined,
		selectedTopics: [],
		activeTopicIndex: undefined,
	})),
	on(
		RecordingDetailsActions.setActiveTranscriptSearchResult,
		(state, { activeTranscriptSearchResult }) => ({
			...state,
			activeTranscriptSearchResult,
			activeConversationCardId: { id: undefined },
		})
	),
	on(RecordingDetailsActions.setActiveConversationCardId, (state, payload) => ({
		...state,
		activeConversationCardId: payload,
	})),
	on(
		RecordingDetailsActions.setActiveConversationCardByStartTime,
		(state, { startTime }) => {
			if (startTime == undefined) {
				return {
					...state,
				};
			}
			let match: any;
			for (let i = 0; i < state?.transcripts?.length; i++) {
				match = state.transcripts[i].conversations?.find(
					(t) => t.startTime < startTime && t.endTime > startTime
				);
				if (match) {
					break;
				}
			}
			if (match?.dialogueId !== null) {
				return {
					...state,
					playerTime: startTime,
					activeConversationCardId: { id: match?.dialogueId || null },
				};
			} else {
				return {
					...state,
				};
			}
		}
	),
	on(
		RecordingDetailsActions.getParticipantDetailsSuccess,
		(state, { participantDetails }) => ({ ...state, participantDetails })
	),
	on(
		RecordingDetailsActions.getTalkRatioDetailsSuccess,
		(state, { talkRatioDetails }) => ({ ...state, talkRatioDetails })
	),
	on(RecordingDetailsActions.getTopicsSuccess, (state, { topicsDetails }) => ({
		...state,
		topicsDetails,
	})),
	on(
		RecordingDetailsActions.updateNonOrgNameSuccess,
		(state, { nonOrgName }) => ({
			...state,
			participantDetails: state.participantDetails && {
				...state.participantDetails,
				nonOrgName,
			},
		})
	),
	on(RecordingDetailsActions.toggleTopicExpandView, (state, { TopicId }) => ({
		...state,
		topicsDetails: state.topicsDetails && {
			...state.topicsDetails,
			topics: state.topicsDetails?.topics?.map((t) => {
				if (t.id === TopicId) {
					return { ...t, isExpanded: !t.isExpanded };
				}
				return t;
			}),
		},
	})),
	on(RecordingDetailsActions.addSelectedTopic, (state, { TopicId }) => {
		const topicsDetails: TopicsDetails | undefined = state.topicsDetails && {
			...state.topicsDetails,
			topics: state.topicsDetails?.topics?.map((t) => {
				if (t.id === TopicId) {
					return { ...t, isSelected: true };
				}
				return t;
			}),
		};
		const enableClearFilter = !!(
			topicsDetails && topicsDetails?.topics.find((topic) => topic.isSelected)
		);
		return {
			...state,
			transcriptSearch: undefined,
			transcriptSearchResults: undefined,
			topicsDetails,
			enableClearFilter,
		};
	}),
	on(RecordingDetailsActions.removeSelectedTopic, (state, { TopicId }) => {
		const topicsDetails = state.topicsDetails && {
			...state.topicsDetails,
			topics: state.topicsDetails.topics?.map((t) => {
				if (t.id === TopicId) {
					return { ...t, isSelected: false };
				}
				return t;
			}),
		};
		const enableClearFilter = !!(
			topicsDetails && topicsDetails?.topics.find((topic) => topic.isSelected)
		);
		return {
			...state,
			topicsDetails,
			enableClearFilter,
		};
	}),
	on(RecordingDetailsActions.updateSpeaker, (state) => ({
		...state,
		isSpeakerUpdateInProgress: true,
	})),
	on(
		RecordingDetailsActions.updateSpeakerSuccess,
		(state, { dialogueId, speaker, allConversation, oldSpeaker }) => ({
			...state,
			skipTranscriptScroll: true,
			isSpeakerUpdateInProgress: false,
			transcripts: [
				...state.transcripts.map((t) => ({
					...t,
					conversations: t.conversations.map((conversation) => {
						if (allConversation) {
							return {
								...conversation,
								speaker:
									conversation.speaker.emailId === oldSpeaker.emailId
										? speaker
										: conversation.speaker,
							};
						} else {
							return {
								...conversation,
								speaker:
									conversation.dialogueId === dialogueId
										? speaker
										: conversation.speaker,
							};
						}
					}),
				})),
			],
		})
	),
	on(RecordingDetailsActions.updateSpeakerFail, (state) => ({
		...state,
		isSpeakerUpdateInProgress: false,
	})),
	on(RecordingDetailsActions.resetTranscriptScroll, (state) => ({
		...state,
		skipTranscriptScroll: false,
	})),
	on(RecordingDetailsActions.resetRecordingDetailsState, () => initialState),
	on(
		RecordingDetailsActions.getTranscriptsEmptyMessage,
		(state, { message }) => ({
			...state,
			emptyWidgetMessages: {
				...state.emptyWidgetMessages,
				transcript: message,
			},
		})
	),
	on(RecordingDetailsActions.getTopicEmptyMessage, (state, { message }) => ({
		...state,
		emptyWidgetMessages: { ...state.emptyWidgetMessages, topic: message },
	})),
	on(
		RecordingDetailsActions.getTalkRatioEmptyMessage,
		(state, { message }) => ({
			...state,
			emptyWidgetMessages: { ...state.emptyWidgetMessages, talkRatio: message },
		})
	),
	on(
		RecordingDetailsActions.updateActiveTranscriptFilter,
		(state, { activeTranscriptFilter }) => ({
			...state,
			activeTranscriptFilter,
		})
	),
	on(RecordingDetailsActions.clearTranscriptFilters, (state) => ({
		...state,
		topicsDetails: {
			...state.topicsDetails!,
			topics:
				state.topicsDetails?.topics?.map((t) => ({
					...t,
					isSelected: false,
				})) || [],
		},
		enableClearFilter: false,
	})),
	on(
		RecordingDetailsActions.jumpToTimeAction,
		(state, { startTime, endTime, autoStop }) => ({
			...state,
			jumpToTime: {
				startTime: startTime,
				endTime: endTime,
				autoStop: autoStop,
			},
		})
	),
	on(
		RecordingDetailsActions.getActionItemSuccess,
		(state, { actionItems }) => ({ ...state, actionItems })
	),
	on(
		RecordingDetailsActions.getActionItemEmptyMessage,
		(state, { message }) => ({
			...state,
			emptyWidgetMessages: {
				...state.emptyWidgetMessages,
				actionItem: message,
			},
		})
	),
	on(
		RecordingDetailsActions.getQuestionListSuccess,
		(state, { questionList }) => ({ ...state, questionList })
	),
	on(
		RecordingDetailsActions.getQuestionListEmptyMessage,
		(state, { message }) => ({
			...state,
			emptyWidgetMessages: {
				...state.emptyWidgetMessages,
				questionList: message,
			},
		})
	)
);

export function reducer(
	state: RecordingDetailsState | undefined,
	action: Action
) {
	return recordingDetailsReducer(state, action);
}

/** Selectors */
const selectState = createFeatureSelector<RecordingDetailsState>(
	recordingDetailsFeatureKey
);

export const selectRecordingDetails = createSelector(
	selectState,
	(state) => state.recordingDetails
);
export const selectRecordingId = createSelector(
	selectRecordingDetails,
	(state) => state?.eventId
);
export const selectRecordingType = createSelector(
	selectState,
	(state) => state.recordingType
);
export const selectTranscripts = createSelector(
	selectState,
	(state) => state.transcripts
);
export const selectSelectedTopics = createSelector(selectState, (state) =>
	state.topicsDetails?.topics
		?.filter((t) => t.isSelected)
		.flatMap((topic) => topic.keywords.map((t) => t.dialogues).flat())
);
export const selectFilteredTranscripts = createSelector(
	selectState,
	selectSelectedTopics,
	(state, selectedTopics) => {
		const transcripts = state.transcripts;
		// Question filter
		if (state.activeTranscriptFilter === 'questions') {
			return transcripts.filter((t) => t.isQuestion);
		}

		// Topics/topics filter
		if (selectedTopics?.length) {
			const selectedTopicDialogIds = selectedTopics.map((t) => t.id);
			const filteredTranscrtips: ConversationCard[] = [];
			transcripts.forEach((t) => {
				const conversations = t.conversations.filter((t) =>
					selectedTopicDialogIds.includes(t.dialogueId)
				);
				if (conversations.length) {
					filteredTranscrtips.push({ ...t, conversations });
				}
			});
			return filteredTranscrtips;
		}
		return transcripts;
	}
);
export const selectTranscriptSearch = createSelector(
	selectState,
	(state) => state.transcriptSearch
);
export const selectTranscriptSearchResults = createSelector(
	selectState,
	(state) => state.transcriptSearchResults
);
export const selectActiveTranscriptSearchResult = createSelector(
	selectState,
	(state) => state.activeTranscriptSearchResult
);
export const selectRecordingPath = createSelector(
	selectState,
	(state) => state.recordingPath
);
export const selectActiveConversationCardId = createSelector(
	selectState,
	(state) => state.activeConversationCardId.id
);
export const selectTopics = createSelector(selectState, (state) => {
	const transcripts = state.isQuestionFilterEnabled
		? state.transcripts.filter((t) => t.isQuestion)
		: state.transcripts;
	const transcriptDialogIds = transcripts.flatMap((t) =>
		t.conversations.map((conversation) => conversation.dialogueId)
	);

	return (
		state.topicsDetails?.topics.map((t) => {
			const keywords = t.keywords.map((k) => ({
				...k,
				count: k.dialogues.filter((d) => transcriptDialogIds.includes(d.id))
					.length,
			}));
			return {
				...t,
				keywords,
				count: keywords.reduce((acc, el) => acc + el.count, 0),
			};
		}) || []
	);
});
export const selectTopicByDialogId = (dialogueId: number) =>
	createSelector(selectTopics, (topics: Topic[] | undefined) => {
		const selectedTopics = topics?.filter((topic: Topic) => topic.isSelected);
		return selectedTopics?.reduce((res: Dialogue[], topic: Topic) => {
			const dialogues = topic.keywords.reduce((acc: Dialogue[], keyword) => {
				const match = keyword.dialogues.filter(
					(dialogue) => dialogue.id === dialogueId
				);
				if (match) {
					acc = acc.concat(match);
				}
				return acc;
			}, []);
			res = res.concat(dialogues);
			return res;
		}, []);
	});
export const selectTalkRatioData = createSelector(selectState, (state) => {
	const { talkRatioDetails } = state;

	if (talkRatioDetails) {
		return [
			{
				label: talkRatioDetails?.clientName,
				value: talkRatioDetails.eventTalkRatioDto.nonOrg,
			},
			{
				label: talkRatioDetails?.tenantName,
				value: talkRatioDetails.eventTalkRatioDto.org,
			},
		];
	}
	return [];
});
export const selectParticipantDetails = createSelector(
	selectState,
	(state) => state.participantDetails
);
export const selectParticipants = createSelector(
	selectState,
	(state) => state.participantDetails?.participantDetails || []
);
export const selectNonOrgName = createSelector(
	selectState,
	(state) => state.participantDetails?.nonOrgName
);
export const selectOrgParticipantCount = createSelector(
	selectState,
	(state) =>
		state.participantDetails?.participantDetails.filter((p) => p.organization)
			.length
);
export const selectNonOrgParticipantCount = createSelector(
	selectState,
	(state) =>
		state.participantDetails?.participantDetails.filter((p) => !p.organization)
			.length
);
export const selectSkipTranscriptScroll = createSelector(
	selectState,
	(state) => state.skipTranscriptScroll
);
export const selectIsSpeakerUpdateInProgress = createSelector(
	selectState,
	(state) => state.isSpeakerUpdateInProgress
);
export const selectTranscriptEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.transcript
);
export const selectTopicEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.topic
);
export const selectTalkRatioEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.talkRatio
);
export const selectActiveTranscriptFilter = createSelector(
	selectState,
	(state) => state.activeTranscriptFilter
);
export const selectJumpToTime = createSelector(
	selectState,
	(state) => state.jumpToTime
);
export const selectEnableClearFilter = createSelector(
	selectState,
	(state) => state.enableClearFilter
);
export const selectActionItems = createSelector(
	selectState,
	(state) => state.actionItems
);
export const selectActionItemEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.actionItem
);
export const selectQuestionList = createSelector(
	selectState,
	(state) => state.questionList
);
export const selectQuestionListEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.questionList
);
