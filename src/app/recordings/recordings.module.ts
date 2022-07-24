import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingsRoutingModule } from './recordings-routing.module';
import { RecordingsComponent } from './recordings.component';
import { RecordingListComponent } from './recording-list/recording-list.component';
import { SharedModule } from '../shared/shared.module';
import { RecordingListItemComponent } from './recording-list/recording-list-item/recording-list-item.component';
import { RecordingListHeaderComponent } from './recording-list/recording-list-header/recording-list-header.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/recording.reducer';
import { storeFeatureKey } from './store/recording.selectors';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/recording.effects';
import { ActiveRecordingDirective } from './directives/active-recording.directive';
import { ActiveItemDirective } from './directives/active-item.directive';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarIntegrationDialogComponent } from './calendar/calendar-integration-dialog/calendar-integration-dialog.component';
import { EventListDialogComponent } from './calendar/event-list-dialog/event-list-dialog.component';
import { EventListDialogDetailsComponent } from './calendar/event-list-dialog/event-list-dialog-details/event-list-dialog-details.component';
import { EventListDialogListComponent } from './calendar/event-list-dialog/event-list-dialog-list/event-list-dialog-list.component';
import { EventListDialogHeaderComponent } from './calendar/event-list-dialog/event-list-dialog-header/event-list-dialog-header.component';
import { CalendarIntegrationModule } from '../calendar-integration/calendar-integration.module';
import { WelcomeNoteComponent } from './recording-list/welcome-note/welcome-note.component';
import { AppsMenuModule } from '../common/app-menu/apps-menu.module';

@NgModule({
	declarations: [
		RecordingsComponent,
		RecordingListComponent,
		RecordingListHeaderComponent,
		RecordingListItemComponent,
		ActiveRecordingDirective,
		ActiveItemDirective,
		HeaderComponent,
		CalendarComponent,
		CalendarIntegrationDialogComponent,
		EventListDialogComponent,
		EventListDialogHeaderComponent,
		EventListDialogDetailsComponent,
		EventListDialogListComponent,
		WelcomeNoteComponent,
	],
	imports: [
		CommonModule,
		RecordingsRoutingModule,
		SharedModule,
		StoreModule.forFeature(storeFeatureKey, reducers),
		EffectsModule.forFeature([HomeEffects]),
		CalendarIntegrationModule,
		AppsMenuModule,
	],
})
export class RecordingsModule {}
