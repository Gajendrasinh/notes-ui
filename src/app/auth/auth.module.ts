import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InputModule } from '../ui-components/input/input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL_MODULES = [
	MatIconModule,
	MatFormFieldModule,
	MatButtonModule,
	MatInputModule,
	MatProgressSpinnerModule,
];
@NgModule({
	declarations: [
		LoginComponent,
		AuthWrapperComponent,
		SignUpComponent,
		ForgotPasswordComponent,
		ChangePasswordComponent,
	],
	imports: [
		...MATERIAL_MODULES,
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUiLoaderModule,
		InputModule,
	],
})
export class AuthModule {}
