import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-chips',
	templateUrl: './chips.component.html',
	styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
	@Input() color: string | undefined;
	@Input() chipsTitle: string | undefined;
	@Input() chipsCount: number | undefined;
	@Input() appearance: 'fill' | 'outline' = 'outline';

	constructor() {}
}
