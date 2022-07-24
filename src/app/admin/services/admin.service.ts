import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import {
	InvitedUser,
	InvitedUserDetails,
	InvitedUserError,
} from 'src/app/models/invited-user-details.model';
import { Account } from 'src/app/models/onboarding.model';
import { RulesUpdatedStatus } from 'src/app/models/rule-status-update.model';
import { RulesDetails } from 'src/app/models/sync-calendar-rules.model';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	LOADER_IDS = RecordingDetailsConfig.LOADER_IDS;
	constructor(
		private httpClient: HttpClient,
		private utilityService: UtilityService
	) {}

	fetchInvitedUserDetails() {
		this.utilityService.startLoader(this.LOADER_IDS.INVITED_USERs_TABLE);
		return this.httpClient
			.get<ApiResponse<InvitedUserDetails>>(
				ApiConstants.FETCH_INVITED_USER_DETAILS
			)
			.pipe(
				map((response) => ({
					...response.data,
					users: response.data.users.sort((a, b) =>
						a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
					),
				})),
				tap(() =>
					this.utilityService.stopLoader(this.LOADER_IDS.INVITED_USERs_TABLE)
				),
				catchError(() => {
					this.utilityService.stopLoader(this.LOADER_IDS.INVITED_USERs_TABLE);
					return EMPTY;
				})
			);
	}
	saveInvitedUsers(users: InvitedUser[]) {
		return this.httpClient
			.post<ApiResponse<{ status: InvitedUserError[] }>>(
				ApiConstants.INVITE_USER,
				{ users }
			)
			.pipe(map((response) => response.data?.status));
	}

	getRegistrationDetails() {
		this.utilityService.startLoader(this.LOADER_IDS.ADMIN_ACCOUNT_DETAILS);
		return this.httpClient
			.get<
				ApiResponse<Account & { onboarded: boolean; onBoardingStep: number }>
			>(ApiConstants.GET_USER_REGISTRATION)
			.pipe(
				map((res) => res.data),
				tap(() =>
					this.utilityService.stopLoader(this.LOADER_IDS.ADMIN_ACCOUNT_DETAILS)
				),
				catchError(() => {
					this.utilityService.stopLoader(this.LOADER_IDS.ADMIN_ACCOUNT_DETAILS);
					return EMPTY;
				})
			);
	}

	getRules() {
		this.utilityService.startLoader(this.LOADER_IDS.ADMIN_RECORDING_SETTINGS);
		return this.httpClient
			.get<ApiResponse<RulesDetails>>(
				ApiConstants.RECORDING_SETTING_GET_RULES()
			)
			.pipe(
				map((response) => response.data),
				tap(() =>
					this.utilityService.stopLoader(
						this.LOADER_IDS.ADMIN_RECORDING_SETTINGS
					)
				),
				catchError(() => {
					this.utilityService.stopLoader(
						this.LOADER_IDS.ADMIN_RECORDING_SETTINGS
					);
					return EMPTY;
				})
			);
	}

	getRulesUpdateStatus() {
		return this.httpClient
			.get<ApiResponse<RulesUpdatedStatus>>(ApiConstants.RULES_UPDATED_STATUS)
			.pipe(map((res) => res));
	}
}
