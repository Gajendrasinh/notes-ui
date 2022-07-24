import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRecordedVoiceprintComponent } from './verify-recorded-voiceprint.component';

describe('VerifyRecordedVoiceprintComponent', () => {
	let component: VerifyRecordedVoiceprintComponent;
	let fixture: ComponentFixture<VerifyRecordedVoiceprintComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [VerifyRecordedVoiceprintComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VerifyRecordedVoiceprintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
