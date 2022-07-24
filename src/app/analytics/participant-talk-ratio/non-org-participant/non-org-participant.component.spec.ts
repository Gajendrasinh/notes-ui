import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonOrgParticipantComponent } from './non-org-participant.component';

describe('NonOrgParticipantComponent', () => {
	let component: NonOrgParticipantComponent;
	let fixture: ComponentFixture<NonOrgParticipantComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NonOrgParticipantComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NonOrgParticipantComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
