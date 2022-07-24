import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedRedirectGuard } from '../shared/guards/authorized-redirect.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthorizedRedirectGuard],
	},
	{
		path: 'register/:id',
		component: SignUpComponent,
		canActivate: [AuthorizedRedirectGuard],
	},
	{
		path: 'register',
		component: SignUpComponent,
		canActivate: [AuthorizedRedirectGuard],
	},
	{ path: 'change-password', component: ChangePasswordComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
