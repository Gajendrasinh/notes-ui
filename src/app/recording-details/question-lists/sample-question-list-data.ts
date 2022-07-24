import { ApiResponse } from 'src/app/models/api-response.model';
import { QuestionList } from 'src/app/models/question-list.model';

export const QUESTION_LIST_SAMPLE_DATA: ApiResponse<QuestionList[]> = {
	status: {
		description: 'string',
		statusCode: '0',
	},
	data: [
		{
			question: 'Okay, I can help you with that. May I have your full name?',
			speaker: {
				emailId: 'arun.rajappa@xyz.ai',
				isOrgUser: false,
				name: 'Arun Rajappa',
			},
		},
		{
			question:
				'Thank you for contacting Acme Brands! How can I help you today?',
			speaker: {
				emailId: 'vivek.menon@dataorb.ai',
				isOrgUser: true,
				name: 'Vivek Menon',
			},
		},
	],
};
