import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingListHeaderComponent } from './recording-list-header.component';

describe('RecordingListHeaderComponent', () => {
	let component: RecordingListHeaderComponent;
	let fixture: ComponentFixture<RecordingListHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecordingListHeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RecordingListHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
