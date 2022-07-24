import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-event-list-dialog',
	templateUrl: './event-list-dialog.component.html',
	styleUrls: ['./event-list-dialog.component.scss'],
})
export class EventListDialogComponent {
	constructor(public dialogRef: MatDialogRef<EventListDialogComponent>) {}
}
