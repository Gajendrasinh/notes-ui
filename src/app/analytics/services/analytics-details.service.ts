import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ParticipantDetails } from 'src/app/models/participant-details.model';
import { TalkRatioDetails } from 'src/app/models/talkratio-details.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';

@Injectable({
	providedIn: 'root',
})
export class AnalyticsDetailsService {
	constructor(private httpClient: HttpClient) {}

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
}
