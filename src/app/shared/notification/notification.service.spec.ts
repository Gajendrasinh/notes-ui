import { inject, TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { AppNotification } from './model/AppNotification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../../shared/material/material.module';

describe('NotificationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [NotificationComponent],
			providers: [NotificationService],
			imports: [MaterialModule, BrowserAnimationsModule],
		}).overrideModule(BrowserDynamicTestingModule, {
			set: {
				entryComponents: [NotificationComponent],
			},
		});
	});

	it('should be created', inject(
		[NotificationService],
		(service: NotificationService) => {
			expect(service).toBeTruthy();
		}
	));

	it('should call push notification function', inject(
		[NotificationService],
		(service: NotificationService) => {
			const notification: AppNotification = {
				text: 'string',
				corelText: 'string',
				type: 'error',
				duration: 1000,
			};
			service.pushNotification(notification);
		}
	));

	it('should call show notification function', inject(
		[NotificationService],
		(service: NotificationService) => {
			spyOn(service, 'pushNotification');
			service.showNotification('Message', 'error');
			expect(service.pushNotification).toHaveBeenCalled();
		}
	));
});
