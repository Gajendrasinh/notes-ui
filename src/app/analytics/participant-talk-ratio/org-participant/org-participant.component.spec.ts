import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsParticipantComponent } from './analytics-participant.component';

describe('AnalyticsParticipantComponent', () => {
	let component: AnalyticsParticipantComponent;
	let fixture: ComponentFixture<AnalyticsParticipantComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnalyticsParticipantComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AnalyticsParticipantComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
