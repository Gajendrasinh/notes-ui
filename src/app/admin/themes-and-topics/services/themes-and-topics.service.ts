import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
	SaveTopicRequest,
	Topic,
	TopicList,
} from 'src/app/models/admin-topic-list.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';

@Injectable({
	providedIn: 'root',
})
export class ThemesAndTopicsService {
	constructor(private httpClient: HttpClient) {}

	getTopicList() {
		return this.httpClient
			.get<ApiResponse<TopicList>>(ApiConstants.GET_TOPIC_LIST_ADMIN())
			.pipe(map((response) => response.data?.topics || []));
	}

	addTopic(topic: SaveTopicRequest) {
		return this.httpClient
			.post<ApiResponse<Topic>>(ApiConstants.ADD_TOPIC(), topic)
			.pipe(map((response) => response));
	}
}
