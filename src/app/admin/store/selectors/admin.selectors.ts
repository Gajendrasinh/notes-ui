import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from '../reducers/admin.reducer';

export const selectAdminState = createFeatureSelector<fromAdmin.State>(
	fromAdmin.adminFeatureKey
);
export const selectRulesUpdatedStatus = createSelector(
	selectAdminState,
	(state) => state.rulesUpdatedStatus
);
export const selectRulesUpdatedStatusEmptyMessage = createSelector(
	selectAdminState,
	(state) => state.emptyWidgetMessages.rulesUpdatedStatusMsg
);
export const selectRuleUpdateInProgress = createSelector(
	selectAdminState,
	(state) => state.rulesUpdateInProgress
);
