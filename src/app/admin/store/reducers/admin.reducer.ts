import { Action, createReducer, on } from '@ngrx/store';
import { RulesUpdatedStatus } from 'src/app/models/rule-status-update.model';
import * as AdminActions from '../actions/admin.actions';

export const adminFeatureKey = 'admin';

export interface State {
	rulesUpdatedStatus: RulesUpdatedStatus | undefined;
	emptyWidgetMessages: {
		rulesUpdatedStatusMsg: string;
	};
	rulesUpdateInProgress: boolean;
}

export const initialState: State = {
	rulesUpdatedStatus: undefined,
	rulesUpdateInProgress: false,
	emptyWidgetMessages: {
		rulesUpdatedStatusMsg: '',
	},
};

const adminReducer = createReducer(
	initialState,
	on(
		AdminActions.getRuleUpdatedStatusSuccess,
		(state, { rulesUpdatedStatus }) => ({
			...state,
			rulesUpdatedStatus,
			rulesUpdateInProgress: false,
		})
	),
	on(AdminActions.clearState, () => ({ ...initialState })),
	on(AdminActions.setRules, (state) => ({
		...state,
		rulesUpdateInProgress: true,
	})),
	on(AdminActions.getRuleUpdatedStatusEmptyMessage, (state, { message }) => ({
		...state,
		emptyWidgetMessages: {
			...state.emptyWidgetMessages,
			rulesUpdatedStatusMsg: message,
		},
		rulesUpdateInProgress: true,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return adminReducer(state, action);
}
