import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

const CHART_COMPONENTS = [DoughnutChartComponent];

@NgModule({
	declarations: [...CHART_COMPONENTS],
	imports: [CommonModule],
	exports: [...CHART_COMPONENTS],
})
export class ChartsModule {}
