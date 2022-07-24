import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TimezoneService } from 'src/app/shared/utilities/timezone.service';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { RecordingDetailsConfig } from '../recording-details.config';
import {
	selectNonOrgName,
	selectNonOrgParticipantCount,
	selectOrgParticipantCount,
	selectRecordingDetails,
} from '../store';
import { updateNonOrgName } from '../store/recording-details.actions';

@Component({
	selector: 'app-meeting-details',
	templateUrl: './meeting-details.component.html',
	styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
	loaderId = RecordingDetailsConfig.LOADER_IDS.MEETING_DETAILS;
	recordingDetails$ = this.store.select(selectRecordingDetails);
	orgParticipantCount$ = this.store.select(selectOrgParticipantCount);
	nonOrgParticipantCount$ = this.store.select(selectNonOrgParticipantCount);
	subscriptions = new Subscription();
	utilityService: any;
	nonOrgName: string | undefined = '';
	_prevNonOrgName: string | undefined = '';
	timezone: any | undefined;
	getAssetsPath = getAssetsPath;

	constructor(
		private store: Store,
		public tzService: TimezoneService,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.tzService.timezoneSubject.subscribe((tz) => (this.timezone = tz));
	}

	ngOnInit(): void {
		this.subscriptions.add(
			this.store.select(selectNonOrgName).subscribe((name) => {
				this.nonOrgName = name;
				this._prevNonOrgName = name;
			})
		);
	}

	handleNonOrgInputClick(event: Event) {
		event.stopPropagation();
	}

	updateNonOrgName(event: any) {
		const recordingId = this.activatedRoute.snapshot.paramMap.get('id');
		if (this._prevNonOrgName !== this.nonOrgName && recordingId) {
			this.store.dispatch(
				updateNonOrgName({ recordingId, nonOrgName: event.target.value })
			);
		}
	}
}
