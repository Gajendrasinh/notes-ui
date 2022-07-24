import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	constructor(
		private sanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry,
		private loaderService: NgxUiLoaderService,
		private notificationService: NotificationService
	) {}

	static required(control: AbstractControl) {
		if (control && ('' + control.value).trim() !== '') {
			return null;
		}

		return { required: `Field is required` };
	}

	registerSvgIcon(name: string, path: string) {
		path =
			(environment.production && path.startsWith('assets')
				? environment.urls.deployUrl + '/'
				: '') + path;
		this.iconRegistry.addSvgIcon(
			name,
			this.sanitizer.bypassSecurityTrustResourceUrl(path)
		);
	}

	startLoader(loaderId: string) {
		this.loaderService.startLoader(loaderId);
	}

	stopLoader(loaderId: string) {
		this.loaderService.stopLoader(loaderId);
	}

	/*   static required(control: AbstractControl){
    if(control && ((control.value || '') as string).trim().length){
      return null;
    }else{
      return {required: true};
    }
  }*/

	/** Custom RxJS Operator for handling errors */
	notifyAPIError<T>(
		statusCodes?: number[]
	): (source$: Observable<T>) => Observable<T> {
		return (source$) =>
			source$.pipe(
				tap((response: any) => {
					const apiResponseStatus = response.status;

					if (
						apiResponseStatus &&
						apiResponseStatus.statusCode !== 200 &&
						apiResponseStatus?.description
					) {
						if (
							statusCodes?.length &&
							!statusCodes.includes(apiResponseStatus.statusCode)
						) {
							return;
						}
						this.notificationService.pushNotification({
							text: apiResponseStatus.description,
							type: 'error',
						});
					}
				})
			);
	}
}
