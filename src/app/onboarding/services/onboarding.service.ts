import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Account } from 'src/app/models/onboarding.model';
import { RulesDetails } from 'src/app/models/sync-calendar-rules.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Injectable({
	providedIn: 'root',
})
export class OnboardingService {
	constructor(
		private httpClient: HttpClient,
		private utilityService: UtilityService
	) {}

	saveAccountDetails(account: Account) {
		return this.httpClient
			.post<ApiResponse<any>>(ApiConstants.POST_USER_REGISTRATION, account)
			.pipe(map((res) => res.data));
	}

	getRegistrationDetails() {
		return this.httpClient
			.get<
				ApiResponse<Account & { onboarded: boolean; onBoardingStep: number }>
			>(ApiConstants.GET_USER_REGISTRATION)
			.pipe(map((res) => res.data));
	}

	saveVoicePrint(fileName: string, audio: Blob) {
		const file = new File([audio], `${fileName}.wav`, { type: 'audio/wav' });
		const formData = new FormData();
		formData.append('file', file);
		return this.httpClient
			.post<ApiResponse<{ status: boolean }>>(
				ApiConstants.POST_USER_VOICE_PRINT,
				formData
			)
			.pipe(
				this.utilityService.notifyAPIError([415]),
				map((res) =>
					res.status.statusCode == '200'
						? { success: true }
						: { success: false }
				)
			);
	}

	getRules() {
		return this.httpClient
			.post<ApiResponse<RulesDetails>>(
				ApiConstants.CALENDAR_SYNC_GET_RULES(),
				{}
			)
			.pipe(map((response) => response.data));
	}

	setRules(request: Partial<RulesDetails>) {
		return this.httpClient
			.put<ApiResponse<RulesDetails>>(
				ApiConstants.CALENDAR_SYNC_SET_RULE(),
				request
			)
			.pipe(map((response) => response.data));
	}

	skipCalendarStep() {
		return this.httpClient
			.get<ApiResponse<any>>(ApiConstants.CALENDAR_SYNC_SKIP)
			.pipe(map((response) => response.data));
	}

	completedCalandarSync() {
		return this.httpClient
			.get<ApiResponse<any>>(ApiConstants.CALENDAR_SYNC_COMPLETED)
			.pipe(map((response) => response.data));
	}

	syncCalendarAfterRuleSetup(id: number) {
		return this.httpClient
			.get<any>(ApiConstants.CALENDAR_SYNC_AFTER_RULES_SETUP, {
				params: { userGoogleAccountId: `${id}` },
			})
			.pipe(map((res) => res));
	}
}
