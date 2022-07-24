import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromThemesAndTopics from '../reducers/themes-and-topics.reducer';
import * as fromTopics from '../reducers/topics.reducer';

const selectThemesAndTopicsState =
	createFeatureSelector<fromThemesAndTopics.State>(
		fromThemesAndTopics.themesAndTopicsFeatureKey
	);

export const selectTopics = createSelector(
	selectThemesAndTopicsState,
	(state) => {
		const topics = fromTopics.selectAll(state.topics);
		const searchRegEx = new RegExp(state.topics.searchBy, 'i');
		if (state.topics.searchBy) {
			return topics.filter(
				(t) =>
					t.name.match(searchRegEx) ||
					t.keywords.find((k) => k.name.match(searchRegEx))
			);
		}
		return topics;
	}
);

export const selectTopicsCount = createSelector(
	selectTopics,
	(topics) => topics.length
);
export const selectTopicById = (topicId: number) =>
	createSelector(selectTopics, (topics) => {
		return topics.find((t) => t.id === topicId);
	});
