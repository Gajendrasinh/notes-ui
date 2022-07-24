import { createAction, props } from '@ngrx/store';
import { ActionItems } from 'src/app/models/action-item.model';
import {
	Conversation,
	ConversationCard,
} from 'src/app/models/conversation.model';
import {
	Participant,
	ParticipantDetails,
} from 'src/app/models/participant-details.model';
import { QuestionList } from 'src/app/models/question-list.model';
import {
	RecordingDetails,
	RecordingType,
} from 'src/app/models/recording.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';
import { TopicsDetails } from 'src/app/models/tracker.model';
import {
	TranscriptSearch,
	TranscriptSearchResult,
} from 'src/app/models/transcript-search.model';
import { Attendee } from 'src/app/models/user.model';
import { TranscriptFilterKey } from '../transcript-filters/transcript-filters.component';

export const setRecordingId = createAction(
	'[Recording Details] Set Recording Id',
	props<{ recordingId: string }>()
);
export const getRecordingDetails = createAction(
	'[Recording Details] Get Recording Details',
	props<{ recordingId: string }>()
);
export const getRecordingDetailsSuccess = createAction(
	'[Recording Details] Get Recording Details Success',
	props<{ recordingDetails: RecordingDetails }>()
);
export const getTranscripts = createAction(
	'[Recording Details] Get Transcripts',
	props<{ recordingId: string }>()
);
export const getTranscriptsSuccess = createAction(
	'[Recording Details] Get Transcripts Success',
	props<{
		recordingPath: string;
		recordingType: RecordingType;
		transcripts: ConversationCard[];
	}>()
);

export const searchTranscript = createAction(
	'[Recording Details] Search Transcript',
	props<{ transcriptSearch: TranscriptSearch }>()
);
export const setSearchTranscriptResults = createAction(
	'[Recording Details] Set Search Transcript Results',
	props<{ transcriptSearchResults: TranscriptSearchResult[] }>()
);
export const resetSearchTranscript = createAction(
	'[Recording Details] Reset Search Transcript and Search Results'
);

export const toggleQuestionFilter = createAction(
	'[Recording Details] toggle question filter'
);

export const setActiveTranscriptSearchResult = createAction(
	'[Recording Details] Set Selected Search Transcript Results',
	props<{ activeTranscriptSearchResult: number }>()
);
export const setActiveConversationCardId = createAction(
	'[Recording Details] Set active conversation card id',
	props<{ id: number | undefined; triggeredOnCardSelect?: boolean }>()
);

export const getParticipantDetails = createAction(
	'[Participant Details] Get Participant Details',
	props<{ recordingId: string }>()
);
export const getParticipantDetailsSuccess = createAction(
	'[Participant Details] Get Participant Details Success',
	props<{ participantDetails: ParticipantDetails }>()
);

export const updateNonOrgName = createAction(
	'[Participant Details] Update NonOrg Name',
	props<{ recordingId: string; nonOrgName: string }>()
);
export const updateNonOrgNameSuccess = createAction(
	'[Participant Details] Update NonOrg Name Success',
	props<{ nonOrgName: string }>()
);

export const updateTranscript = createAction(
	'[Transcript Panel] Update conversation transcript',
	props<{ conversationCardId: number; conversation: Conversation }>()
);
export const updateTranscriptSuccess = createAction(
	'[Transcript Panel] Update conversation transcript success',
	props<{ conversationCardId: number; conversation: Conversation }>()
);
export const updateTranscriptFail = createAction(
	'[Transcript Panel] Update conversation transcript fail',
	props<{ conversationCardId: number; conversation: Conversation }>()
);
export const resetTranscriptScroll = createAction(
	'[Transcript Panel] Reset Transcript Scroll on Search'
);
export const updateSpeaker = createAction(
	'[Conversation] Update Speaker for Dialog',
	props<{
		dialogueId: number;
		speaker: Participant;
		allConversation: boolean;
		oldSpeaker: Attendee;
	}>()
);
export const updateSpeakerSuccess = createAction(
	'[Conversation] Update Speaker for This / All conversation Success',
	props<{
		speaker: Attendee;
		dialogueId: number;
		allConversation: boolean;
		oldSpeaker: Attendee;
	}>()
);
export const updateSpeakerFail = createAction(
	'[Conversation] Update Speaker for Dialog Fail',
	props<{ dialogueId: number }>()
);
export const getTalkRatioDetails = createAction(
	'[TalkRatio Details] Get TalkRatio Details',
	props<{ recordingId: string }>()
);
export const getTalkRatioDetailsSuccess = createAction(
	'[TalkRatio Details] Get TalkRatio Details Success',
	props<{ talkRatioDetails: TalkRatioDetails }>()
);

export const getTopics = createAction(
	'[Topics] Get Topics',
	props<{ recordingId: string }>()
);
export const getTopicsSuccess = createAction(
	'[Topics] Get Topics Details Success',
	props<{ topicsDetails: TopicsDetails }>()
);
export const toggleKeywordSelection = createAction(
	'[Topics] toggle Topic keyword selection',
	props<{ TopicId: number; keywordId: number }>()
);
export const toggleTopicExpandView = createAction(
	'[Topics] toggle Topic expand view',
	props<{ TopicId: number }>()
);

export const addSelectedTopic = createAction(
	'[Topics] add selected Topic',
	props<{ TopicId: number }>()
);
export const removeSelectedTopic = createAction(
	'[Topics] remove selected Topic',
	props<{ TopicId: number }>()
);
export const setActiveTopic = createAction(
	'[Topics] add active selected Topic',
	props<{ index: number }>()
);
export const setActiveTopicByDialogueId = createAction(
	'[Topics] add active selected Topic by dialogue id',
	props<{ dialogueId: number }>()
);

export const resetRecordingDetailsState = createAction(
	'[Recording Details] reset recording details state'
);
export const getTranscriptsEmptyMessage = createAction(
	'[Recording Details] Get Transcripts Empty Message',
	props<{ message: string }>()
);
export const getTopicEmptyMessage = createAction(
	'[Recording Details] Get Topic Empty Message',
	props<{ message: string }>()
);
export const getTalkRatioEmptyMessage = createAction(
	'[Recording Details] Get Talk Ratio Empty Message',
	props<{ message: string }>()
);
export const updateActiveTranscriptFilter = createAction(
	'[Recording Details] Update active transcript filter',
	props<{ activeTranscriptFilter: TranscriptFilterKey }>()
);
export const clearTranscriptFilters = createAction(
	'[Recording Details] Clear transcript filters'
);

export const jumpToTimeAction = createAction(
	'[Recording Details] Jump to time action',
	props<{ startTime: number; endTime?: number; autoStop?: boolean }>()
);

export const getActionItem = createAction(
	'[Action Item] Get Action Item',
	props<{ recordingId: string }>()
);
export const getActionItemSuccess = createAction(
	'[Action Item] Get Action Item Success',
	props<{ actionItems: ActionItems[] }>()
);
export const getActionItemEmptyMessage = createAction(
	'[Action Item] Get Action Item Empty Message',
	props<{ message: string }>()
);
export const getQuestionList = createAction(
	'[Question List] Get Question List',
	props<{ recordingId: string }>()
);
export const getQuestionListSuccess = createAction(
	'[Question List] Get Question List Success',
	props<{ questionList: QuestionList[] }>()
);
export const getQuestionListEmptyMessage = createAction(
	'[Question List] Get Question List Empty Message',
	props<{ message: string }>()
);

export const setActiveConversationCardByStartTime = createAction(
	'[Recording Details] Set active conversation card by start time',
	props<{ startTime: number; triggeredOnCardSelect?: boolean }>()
);
