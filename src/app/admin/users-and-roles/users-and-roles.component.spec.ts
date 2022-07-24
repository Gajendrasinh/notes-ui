import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndRolesComponent } from './users-and-roles.component';

describe('UsersAndRolesComponent', () => {
	let component: UsersAndRolesComponent;
	let fixture: ComponentFixture<UsersAndRolesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UsersAndRolesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UsersAndRolesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
