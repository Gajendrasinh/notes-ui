import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsWrapperComponent } from './account-details-wrapper.component';

describe('AccountDetailsWrapperComponent', () => {
	let component: AccountDetailsWrapperComponent;
	let fixture: ComponentFixture<AccountDetailsWrapperComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AccountDetailsWrapperComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountDetailsWrapperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
