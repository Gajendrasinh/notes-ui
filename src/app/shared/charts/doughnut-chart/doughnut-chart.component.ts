import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnChanges,
	ViewChild,
} from '@angular/core';
import { Chart, ChartColor } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements AfterViewInit, OnChanges {
	@ViewChild('ChartCanvas') canvas: ElementRef | undefined;

	@Input() labels: string[] = [];
	@Input() data: number[] = [];
	@Input() backgroundColor: ChartColor[] = [];
	@Input() tooltipEnabled = true;

	_chartRef: Chart | undefined;

	constructor() {}

	ngAfterViewInit() {
		this._chartRef = new Chart(
			(this.canvas?.nativeElement as any).getContext('2d'),
			{
				type: 'doughnut',
				data: {
					labels: this.labels,
					datasets: [
						{
							data: this.data,
							backgroundColor: this.backgroundColor,
							borderWidth: 1,
						},
					],
				},
				options: {
					legend: {
						labels: {
							usePointStyle: true,
						},
						position: 'right',
					},
					tooltips: {
						enabled: this.tooltipEnabled,
					},
					plugins: {
						datalabels: {
							color: 'white',
							formatter: function (value: number) {
								return `${value}%`;
							},
						},
					},
				},
				plugins: [ChartDataLabels],
			}
		);
	}

	ngOnChanges(): void {
		if (this._chartRef) {
			this._chartRef.data.labels = this.labels;
			if (this._chartRef.data.datasets?.[0]) {
				this._chartRef.data.datasets[0].data = this.data;
			}
			this._chartRef.update();
		}
	}
}
