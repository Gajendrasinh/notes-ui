import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecordingType } from '../models/recording.model';
import { NavItem } from '../shared/components/navbar/navbar.component';
import { selectRecordingType } from './store';
import * as RecordingDetailsActions from './store/recording-details.actions';
@Component({
	selector: 'app-recording-details',
	templateUrl: './recording-details.component.html',
	styleUrls: ['./recording-details.component.scss'],
})
export class RecordingDetailsComponent implements OnInit, OnDestroy {
	navItems: NavItem[] = [
		{
			title: 'Transcript',
			routerLink: '',
			matIcon: 'insert_drive_file',
		},
		{
			title: 'Analytics',
			routerLink: '',
			matIcon: 'bar_chart',
		},
	];
	recordingType: RecordingType;

	subscriptions = new Subscription();

	constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.activatedRoute.paramMap.subscribe((params) => {
				const recordingId = params.get('id');
				if (recordingId) {
					this.store.dispatch(
						RecordingDetailsActions.setRecordingId({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getRecordingDetails({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getTranscripts({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getParticipantDetails({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getTalkRatioDetails({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getTopics({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getActionItem({ recordingId })
					);
					this.store.dispatch(
						RecordingDetailsActions.getQuestionList({ recordingId })
					);
				}
			})
		);

		this.subscriptions.add(
			this.store.select(selectRecordingType).subscribe((type) => {
				this.recordingType = type;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.store.dispatch(RecordingDetailsActions.resetRecordingDetailsState());
	}
}
