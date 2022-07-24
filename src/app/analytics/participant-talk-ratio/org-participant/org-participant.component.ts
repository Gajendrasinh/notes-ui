import { Component, Input } from '@angular/core';
import { Participant } from 'src/app/models/participant-details.model';

@Component({
	selector: 'app-org-participant',
	templateUrl: './org-participant.component.html',
	styleUrls: ['./org-participant.component.scss'],
})
export class OrgParticipantComponent {
	@Input()
	participant: Participant | undefined;

	@Input() avatarBgColor: any;

	constructor() {}
}
