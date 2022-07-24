import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarIntegrationDialogComponent } from './calendar-integration-dialog/calendar-integration-dialog.component';
import { EventListDialogComponent } from './event-list-dialog/event-list-dialog.component';

@Component({
	selector: 'recordings-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
	isSynchronizing: boolean | undefined = false;

	data: any | undefined = [];

	constructor(public dialog: MatDialog) {}

	onSyncCalendar() {
		this.dialog.open(CalendarIntegrationDialogComponent, {
			panelClass: 'calendar-integration-dialog',
			width: '800px',
			autoFocus: false,
		});
	}

	onViewAll() {
		this.dialog.open(EventListDialogComponent, {
			panelClass: 'event-list-dialog',
			width: '1080px',
			height: '600px',
			autoFocus: false,
		});
	}
}
