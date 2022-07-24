import {
	Action,
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import { ParticipantDetails } from 'src/app/models/participant-details.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';
import * as analyticsDetailsActions from './analytics-details.actions';

export const analyticsDetailsFeatureKey = 'analyticsDetails';

export interface AnalyticsDetailsState {
	recordingId: string | undefined;
	participantDetails: ParticipantDetails | undefined;
	talkRatioDetails: TalkRatioDetails | undefined;
	activeTalkRatioChart: 'me' | 'org';
	emptyWidgetMessages: {
		transcript?: string;
		tracker?: string;
		talkRatio?: string;
	};
}

const initialState: AnalyticsDetailsState = {
	recordingId: undefined,
	participantDetails: undefined,
	talkRatioDetails: undefined,
	activeTalkRatioChart: 'me',
	emptyWidgetMessages: {},
};

const analyticsDetailsReducer = createReducer(
	initialState,
	on(
		analyticsDetailsActions.getParticipantDetailsSuccess,
		(state, { participantDetails }) => ({ ...state, participantDetails })
	),
	on(
		analyticsDetailsActions.getTalkRatioDetailsSuccess,
		(state, { talkRatioDetails }) => ({ ...state, talkRatioDetails })
	)
);

export function reducer(
	state: AnalyticsDetailsState | undefined,
	action: Action
) {
	return analyticsDetailsReducer(state, action);
}

/* Selectors */
const selectState = createFeatureSelector<AnalyticsDetailsState>(
	analyticsDetailsFeatureKey
);

export const selectParticipantDetails = createSelector(
	selectState,
	(state) => state.participantDetails
);
export const selectParticipants = createSelector(
	selectState,
	(state) => state.participantDetails?.participantDetails || []
);
export const selectTalkRatioData = createSelector(selectState, (state) => {
	const { talkRatioDetails } = state;
	if (talkRatioDetails) {
		return [
			{
				label: talkRatioDetails?.tenantName,
				value: talkRatioDetails.eventTalkRatioDto.org,
			},
			{
				label: talkRatioDetails?.clientName,
				value: talkRatioDetails.eventTalkRatioDto.nonOrg,
			},
		];
	}
	return [];
});

export const selectTalkRatioEmptyMessage = createSelector(
	selectState,
	(state) => state.emptyWidgetMessages.talkRatio
);
