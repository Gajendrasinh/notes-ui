import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
	name: 'featureAccess',
})
export class FeatureAccessPipe implements PipeTransform {
	transform(key: any): boolean {
		const featureAccess: any = environment?.featureAccess;
		return featureAccess[key] != undefined ? featureAccess[key] : true;
	}
}
