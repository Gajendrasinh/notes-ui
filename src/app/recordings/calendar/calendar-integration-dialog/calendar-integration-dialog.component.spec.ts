import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarIntegrationDialogComponent } from './calendar-integration-dialog.component';

describe('CalendarIntegrationDialogComponent', () => {
	let component: CalendarIntegrationDialogComponent;
	let fixture: ComponentFixture<CalendarIntegrationDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarIntegrationDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CalendarIntegrationDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
