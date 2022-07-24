import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RecordingsComponent } from './recordings.component';

const routes: Routes = [
	{ path: '', component: RecordingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecordingsRoutingModule {}
