import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { AuthUserInfo } from 'src/app/models/user.model';

@Component({
	selector: 'app-verify-recorded-voiceprint',
	templateUrl: './verify-recorded-voiceprint.component.html',
	styleUrls: ['./verify-recorded-voiceprint.component.scss'],
})
export class VerifyRecordedVoiceprintComponent implements AfterViewInit {
	@Input() src!: string;
	@Input() currentUserInfo!: AuthUserInfo;
	@Input() duration!: number;
	@Input() isDisableSave!: boolean;

	@Output() save = new EventEmitter();
	@Output() discard = new EventEmitter();

	@ViewChild('AudioPlayer') player!: ElementRef;
	constructor() {}

	ngAfterViewInit(): void {
		if (this.player) {
			this.player.nativeElement.src = this.src;
		}
	}

	onDiscard() {
		this.discard.emit();
	}

	onSave() {
		if (!this.isDisableSave) {
			this.save.emit();
		}
	}
}
