export interface TranscriptSearch {
	searchBy: string;
	/** eg. if we have total 65 times match out of this which one you want to highlight on prev or next */
	activeSearchIndex?: number;
}

export interface TranscriptSearchResult {
	conversationCardIndex?: number;
	conversationIndex: number;
	/** In message at which place searchBy got matched  */
	matchIndex: number;
	time: number;
}
