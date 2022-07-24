import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Topic } from 'src/app/models/admin-topic-list.model';
import * as ThemesAndTopicsActions from '../actions/themes-and-topics.actions';

export interface TopicsState extends EntityState<Topic> {
	searchBy: string;
}

export const topicsAdapter = createEntityAdapter<Topic>();

export const initialState = topicsAdapter.getInitialState({
	searchBy: '',
});

export const topicsReducer = createReducer(
	initialState,
	on(ThemesAndTopicsActions.loadTopicsSuccess, (state, { topics }) =>
		topicsAdapter.setAll(topics, state)
	),
	on(ThemesAndTopicsActions.filterTopic, (state, { searchBy }) => ({
		...state,
		searchBy,
	}))
);

export const { selectAll, selectTotal, selectEntities, selectIds } =
	topicsAdapter.getSelectors();
