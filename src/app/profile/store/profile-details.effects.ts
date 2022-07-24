import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { ProfileConfig } from '../profile.config';
import { ProfileService } from './../services/profile.service';
import * as profileDetailsActions from './profile-details.actions';

@Injectable()
export class ProfileDetailsEffects {
	LOADER_IDS = ProfileConfig.LOADER_IDS;

	constructor(
		private actions$: Actions,
		private utilityService: UtilityService,
		private profileService: ProfileService
	) {}

	getProfileDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(profileDetailsActions.getProfileDetails),
			tap(() =>
				this.utilityService.startLoader(
					this.LOADER_IDS.PROFILE_DETAIL_HEADER_PANEL
				)
			),
			switchMap(() =>
				this.profileService.getProfileDetails().pipe(
					map(({ data }) => {
						return profileDetailsActions.getProfileDetailsSuccess({
							userProfile: data,
						});
					}),
					tap(() =>
						this.utilityService.stopLoader(
							this.LOADER_IDS.PROFILE_DETAIL_HEADER_PANEL
						)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});
}
