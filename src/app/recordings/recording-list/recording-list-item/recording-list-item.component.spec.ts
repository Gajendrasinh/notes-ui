import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingListItemComponent } from './recording-list-item.component';

describe('RecordingListItemComponent', () => {
	let component: RecordingListItemComponent;
	let fixture: ComponentFixture<RecordingListItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecordingListItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RecordingListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
