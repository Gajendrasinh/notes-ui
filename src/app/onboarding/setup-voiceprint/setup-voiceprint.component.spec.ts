import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupVoiceprintComponent } from './setup-voiceprint.component';

describe('SetupVoiceprintComponent', () => {
	let component: SetupVoiceprintComponent;
	let fixture: ComponentFixture<SetupVoiceprintComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SetupVoiceprintComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SetupVoiceprintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
