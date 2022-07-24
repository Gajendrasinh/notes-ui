import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { MaterialModule } from '../../../shared/material/material.module';
import { AppConstants } from '../../../shared/constants/app-constants';

describe('NotificationComponent', () => {
	let component: NotificationComponent;
	let fixture: ComponentFixture<NotificationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NotificationComponent],
			providers: [
				{
					provide: MAT_SNACK_BAR_DATA,
					useValue: {},
				},
			],
			imports: [MaterialModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call start function', () => {
		component.ngOnInit();
		expect(component.appConstants).toEqual(AppConstants);
	});
});
