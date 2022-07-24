import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { OnboardingService } from 'src/app/onboarding/services/onboarding.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AdminService } from '../../services/admin.service';
import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
	constructor(
		private actions$: Actions,
		private adminService: AdminService,
		private notificationService: NotificationService,
		private onboardingService: OnboardingService
	) {}

	/* Get Rules Updated Status Item */
	getRulesUpdatedStatus$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AdminActions.getRuleUpdatedStatus),
			tap(),
			switchMap(() =>
				this.adminService.getRulesUpdateStatus().pipe(
					map(({ data, status }) => {
						if (data) {
							return AdminActions.getRuleUpdatedStatusSuccess({
								rulesUpdatedStatus: data,
							});
						} else {
							return AdminActions.getRuleUpdatedStatusEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(),
					catchError(() => EMPTY)
				)
			)
		);
	});

	/* Get Rules Updated Status Item */
	setRules$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AdminActions.setRules),
				switchMap(({ request }) =>
					this.onboardingService.setRules(request).pipe(
						map((data) => {
							if (data) {
								this.notificationService.showNotification(
									'Recording settings saved successfully',
									'success'
								);
							}
						}),
						tap(),
						catchError(() => EMPTY)
					)
				)
			);
		},
		{ dispatch: false }
	);
}
