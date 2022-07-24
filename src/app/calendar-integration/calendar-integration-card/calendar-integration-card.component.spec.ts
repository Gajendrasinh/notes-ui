import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarIntegrationCardComponent } from './calendar-integration-card.component';

describe('CalendarIntegrationCardComponent', () => {
	let component: CalendarIntegrationCardComponent;
	let fixture: ComponentFixture<CalendarIntegrationCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarIntegrationCardComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CalendarIntegrationCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
