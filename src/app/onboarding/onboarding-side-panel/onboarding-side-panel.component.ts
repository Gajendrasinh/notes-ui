import { Component, Input } from '@angular/core';
import { Step } from 'src/app/models/onboarding.model';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';

@Component({
	selector: 'app-onboarding-side-panel',
	templateUrl: './onboarding-side-panel.component.html',
	styleUrls: ['./onboarding-side-panel.component.scss'],
})
export class OnboardingSidePanelComponent {
	@Input() steps: Step[] = [];
	getAssetsPath = getAssetsPath;

	constructor() {}
}
