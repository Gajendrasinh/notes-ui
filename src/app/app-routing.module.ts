import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{
		path: '',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'recordings',
		loadChildren: () =>
			import('./recordings/recordings.module').then((m) => m.RecordingsModule),
	},
	{
		path: 'recordings/:id',
		loadChildren: () =>
			import('./recording-details/recording-details.module').then(
				(m) => m.RecordingDetailsModule
			),
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: 'onboarding',
		loadChildren: () =>
			import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('./profile/profile.module').then((m) => m.ProfileModule),
	},
	{
		path: 'calendar/sync',
		loadChildren: () =>
			import('./calendar-integration/calendar-integration.module').then(
				(m) => m.CalendarIntegrationModule
			),
	},
	{
		path: 'analytics/:id',
		loadChildren: () =>
			import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
	},
	{
		path: 'e',
		loadChildren: () =>
			import('./error-pages/error-pages.module').then(
				(m) => m.ErrorPagesModule
			),
	},
	{ path: '**', redirectTo: '/e/page-not-found' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
