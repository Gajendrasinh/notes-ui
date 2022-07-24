import {
	Action,
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import { UserProfile } from 'src/app/models/user.model';
import * as profileDetailsActions from './profile-details.actions';

export const profileDetailsFeatureKey = 'analyticsDetails';

export interface ProfileDetailsState {
	userProfile: UserProfile | undefined;
}

const initialState: ProfileDetailsState = {
	userProfile: undefined,
};

const profileDetailsReducer = createReducer(
	initialState,
	on(
		profileDetailsActions.getProfileDetailsSuccess,
		(state, { userProfile }) => ({ ...state, userProfile })
	)
);

export function reducer(
	state: ProfileDetailsState | undefined,
	action: Action
) {
	return profileDetailsReducer(state, action);
}

/** Selectors */
const selectState = createFeatureSelector<ProfileDetailsState>(
	profileDetailsFeatureKey
);

export const selectProfileDetails = createSelector(
	selectState,
	(state) => state.userProfile
);
