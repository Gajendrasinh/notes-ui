import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncCalenderComponent } from './sync-calender.component';

describe('SyncCalenderComponent', () => {
	let component: SyncCalenderComponent;
	let fixture: ComponentFixture<SyncCalenderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SyncCalenderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SyncCalenderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
