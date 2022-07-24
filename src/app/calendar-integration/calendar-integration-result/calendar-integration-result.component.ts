import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarIntegrationService } from '../service/calendar-integration.service';

@Component({
	selector: 'app-calendar-integration-result',
	templateUrl: './calendar-integration-result.component.html',
	styleUrls: ['./calendar-integration-result.component.scss'],
})
export class CalendarIntegrationResultComponent implements OnInit {
	isLoading = true;
	isError = false;

	constructor(
		private route: ActivatedRoute,
		private calenderService: CalendarIntegrationService
	) {}

	ngOnInit(): void {
		const queryParams = this.route.snapshot.queryParams;

		this.isLoading = false;
		this.isError = queryParams.error;
		if (window.opener && window.opener.postMessage) {
			window.opener.postMessage(queryParams, '*');
		}
	}
}
