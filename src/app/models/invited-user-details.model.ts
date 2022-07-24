export interface InvitedUser {
	emailId: string;
	role: string;
}

export interface InvitedUserError {
	emailId: string;
	description: string;
}

export interface InvitedUserDetails {
	users: UsersDetails[];
}
export interface UsersDetails {
	id: number;
	name: string;
	emailId: string;
	role: string;
	lastSignIn: string;
	isInvited: boolean;
}
