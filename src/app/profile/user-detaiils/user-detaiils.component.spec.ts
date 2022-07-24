import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetaiilsComponent } from './user-detaiils.component';

describe('UserDetaiilsComponent', () => {
	let component: UserDetaiilsComponent;
	let fixture: ComponentFixture<UserDetaiilsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDetaiilsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetaiilsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
