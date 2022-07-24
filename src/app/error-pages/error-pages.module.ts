import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
	{ path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ErrorPagesModule {}
