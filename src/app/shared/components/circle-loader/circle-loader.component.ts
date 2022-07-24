import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-circle-loader',
	templateUrl: './circle-loader.component.html',
	styleUrls: ['./circle-loader.component.scss'],
})
export class CircleLoaderComponent {
	wrapperSize?: number;
	loaderStyle: any;
	@Input() color?: string;
	@Input() set size(value: number | undefined) {
		if (value) {
			const loaderSize = value;
			const borderSize = Math.round(loaderSize / 10);
			this.wrapperSize = loaderSize + 8 + borderSize;
			this.loaderStyle = {
				width: loaderSize + 'px',
				height: loaderSize + 'px',
				borderWidth: borderSize + 'px',
				borderColor: `${this.color} transparent transparent transparent`,
			};
		}
	}

	constructor() {}
}
