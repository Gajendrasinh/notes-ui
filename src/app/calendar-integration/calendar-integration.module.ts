import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarIntegrationCardComponent } from './calendar-integration-card/calendar-integration-card.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarIntegrationResultComponent } from './calendar-integration-result/calendar-integration-result.component';
import { CalendarIntegrationRoutingModule } from './calendar-integration-routing.module';

const COMPONENTS = [
	CalendarIntegrationCardComponent,
	CalendarIntegrationResultComponent,
];
@NgModule({
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS],
	imports: [
		CommonModule,
		SharedModule,
		CommonModule,
		CalendarIntegrationRoutingModule,
	],
})
export class CalendarIntegrationModule {}
