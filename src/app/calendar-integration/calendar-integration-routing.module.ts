import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarIntegrationResultComponent } from './calendar-integration-result/calendar-integration-result.component';

const routes: Routes = [
	{ path: 'result', component: CalendarIntegrationResultComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CalendarIntegrationRoutingModule {}
