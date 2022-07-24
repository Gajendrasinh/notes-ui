import { createAction, props } from '@ngrx/store';
import { Topic } from 'src/app/models/admin-topic-list.model';

export const loadTopics = createAction('[ThemesAndTopics] Load Topics');
export const loadTopicsSuccess = createAction(
	'[ThemesAndTopics] Load Topics Success',
	props<{ topics: Topic[] }>()
);
export const loadTopicsFailure = createAction(
	'[ThemesAndTopics] Load Topics Failure',
	props<{ error: any }>()
);
export const filterTopic = createAction(
	'[ThemesAndTopics] Filter Topics',
	props<{ searchBy: string }>()
);
