import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
	declarations: [ChipsComponent],
	imports: [CommonModule, MatChipsModule],
	exports: [ChipsComponent],
})
export class ChipsModule {}
