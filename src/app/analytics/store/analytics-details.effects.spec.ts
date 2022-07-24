import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnalyticsDetailsEffects } from './analytics-details.effects';

describe('AnalyticsDetailsEffects', () => {
	let actions$: Observable<any>;
	let effects: AnalyticsDetailsEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AnalyticsDetailsEffects, provideMockActions(() => actions$)],
		});

		effects = TestBed.inject(AnalyticsDetailsEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
