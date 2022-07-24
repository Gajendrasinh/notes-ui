import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EventsData } from 'src/app/models/recordings.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
	providedIn: 'root',
})
export class RecordingsService {
	constructor(private httpClient: HttpClient) {}

	getRecordings(lastFetchedTime?: number) {
		const params: { [key: string]: string } = {};

		if (lastFetchedTime) {
			params['lastFetchedTime'] = lastFetchedTime.toString();
		}

		return this.httpClient
			.get<ApiResponse<EventsData>>(ApiConstants.GET_EVENTS_LIST, { params })
			.pipe(map((response) => response));
	}
}
