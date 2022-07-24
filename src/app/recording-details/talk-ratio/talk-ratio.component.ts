import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { RecordingDetailsConfig } from '../recording-details.config';
import { selectTalkRatioData, selectTalkRatioEmptyMessage } from '../store';

@Component({
	selector: 'app-talk-ratio',
	templateUrl: './talk-ratio.component.html',
	styleUrls: ['./talk-ratio.component.scss'],
})
export class TalkRatioComponent implements OnInit {
	loaderId = RecordingDetailsConfig.LOADER_IDS.TALK_RATIO;
	talkRatioData: { label: any; value: any }[] = [];
	messageString: string | undefined;

	backgroundColor = ['#1fc0f9', '#786eea'];

	constructor(private store: Store, private utilityService: UtilityService) {}

	ngOnInit(): void {
		this.utilityService.startLoader(this.loaderId);
		this.store.select(selectTalkRatioData).subscribe((data) => {
			if (data.length) {
				this.talkRatioData = data;
				this.utilityService.stopLoader(this.loaderId);
			} else {
				this.store.select(selectTalkRatioEmptyMessage).subscribe((message) => {
					if (message) {
						this.messageString = message;
						this.utilityService.stopLoader(this.loaderId);
					}
				});
			}
		});
	}
}
