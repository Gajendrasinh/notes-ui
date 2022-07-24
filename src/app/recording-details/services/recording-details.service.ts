import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ActionItems } from 'src/app/models/action-item.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import {
	Participant,
	ParticipantDetails,
} from 'src/app/models/participant-details.model';
import { QuestionList } from 'src/app/models/question-list.model';
import {
	RecordingDetails,
	TranscriptsResponse,
} from 'src/app/models/recording.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';
import { TopicsDetails } from 'src/app/models/tracker.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';

@Injectable({
	providedIn: 'root',
})
export class RecordingDetailsService {
	constructor(private httpClient: HttpClient) {}

	getTranscripts(id: string) {
		return this.httpClient
			.get<ApiResponse<TranscriptsResponse>>(ApiConstants.GET_TRANSCRIPTS(id))
			.pipe(map((response) => response));
	}

	getRecordingDetails(id: string) {
		return this.httpClient
			.get<ApiResponse<RecordingDetails>>(ApiConstants.GET_MEETING_DETAILS(id))
			.pipe(map((response) => response.data));
	}

	getParticipantDetails(id: string) {
		return this.httpClient
			.get<ApiResponse<ParticipantDetails>>(
				ApiConstants.GET_PARTICIPANT_DETAILS(id)
			)
			.pipe(map((response) => response.data));
	}

	getTalkRatioDetails(id: string) {
		return this.httpClient
			.get<ApiResponse<TalkRatioDetails>>(
				ApiConstants.GET_TALK_RATIO_DETAILS(id)
			)
			.pipe(map((response) => response));
	}

	getTopicsDetails(id: string) {
		return this.httpClient
			.get<ApiResponse<TopicsDetails>>(ApiConstants.GET_TOPICS_DETAILS(id))
			.pipe(
				map((response) => {
					response.data &&
						response.data.topics.map((t, index) =>
							t.keywords.forEach((k) => (k.id = index + 1))
						);
					return response;
				})
			);
	}

	updateNonOrgName(id: string, clientName: string) {
		return this.httpClient
			.put<ApiResponse<{ status: boolean }>>(
				ApiConstants.PUT_NON_ORG_NAME(id),
				{ clientName }
			)
			.pipe(map((response) => response.data));
	}

	updateTranscript() {
		// TODO : API Integration
		return of({ success: false }).pipe(delay(200));
	}

	updateSpeaker(
		recordingId: string,
		dialogueId: number,
		speaker: Participant,
		allConversation = false
	) {
		const request = {
			dialogueId,
			speaker: {
				emailId: speaker.emailId,
				name: speaker.name,
				registeredParticipantId: speaker.registeredParticipantId,
				guestParticipantId: speaker.guestParticipantId,
			},
			allConversation,
		};

		return this.httpClient
			.put<ApiResponse<{ status: boolean }>>(
				ApiConstants.PUT_SPEAKER(recordingId),
				request
			)
			.pipe(map((response) => response.data));
	}

	getActionItems(id: string) {
		return this.httpClient
			.get<ApiResponse<ActionItems[]>>(ApiConstants.GET_ACTION_ITEMS(id))
			.pipe(map((response) => response));
	}

	getQuestionList(id: string) {
		return this.httpClient
			.get<ApiResponse<QuestionList[]>>(ApiConstants.GET_QUESTION_LIST(id))
			.pipe(map((response) => response));
	}
}
