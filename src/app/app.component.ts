import { Component } from '@angular/core';
import { UtilityService } from './shared/utilities/utility.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'dataorb-notes-ui';

	constructor(private utitlityService: UtilityService) {
		this.initializeMatSvgIcons();
	}

	initializeMatSvgIcons() {
		this.utitlityService.registerSvgIcon(
			'question',
			'assets/icons/question.svg'
		);
		this.utitlityService.registerSvgIcon(
			'chatting',
			'assets/icons/chatting.svg'
		);
		this.utitlityService.registerSvgIcon(
			'download',
			'assets/icons/download.svg'
		);
		this.utitlityService.registerSvgIcon(
			'dataorb-logo-white',
			'assets/icons/DO_White_SVG.svg'
		);
		this.utitlityService.registerSvgIcon(
			'dataorb-label',
			'assets/icons/dataorb-label.svg'
		);
		this.utitlityService.registerSvgIcon(
			'audio_wave',
			'assets/icons/audio_wave.svg'
		);
		this.utitlityService.registerSvgIcon(
			'videocam_outline',
			'assets/icons/videocam_black_24dp.svg'
		);
		this.utitlityService.registerSvgIcon(
			'admin_panel_settings_outline',
			'assets/icons/admin_panel_settings_black_24dp.svg'
		);
		this.utitlityService.registerSvgIcon(
			'phone_in_talk_outline',
			'assets/icons/phone_in_talk_black_24dp.svg'
		);
	}
}
