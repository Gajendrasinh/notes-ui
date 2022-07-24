export interface TopicList {
	topics: Topic[];
}

export interface Topic {
	id: number;
	isDefault: boolean;
	keywords: Keyword[];
	name: string;
}

export interface SaveTopicRequest {
	keywords: string[];
	name: string;
}

export interface Keyword {
	id: number;
	name: string;
}
