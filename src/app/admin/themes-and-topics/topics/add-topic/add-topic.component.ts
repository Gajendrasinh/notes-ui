import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { REGEX_CONFIG } from 'src/app/shared/constants/regex.config';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { ThemesAndTopicsService } from '../../services/themes-and-topics.service';
import { loadTopics } from '../../store/actions/themes-and-topics.actions';
// import { selectTopicById } from '../../store/selectors/themes-and-topics.selectors';

@Component({
	selector: 'app-add-topic',
	templateUrl: './add-topic.component.html',
	styleUrls: ['./add-topic.component.scss'],
})
export class AddTopicComponent {
	topicControl: FormControl = new FormControl('', [
		Validators.required,
		Validators.pattern(REGEX_CONFIG.SPECIAL_CHARACTER),
		UtilityService.required,
	]);
	keywordControl: FormControl = new FormControl('', [
		Validators.pattern(REGEX_CONFIG.SPECIAL_CHARACTER),
	]);
	keywords: string[] = [];

	subscriptions = new Subscription();

	constructor(
		private dialogRef: MatDialogRef<AddTopicComponent>,
		@Inject(MAT_DIALOG_DATA) private data: { topicId: number },
		private service: ThemesAndTopicsService,
		private store: Store,
		private notificationService: NotificationService
	) {}

	// ngOnInit(): void {
	// 	if (this.data.topicId) {
	// 		this.subscriptions.add(
	// 			this.store
	// 				.select(selectTopicById(this.data.topicId))
	// 				.subscribe((topic) => {
	// 					this.topicControl.setValue(topic?.name);
	// 					this.keywords.push(...topic!.keywords.map((k) => k.name));
	// 				})
	// 		);
	// 	}
	// }

	onKeywordAdd() {
		if (this.keywordControl.invalid) {
			return;
		}
		if (this.keywordControl.value.trim()) {
			const matchIndex = this.keywords
				.map((k) => k.trim().toLowerCase())
				.indexOf(this.keywordControl.value.trim().toLowerCase());
			if (matchIndex > -1) {
				this.keywords.splice(matchIndex, 1);
			}
			this.keywords.unshift(this.keywordControl.value.trim());
			this.keywordControl.setValue('');
		}
	}

	onKeywordRemove(keyword: string) {
		if (keyword) {
			this.keywords = this.keywords.filter((k) => k !== keyword);
		}
	}

	addTopic() {
		this.service
			.addTopic({
				name: this.topicControl.value.trim(),
				keywords: this.keywords,
			})
			.subscribe((res) => {
				if (res.status.statusCode == '200') {
					this.store.dispatch(loadTopics());
					this.notificationService.showNotification(
						'Topic saved successfully.',
						'success'
					);
					this.dialogRef.close();
				} else {
					this.notificationService.showNotification(
						res.status.description,
						'error'
					);
				}
			});
	}
}
