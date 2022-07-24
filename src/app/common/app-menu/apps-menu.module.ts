import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsMenuComponent } from './apps-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppsMenuComponent],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [AppsMenuComponent],
})
export class AppsMenuModule {}
