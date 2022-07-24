import { TestBed } from '@angular/core/testing';

import { RecordingDetailsService } from './recording-details.service';

describe('RecordingDetailsService', () => {
	let service: RecordingDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RecordingDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
