import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RecordingDetailsComponent } from './recording-details.component';

const routes: Routes = [
	{ path: '', component: RecordingDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecordingDetailsRoutingModule {}
