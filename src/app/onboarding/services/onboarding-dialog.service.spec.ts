import { TestBed } from '@angular/core/testing';

import { OnboardingDialogService } from './onboarding-dialog.service';

describe('OnboardingDialogService', () => {
	let service: OnboardingDialogService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(OnboardingDialogService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
