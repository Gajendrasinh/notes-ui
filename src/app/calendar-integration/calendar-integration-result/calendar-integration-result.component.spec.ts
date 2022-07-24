import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarIntegrationResultComponent } from './calendar-integration-result.component';

describe('CalendarIntegrationResultComponent', () => {
	let component: CalendarIntegrationResultComponent;
	let fixture: ComponentFixture<CalendarIntegrationResultComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarIntegrationResultComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CalendarIntegrationResultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
