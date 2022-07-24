import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { ThemesAndTopicsService } from '../../services/themes-and-topics.service';
import { ThemesAndTopicsConfig } from '../../themes-and-topics.config';
import * as ThemesAndTopicsActions from '../actions/themes-and-topics.actions';

@Injectable()
export class ThemesAndTopicsEffects {
	LOADER_IDS = ThemesAndTopicsConfig.LOADER_IDS;

	constructor(
		private actions$: Actions,
		private themesAndTopicsService: ThemesAndTopicsService,
		private utilityService: UtilityService
	) {}

	loadTopics$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ThemesAndTopicsActions.loadTopics),
			tap(() => this.utilityService.startLoader(this.LOADER_IDS.TOPICS)),
			switchMap(() =>
				this.themesAndTopicsService.getTopicList().pipe(
					map((topics) => ThemesAndTopicsActions.loadTopicsSuccess({ topics })),
					tap(() => this.utilityService.stopLoader(this.LOADER_IDS.TOPICS)),
					catchError(() => EMPTY)
				)
			)
		);
	});
}
