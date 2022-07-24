import { TestBed } from '@angular/core/testing';

import { AuthorizedRedirectGuard } from './authorized-redirect.guard';

describe('AuthorizedRedirectGuard', () => {
	let guard: AuthorizedRedirectGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AuthorizedRedirectGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
