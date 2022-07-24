import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstants } from '../../shared/constants/api-urls';

type PostGoogleCode = {
	code: string;
	redirectUri: string;
};
@Injectable({
	providedIn: 'root',
})
export class CalendarIntegrationService {
	constructor(private httpClient: HttpClient) {}

	getAuthUrl() {
		return this.httpClient
			.get<any>(ApiConstants.CALENDAR_SYNC_URL())
			.pipe(map((response) => response.data));
	}

	postGoogleCode(googleCode: PostGoogleCode) {
		return this.httpClient
			.post<any>(ApiConstants.CALENDAR_SYNC_POST_CODE(), googleCode)
			.pipe(map((response) => response));
	}

	getEventByUserId(id: number) {
		return this.httpClient
			.get<any>(ApiConstants.CALENDAR_SYNC_GET_EVENTS_BY_USER_ID, {
				params: { userAccountId: `${id}` },
			})
			.pipe(map((res) => res.data));
	}

	getConnectedAccounts() {
		return this.httpClient
			.post<any>(ApiConstants.CALENDAR_SYNC_GET_ACCOUNTS(), {})
			.pipe(map((response) => response.data));
	}

	removeConnectedAccount(userGoogleAccountId: number) {
		return this.httpClient
			.post<any>(
				ApiConstants.CALENDAR_SYNC_REMOVE_ACCOUNT(userGoogleAccountId),
				{}
			)
			.pipe(map((res) => res));
	}
}
