import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVoiceprintComponent } from './user-voiceprint.component';

describe('UserVoiceprintComponent', () => {
	let component: UserVoiceprintComponent;
	let fixture: ComponentFixture<UserVoiceprintComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserVoiceprintComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserVoiceprintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
