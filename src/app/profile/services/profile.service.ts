import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { UserProfile } from 'src/app/models/user.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private httpClient: HttpClient) {}

	getProfileDetails() {
		return this.httpClient
			.get<ApiResponse<UserProfile>>(ApiConstants.GET_USER_PROFILE)
			.pipe(map((response) => response));
	}
}
