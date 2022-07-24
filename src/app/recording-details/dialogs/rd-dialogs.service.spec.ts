import { TestBed } from '@angular/core/testing';

import { RdDialogsService } from './rd-dialogs.service';

describe('RdDialogsService', () => {
	let service: RdDialogsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RdDialogsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
