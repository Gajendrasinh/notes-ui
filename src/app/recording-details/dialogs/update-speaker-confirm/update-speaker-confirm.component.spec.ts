import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpeakerConfirmComponent } from './update-speaker-confirm.component';

describe('UpdateSpeakerConfirmComponent', () => {
	let component: UpdateSpeakerConfirmComponent;
	let fixture: ComponentFixture<UpdateSpeakerConfirmComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UpdateSpeakerConfirmComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdateSpeakerConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
