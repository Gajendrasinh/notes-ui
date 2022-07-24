import { createAction, props } from '@ngrx/store';
import { ParticipantDetails } from 'src/app/models/participant-details.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';

export const getParticipantDetails = createAction(
	'[Analytics Participant Details] Get Analytics Participant Details',
	props<{ recordingId: string }>()
);
export const getParticipantDetailsSuccess = createAction(
	'[Analytics Participant Details] Get Analytics Participant Details Success',
	props<{ participantDetails: ParticipantDetails }>()
);

export const getTalkRatioDetails = createAction(
	'[Analytics TalkRatio Details] Get Analytics TalkRatio Details',
	props<{ recordingId: string }>()
);
export const getTalkRatioDetailsSuccess = createAction(
	'[Analytics TalkRatio Details] Get Analytics TalkRatio Details Success',
	props<{ talkRatioDetails: TalkRatioDetails }>()
);

export const getTalkRatioEmptyMessage = createAction(
	'[Analytics Details] Get Analytics Talk Ratio Empty Message',
	props<{ message: string }>()
);
