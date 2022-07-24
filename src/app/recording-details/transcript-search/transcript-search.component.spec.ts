import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptSearchComponent } from './transcript-search.component';

describe('TranscriptSearchComponent', () => {
	let component: TranscriptSearchComponent;
	let fixture: ComponentFixture<TranscriptSearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TranscriptSearchComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TranscriptSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
