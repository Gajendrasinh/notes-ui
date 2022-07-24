export interface Attendee {
	name: string;
	emailId: string;
	editable: boolean;
	designation?: string;
	isOrgUser?: boolean;
}

export interface AuthUserInfo {
	email: string;
	email_verified: boolean;
	family_name: string;
	given_name: string;
	sub: string;
}

export interface UserProfile {
	emailId: string;
	familyName: string;
	givenName: string;
	id: number;
}

export type RecordingType = 'AUDIO' | 'VIDEO' | undefined;

export interface UserVoicePrint {
	voicePrintType: RecordingType;
	voicePrintTPath: string;
}
