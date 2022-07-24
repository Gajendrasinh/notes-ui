import { Component } from '@angular/core';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
	getAssetsPath = getAssetsPath;

	constructor() {}
}
