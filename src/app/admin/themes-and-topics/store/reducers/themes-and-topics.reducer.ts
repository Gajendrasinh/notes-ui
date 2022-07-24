import { ActionReducerMap } from '@ngrx/store';
import * as fromTopics from './topics.reducer';

export const themesAndTopicsFeatureKey = 'themesAndTopics';

export interface State {
	topics: typeof fromTopics.initialState;
}

export const reducers: ActionReducerMap<State> = {
	topics: fromTopics.topicsReducer,
};
