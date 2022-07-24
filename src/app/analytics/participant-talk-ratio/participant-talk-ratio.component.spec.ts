import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTalkRatioComponent } from './participant-talk-ratio.component';

describe('ParticipantTalkRatioComponent', () => {
	let component: ParticipantTalkRatioComponent;
	let fixture: ComponentFixture<ParticipantTalkRatioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ParticipantTalkRatioComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ParticipantTalkRatioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
