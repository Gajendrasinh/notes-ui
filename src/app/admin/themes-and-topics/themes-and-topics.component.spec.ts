import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesAndTopicsComponent } from './themes-and-topics.component';

describe('ThemesAndTopicsComponent', () => {
	let component: ThemesAndTopicsComponent;
	let fixture: ComponentFixture<ThemesAndTopicsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ThemesAndTopicsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ThemesAndTopicsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
