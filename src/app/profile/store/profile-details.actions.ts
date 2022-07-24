import { createAction, props } from '@ngrx/store';
import { UserProfile } from 'src/app/models/user.model';

export const getProfileDetails = createAction(
	'[User Profile Details] Get User Profile Details'
);
export const getProfileDetailsSuccess = createAction(
	'[User Profile Details Success] Get User Profile Details Success',
	props<{ userProfile: UserProfile }>()
);
