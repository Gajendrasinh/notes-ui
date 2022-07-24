import { Component } from '@angular/core';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';

@Component({
	selector: 'app-profile-header',
	templateUrl: './profile-header.component.html',
	styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent {
	getAssetsPath = getAssetsPath;

	constructor() {}
}
