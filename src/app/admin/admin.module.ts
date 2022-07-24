import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppsMenuModule } from '../common/app-menu/apps-menu.module';
import { ChipsModule } from '../common/chips/chips.module';
import { SharedModule } from '../shared/shared.module';
import { InputModule } from '../ui-components/input/input.module';
import { AccountDetailsWrapperComponent } from './account-details-wrapper/account-details-wrapper.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RecordingSettingsComponent } from './recording-settings/recording-settings.component';
import { ThemesAndTopicsComponent } from './themes-and-topics/themes-and-topics.component';
import { ThemesComponent } from './themes-and-topics/themes/themes.component';
import { AddSearchTopicComponent } from './themes-and-topics/topics/add-search-topic/add-search-topic.component';
import { AddTopicComponent } from './themes-and-topics/topics/add-topic/add-topic.component';
import { TopicItemComponent } from './themes-and-topics/topics/topic-list/topic-item/topic-item.component';
import { TopicListComponent } from './themes-and-topics/topics/topic-list/topic-list.component';
import { TopicsComponent } from './themes-and-topics/topics/topics.component';
import { UsersAndRolesComponent } from './users-and-roles/users-and-roles.component';
import { InviteUserDialogComponent } from './users-and-roles/users/invite-user-dialog/invite-user-dialog.component';
import { UsersComponent } from './users-and-roles/users/users.component';
import * as fromAdmin from '../admin/store/reducers/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/effects/admin.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [
		AdminComponent,
		UsersComponent,
		AdminHeaderComponent,
		AccountDetailsWrapperComponent,
		AccountDetailsComponent,
		InviteUserDialogComponent,
		RecordingSettingsComponent,
		UsersAndRolesComponent,
		ThemesAndTopicsComponent,
		TopicsComponent,
		ThemesComponent,
		AddSearchTopicComponent,
		TopicListComponent,
		TopicItemComponent,
		AddTopicComponent,
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		SharedModule,
		FormsModule,
		InputModule,
		AppsMenuModule,
		ChipsModule,
		StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducer),
		EffectsModule.forFeature([AdminEffects]),
	],
})
export class AdminModule {}
