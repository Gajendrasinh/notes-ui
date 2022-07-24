import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVoiceprintComponent } from './record-voiceprint.component';

describe('RecordVoiceprintComponent', () => {
	let component: RecordVoiceprintComponent;
	let fixture: ComponentFixture<RecordVoiceprintComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecordVoiceprintComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RecordVoiceprintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
