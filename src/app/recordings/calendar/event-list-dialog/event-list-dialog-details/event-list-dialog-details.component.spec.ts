import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDialogDetailsComponent } from './event-list-dialog-details.component';

describe('EventListDialogDetailsComponent', () => {
	let component: EventListDialogDetailsComponent;
	let fixture: ComponentFixture<EventListDialogDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EventListDialogDetailsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EventListDialogDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
