import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
	MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from '@angular/material/core';
import moment from 'moment';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		dateInput: 'MMMM DD, YYYY',
	},
	display: {
		dateInput: 'MMMM DD, YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'event-list-dialog-header',
	templateUrl: './event-list-dialog-header.component.html',
	styleUrls: ['./event-list-dialog-header.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class EventListDialogHeaderComponent {
	date = new FormControl(moment());

	constructor() {}

	previousDate() {
		this.date.patchValue(moment(this.date.value).add(-1, 'days'));
	}

	nextDate() {
		this.date.patchValue(moment(this.date.value).add(1, 'days'));
	}
}
