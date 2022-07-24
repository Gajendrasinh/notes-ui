import { Component, Input, OnInit } from '@angular/core';
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
import {
	searchTranscript,
	updateNonOrgName,
} from '../store/recording-details.actions';

export interface NavItem {
	title: string;
	routerLink: string;
	svgIcon?: string;
	matIcon?: string;
}
@Component({
	selector: 'app-recording-details-header',
	templateUrl: './recording-details-header.component.html',
	styleUrls: ['./recording-details-header.component.scss'],
})
export class RecordingDetailsHeaderComponent implements OnInit {
	@Input() navItems: NavItem[] = [];
	loaderId = RecordingDetailsConfig.LOADER_IDS.RECORDING_DETAIL_HEADER_PANEL;
	recordingDetails$ = this.store.select(selectRecordingDetails);
	orgParticipantCount$ = this.store.select(selectOrgParticipantCount);
	nonOrgParticipantCount$ = this.store.select(selectNonOrgParticipantCount);
	subscriptions = new Subscription();
	utilityService: any;
	nonOrgName: string | undefined = '';
	_prevNonOrgName: string | undefined = '';
	timezone: any | undefined;
	getAssetsPath = getAssetsPath;

	recordingId: any;

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

		this.recordingId = this.activatedRoute.snapshot.paramMap.get('id');
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

	handleSearch(searchObject: {
		searchBy: string;
		activeSearchIndex?: number;
		card?: number;
	}) {
		if (searchObject.searchBy) {
			const { searchBy, activeSearchIndex } = searchObject;
			this.store.dispatch(
				searchTranscript({ transcriptSearch: { searchBy, activeSearchIndex } })
			);
		}
	}
}
