import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
	@Input() name = '';
	@Input() size = 40;

	constructor() {}
}
