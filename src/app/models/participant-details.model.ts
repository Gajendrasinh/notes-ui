export interface Participant {
	name: string;
	talkRatio: number;
	talkTime: number;
	designation: string;
	organization: boolean;
	inviter: boolean;
	registeredParticipantId: number;
	guestParticipantId: number;
	emailId: string;
	isNameRequired: boolean;
}

export interface ParticipantDetails {
	orgName: string;
	nonOrgName: string;
	participantDetails: Participant[];
}
