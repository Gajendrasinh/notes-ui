import { TestBed } from '@angular/core/testing';

import { AnalyticsDetailsService } from './analytics-details.service';

describe('AnalyticsDetailsService', () => {
	let service: AnalyticsDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AnalyticsDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
