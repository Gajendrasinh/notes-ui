import { TestBed } from '@angular/core/testing';

import { ThemesAndTopicsService } from './themes-and-topics.service';

describe('ThemesAndTopicsService', () => {
	let service: ThemesAndTopicsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemesAndTopicsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
