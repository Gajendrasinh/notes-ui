import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingDetailsHeaderComponent } from './recording-details-header.component';

describe('RecordingDetailsHeaderComponent', () => {
	let component: RecordingDetailsHeaderComponent;
	let fixture: ComponentFixture<RecordingDetailsHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecordingDetailsHeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RecordingDetailsHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
