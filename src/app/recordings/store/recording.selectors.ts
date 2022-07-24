import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecordingEvent } from 'src/app/models/recordings.model';
import {
	recordingEventsAdapter,
	RecordingEventsState,
} from './recording.reducer';

export const storeFeatureKey = 'eventListing';

const SortFnMap = {
	Date: (sortMultiplier: number) => (a: RecordingEvent, b: RecordingEvent) =>
		(a.meetingTime > b.meetingTime ? 1 : -1) * sortMultiplier,
	Name: (sortMultiplier: number) => (a: RecordingEvent, b: RecordingEvent) =>
		(a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) * sortMultiplier,
};

const selectEventsState =
	createFeatureSelector<RecordingEventsState>(storeFeatureKey);

const { selectAll, selectTotal } = recordingEventsAdapter.getSelectors();
export const selectAllEvents = createSelector(selectEventsState, selectAll);
export const selectAllEventsCount = createSelector(
	selectEventsState,
	selectTotal
);

export const selectSearchText = createSelector(
	selectEventsState,
	(state) => state.searchText
);
export const selectSortOrder = createSelector(
	selectEventsState,
	(state) => state.sortOrder
);
export const selectSortBy = createSelector(
	selectEventsState,
	(state) => state.sortBy
);
export const selectLastFetchedTime = createSelector(
	selectEventsState,
	(state) => state.lastFetchedTime
);
export const selectFilteredEvents = createSelector(
	selectAllEvents,
	selectEventsState,
	(events, state) => {
		const searchRegEx = new RegExp(state.searchText, 'gi');
		const sortMultiplier = state.sortOrder === 'asc' ? 1 : -1;

		return events
			.filter((e) => e.name.search(searchRegEx) !== -1)
			.sort(SortFnMap[state.sortBy as 'Date' | 'Name'](sortMultiplier));
	}
);
export const selectRecordingListLoaded = createSelector(
	selectEventsState,
	(state) => state.loaded
);
export const selectShowWelcomeNote = createSelector(
	selectEventsState,
	selectAllEventsCount,
	(state, count) => state.loaded && count === 0
);
