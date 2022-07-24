import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-calendar-integration-dialog',
	templateUrl: './calendar-integration-dialog.component.html',
	styleUrls: ['./calendar-integration-dialog.component.scss'],
})
export class CalendarIntegrationDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<CalendarIntegrationDialogComponent>
	) {}
}
