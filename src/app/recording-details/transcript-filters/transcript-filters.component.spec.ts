import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptFiltersComponent } from './transcript-filters.component';

describe('TranscriptFiltersComponent', () => {
	let component: TranscriptFiltersComponent;
	let fixture: ComponentFixture<TranscriptFiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TranscriptFiltersComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TranscriptFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
