export const environment = {
	production: true,
	environmentName: 'QA',
	urls: {
		apiBaseUrl: (<any>window).urls.apiBaseUrl,
		deployUrl: (<any>window).urls.deployUrl,
		userMgtBaseUrl: (<any>window).urls.userMgtBaseUrl,
	},
	awsconfig: (<any>window).awsAuthCredentials,
	featureAccess: {
		analyticsModule: false,
		isTalkRatio: true,
		isTopicsDiscussed: true,
		profleModue: true,
		isProfileDetails: true,
		isProfileVoiceprint: true,
		isProfileCalendar: true,
	},
};
