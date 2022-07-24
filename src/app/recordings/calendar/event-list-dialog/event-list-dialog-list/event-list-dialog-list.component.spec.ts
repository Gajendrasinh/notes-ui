import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDialogListComponent } from './event-list-dialog-list.component';

describe('EventListDialogListComponent', () => {
	let component: EventListDialogListComponent;
	let fixture: ComponentFixture<EventListDialogListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EventListDialogListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EventListDialogListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
