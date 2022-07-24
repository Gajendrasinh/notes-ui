import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ProfileComponent } from './profile.component';
import { UserDetaiilsComponent } from './user-detaiils/user-detaiils.component';
import { UserVoiceprintComponent } from './user-voiceprint/user-voiceprint.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{ path: '', redirectTo: 'user-details' },
			{ path: 'user-details', component: UserDetaiilsComponent },
			{ path: 'voice-print', component: UserVoiceprintComponent },
			{ path: 'calendar', component: UserCalendarComponent },
		],
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
