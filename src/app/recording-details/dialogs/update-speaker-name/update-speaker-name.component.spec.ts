import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpeakerNameComponent } from './update-speaker-name.component';

describe('UpdateSpeakerNameComponent', () => {
	let component: UpdateSpeakerNameComponent;
	let fixture: ComponentFixture<UpdateSpeakerNameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UpdateSpeakerNameComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdateSpeakerNameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
