import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { analyticsConfig } from '../analytics.config';
import { AnalyticsDetailsService } from './../services/analytics-details.service';
import * as analyticsDetailsActions from './analytics-details.actions';

@Injectable()
export class AnalyticsDetailsEffects {
	LOADER_IDS = analyticsConfig.LOADER_IDS;

	constructor(
		private actions$: Actions,
		private utilityService: UtilityService,
		private analyticsDetailsService: AnalyticsDetailsService
	) {}

	getParticipantDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(analyticsDetailsActions.getParticipantDetails),
			tap(() =>
				this.utilityService.startLoader(this.LOADER_IDS.PARTICIPANT_DETAILS)
			),
			switchMap(({ recordingId }) =>
				this.analyticsDetailsService.getParticipantDetails(recordingId).pipe(
					map((participantDetails) =>
						analyticsDetailsActions.getParticipantDetailsSuccess({
							participantDetails,
						})
					),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.PARTICIPANT_DETAILS)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	getTalkRatioDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(analyticsDetailsActions.getTalkRatioDetails),
			switchMap(({ recordingId }) =>
				this.analyticsDetailsService.getTalkRatioDetails(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.eventTalkRatioDto) {
							return analyticsDetailsActions.getTalkRatioDetailsSuccess({
								talkRatioDetails: data,
							});
						} else {
							return analyticsDetailsActions.getTalkRatioEmptyMessage({
								message: status.description,
							});
						}
					}),
					catchError(() => EMPTY)
				)
			)
		);
	});
}
