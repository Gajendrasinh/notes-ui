import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
	{ path: '', component: AnalyticsComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
