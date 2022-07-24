import { Component, OnInit } from '@angular/core';
import { analyticsConfig } from '../analytics.config';
import { Participant } from 'src/app/models/participant-details.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import * as AnalyticsDetailsActions from './../store/analytics-details.actions';
import {
	selectParticipantDetails,
	selectTalkRatioData,
	selectTalkRatioEmptyMessage,
} from '../store';

@Component({
	selector: 'app-participant-talk-ratio',
	templateUrl: './participant-talk-ratio.component.html',
	styleUrls: ['./participant-talk-ratio.component.scss'],
})
export class ParticipantTalkRatioComponent implements OnInit {
	loaderId = analyticsConfig.LOADER_IDS.PARTICIPANT_TALK_RATIO_PANEL;

	subscriptions = new Subscription();

	orgName: string | undefined;
	nonOrgName: string | undefined;
	orgParticipants: Participant[] | undefined;
	nonOrgParticipants: Participant[] | undefined;

	talkRatioData: { label: any; value: any }[] = [];
	messageString: string | undefined;

	constructor(
		private store: Store,
		private activatedRoute: ActivatedRoute,
		private utilityService: UtilityService
	) {
		this.utilityService.startLoader(this.loaderId);
	}

	ngOnInit(): void {
		this.subscriptions.add(
			this.activatedRoute.paramMap.subscribe((params) => {
				const recordingId = params.get('id');
				if (recordingId) {
					this.store.dispatch(
						AnalyticsDetailsActions.getTalkRatioDetails({ recordingId })
					);
					this.store.dispatch(
						AnalyticsDetailsActions.getParticipantDetails({ recordingId })
					);
				}
			})
		);

		this.store.select(selectTalkRatioData).subscribe((data) => {
			if (data.length) {
				this.talkRatioData = data?.slice().reverse();
			} else {
				this.store.select(selectTalkRatioEmptyMessage).subscribe((message) => {
					if (message) {
						this.messageString = message;
					}
				});
			}
		});

		this.subscriptions.add(
			this.store.select(selectParticipantDetails).subscribe((details) => {
				this.utilityService.stopLoader(this.loaderId);

				this.orgName = details?.orgName;
				this.nonOrgName = details?.nonOrgName;
				this.orgParticipants = details?.participantDetails
					.filter((p) => p.organization)
					.sort((a, b) =>
						a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
					);
				this.nonOrgParticipants = details?.participantDetails
					.filter((p) => !p.organization)
					.sort((a, b) =>
						a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
					);
			})
		);
	}
}
