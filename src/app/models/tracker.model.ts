/*  New topic Type as per API JSON response from */
export interface TopicsDetails {
	eventId: string;
	topics: Topic[];
}
export interface Topic {
	id: number;
	name: string;
	count: number;
	isExpanded?: boolean;
	keywords: Keyword[];
	isSelected?: boolean;
}
export interface Keyword {
	id: number;
	name: string;
	count: number;
	dialogues: Dialogue[];
}
export interface Dialogue {
	keywordId?: number;
	id: number;
	beginOffset: number;
	endOffset: number;
}
