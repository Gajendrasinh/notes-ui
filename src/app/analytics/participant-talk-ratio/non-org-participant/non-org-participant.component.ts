import { Component, Input } from '@angular/core';
import { Participant } from 'src/app/models/participant-details.model';

@Component({
	selector: 'app-non-org-participant',
	templateUrl: './non-org-participant.component.html',
	styleUrls: ['./non-org-participant.component.scss'],
})
export class NonOrgParticipantComponent {
	@Input()
	participant: Participant | undefined;

	@Input() avatarBgColor: any;

	constructor() {}
}
