import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDialogComponent } from './event-list-dialog.component';

describe('EventListDialogComponent', () => {
	let component: EventListDialogComponent;
	let fixture: ComponentFixture<EventListDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EventListDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EventListDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
