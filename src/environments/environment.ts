// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	environmentName: 'DEV',
	urls: {
		apiBaseUrl: 'https://intgateway.dataorb.ai/api',
		deployUrl: '',
	},
	awsconfig: {
		aws_project_region: 'us-east-1',
		aws_cognito_region: 'us-east-1',
		aws_user_pools_id: 'us-east-1_X6MtU1uST',
		aws_user_pools_web_client_id: 'rdf64drtn928mnofoph47um0e',
		oauth: {
			domain: 'intaccount.dataorb.ai',
			scope: [
				'phone',
				'email',
				'openid',
				'profile',
				'aws.cognito.signin.user.admin',
			],
			redirectSignIn: 'http://localhost:4200/login',
			redirectSignOut: 'http://localhost:4200/',
			responseType: 'code',
		},
		federationTarget: 'COGNITO_USER_POOLS',
		// Auth: {
		//   cookieStorage: {
		//     domain: 'dataorb.ai',
		//     path: '/',
		//     expires: 365,
		//     secure: false
		//   }
		// }
	},
	featureAccess: {
		analyticsModule: false,
		isTalkRatio: true,
		isTopicsDiscussed: false,
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
