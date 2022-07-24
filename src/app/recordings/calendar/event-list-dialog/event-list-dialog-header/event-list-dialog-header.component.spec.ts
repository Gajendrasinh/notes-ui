import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDialogHeaderComponent } from './event-list-dialog-header.component';

describe('EventListDialogHeaderComponent', () => {
	let component: EventListDialogHeaderComponent;
	let fixture: ComponentFixture<EventListDialogHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EventListDialogHeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EventListDialogHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
