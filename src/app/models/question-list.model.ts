export interface QuestionList {
	question: string;
	speaker: Speaker;
	dialogueId: number;
}
export interface Speaker {
	emailId: string;
	isOrgUser: boolean;
	name: string;
}
