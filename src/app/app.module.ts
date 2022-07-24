import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';

const INITIAL_MATERIAL_MODULES = [
	MatSnackBarModule,
	MatDialogModule,
	MatMenuModule,
	MatAutocompleteModule,
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
	fgsColor: 'white',
	overlayColor: '#0003',
	overlayBorderRadius: '5px',
	fgsSize: 40,
	fgsType: SPINNER.rectangleBounce,
	hasProgressBar: false,
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		...INITIAL_MATERIAL_MODULES,
		BrowserModule,
		ReactiveFormsModule, //Add if needed
		AppRoutingModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		EffectsModule.forRoot([]),
		HttpClientModule,
		NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		CookieService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
