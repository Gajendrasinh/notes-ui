import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RecordingDetailsEffects } from './recording-details.effects';

describe('RecordingDetailsEffects', () => {
	let actions$: Observable<any>;
	let effects: RecordingDetailsEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RecordingDetailsEffects, provideMockActions(() => actions$)],
		});

		effects = TestBed.inject(RecordingDetailsEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
