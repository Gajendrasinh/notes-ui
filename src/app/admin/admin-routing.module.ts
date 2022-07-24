import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AccountDetailsWrapperComponent } from './account-details-wrapper/account-details-wrapper.component';
import { AdminComponent } from './admin.component';
import { RecordingSettingsComponent } from './recording-settings/recording-settings.component';
import { UsersAndRolesComponent } from './users-and-roles/users-and-roles.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'account-details' },
			{ path: 'account-details', component: AccountDetailsWrapperComponent },
			{ path: 'users-and-roles', component: UsersAndRolesComponent },
			{ path: 'bot-settings', component: RecordingSettingsComponent },
			{
				path: 'themes-and-topics',
				loadChildren: () =>
					import('./themes-and-topics/themes-and-topics.module').then(
						(m) => m.ThemesAndTopicsModule
					),
			},
		],
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
