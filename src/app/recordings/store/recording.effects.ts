import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
	catchError,
	exhaustMap,
	map,
	tap,
	withLatestFrom,
} from 'rxjs/operators';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { RecordingsService } from '../services/recording.service';
import * as HomeActions from './recording.actions';
import {
	selectLastFetchedTime,
	selectRecordingListLoaded,
} from './recording.selectors';

@Injectable()
export class HomeEffects {
	LOADER_IDS = RecordingDetailsConfig.LOADER_IDS;
	constructor(
		private actions$: Actions,
		private store: Store,
		private recordingsService: RecordingsService,
		private utilityService: UtilityService
	) {}

	getRecordings$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(HomeActions.getEventList),
			withLatestFrom(
				this.store.select(selectLastFetchedTime),
				this.store.select(selectRecordingListLoaded)
			),
			tap(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				([action, lastFetchedTime, loaded]) =>
					!loaded &&
					this.utilityService.startLoader(
						this.LOADER_IDS.RECORDING_LISTING_PANEL
					)
			),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			exhaustMap(([action, lastFetchedTime, loaded]) => {
				return this.recordingsService.getRecordings(lastFetchedTime).pipe(
					map(({ data, status }) => {
						if (data) {
							return HomeActions.getEventListSuccess({
								eventsData: {
									...data,
									lastFetchedTime: data.lastFetchedTime || lastFetchedTime,
								},
							});
						} else {
							return HomeActions.getRecordingListingEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(
						() =>
							!loaded &&
							this.utilityService.stopLoader(
								this.LOADER_IDS.RECORDING_LISTING_PANEL
							)
					),
					catchError(() => EMPTY)
				);
			})
		);
	});
}
