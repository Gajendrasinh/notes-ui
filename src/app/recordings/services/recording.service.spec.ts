import { TestBed } from '@angular/core/testing';

import { RecordingsService } from './recording.service';

describe('RecordingsService', () => {
	let service: RecordingsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RecordingsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
