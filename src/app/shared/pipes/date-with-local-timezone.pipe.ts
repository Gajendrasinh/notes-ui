import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TimezoneService } from '../utilities/timezone.service';

@Pipe({
	name: 'dateWithLocalTimezone',
})
export class DateWithLocalTimezonePipe implements PipeTransform {
	constructor(private datePipe: DatePipe, private tzService: TimezoneService) {}

	transform(timestamp: number, format = 'MMM d, y, h:mm a'): string {
		return `${this.datePipe.transform(timestamp, format)} ${
			this.tzService.timezoneAbbr
		}`;
	}
}
