import { createAction, props } from '@ngrx/store';
import { EventsData } from 'src/app/models/recordings.model';

export const loadActions = createAction('[Actions] Load Actions');

export const setSearchText = createAction(
	'[Recordings] Set Search Text',
	props<{ searchText: string }>()
);
export const setSortBy = createAction(
	'[Recordings] Set Sort By',
	props<{ sortBy: string }>()
);
export const toggleSortOrder = createAction('[Recordings] Toggle Sort Order');
export const getEventList = createAction('[Recordings] Get Event List');
export const getEventListSuccess = createAction(
	'[Recordings] Get Event List Success',
	props<{ eventsData: EventsData }>()
);
export const resetEventListState = createAction(
	'[Recorings] Clear Recording Events and Common State'
);
export const getRecordingListingEmptyMessage = createAction(
	'[Recordings] Get Recording Listing Empty Message',
	props<{ message: string }>()
);
