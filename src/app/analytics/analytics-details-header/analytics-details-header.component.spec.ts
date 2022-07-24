import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDetailsHeaderComponent } from './analytics-details-header.component';

describe('AnalyticsDetailsHeaderComponent', () => {
	let component: AnalyticsDetailsHeaderComponent;
	let fixture: ComponentFixture<AnalyticsDetailsHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnalyticsDetailsHeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AnalyticsDetailsHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
