import { createAction, props } from '@ngrx/store';
import { RulesUpdatedStatus } from 'src/app/models/rule-status-update.model';
import { RulesDetails } from 'src/app/models/sync-calendar-rules.model';

export const getRuleUpdatedStatus = createAction(
	'[Rule Updated Status] Get Rule Updated Status'
);
export const setRules = createAction(
	'[Bot Setting] Set Rules',
	props<{ request: Partial<RulesDetails> }>()
);
export const clearState = createAction(
	'[Bot Setting] Clear Rule updated status'
);
export const getRuleUpdatedStatusSuccess = createAction(
	'[Rule Updated Status] Get Rule Updated Status Success',
	props<{ rulesUpdatedStatus: RulesUpdatedStatus }>()
);
export const getRuleUpdatedStatusEmptyMessage = createAction(
	'[Rule Updated Status] Get Rule Updated Status Empty Message',
	props<{ message: string }>()
);
