import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSidePanelComponent } from './onboarding-side-panel.component';

describe('OnboardingSidePanelComponent', () => {
	let component: OnboardingSidePanelComponent;
	let fixture: ComponentFixture<OnboardingSidePanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OnboardingSidePanelComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OnboardingSidePanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
