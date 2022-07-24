import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification/notification.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { DateWithLocalTimezonePipe } from './pipes/date-with-local-timezone.pipe';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component';
import { UserProfileMenuComponent } from './components/user-menu/user-profile-menu/user-profile-menu.component';
import { PlaybackTimePipe } from './pipes/playback-time.pipe';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AvatarModule } from 'ngx-avatar';
import { VirtualScrollerModule } from './virtual-scroller/virtual-scroller';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FeatureAccessPipe } from './pipes/feature-access.pipe';

const COMPONENTS = [
	NotificationComponent,
	NoDataFoundComponent,
	CircleLoaderComponent,
	UserMenuComponent,
	NavbarComponent,
];

const PIPES = [DateWithLocalTimezonePipe, PlaybackTimePipe, FeatureAccessPipe];

const SHARED_MODULES = [NgxUiLoaderModule];

@NgModule({
	declarations: [...COMPONENTS, ...PIPES, UserProfileMenuComponent],
	imports: [
		CommonModule,
		MaterialModule,
		AvatarModule,
		VirtualScrollerModule,
		RouterModule,
	],
	exports: [
		MaterialModule,
		AvatarModule,
		ReactiveFormsModule,
		VirtualScrollerModule,
		...COMPONENTS,
		...SHARED_MODULES,
		...PIPES,
	],
	providers: [DatePipe],
})
export class SharedModule {}
