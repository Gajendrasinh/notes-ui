import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RecordingEvent } from 'src/app/models/recordings.model';
import * as HomeActions from './recording.actions';

export interface RecordingEventsState extends EntityState<RecordingEvent> {
	loaded: boolean;
	lastFetchedTime: number;
	searchText: string;
	sortBy: string;
	sortOrder: string;
}

export const recordingEventsAdapter = createEntityAdapter<RecordingEvent>({
	selectId: (event) => event.eventId,
});

const initialState = recordingEventsAdapter.getInitialState({
	lastFetchedTime: 0,
	searchText: '',
	sortBy: 'Date',
	sortOrder: 'desc',
	loaded: false,
});

export const recordingEventsReducer = createReducer(
	initialState,
	on(HomeActions.getEventListSuccess, (state, { eventsData }) => ({
		...recordingEventsAdapter.upsertMany(eventsData.events, state),
		lastFetchedTime: eventsData.lastFetchedTime,
		loaded: true,
	})),
	on(HomeActions.setSearchText, (state, { searchText }) => ({
		...state,
		searchText,
	})),
	on(HomeActions.setSortBy, (state, { sortBy }) => ({ ...state, sortBy })),
	on(HomeActions.toggleSortOrder, (state) => ({
		...state,
		sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
	})),
	on(HomeActions.resetEventListState, () => initialState)
);

export const reducers = (
	state: RecordingEventsState | undefined,
	action: Action
) => {
	return recordingEventsReducer(state, action);
};
