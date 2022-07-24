import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OnboardingService } from 'src/app/onboarding/services/onboarding.service';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { CalendarIntegrationService } from '../service/calendar-integration.service';

type connectedAccounts = {
	id: number;
	email: string;
};
@Component({
	selector: 'app-calendar-integration-card',
	templateUrl: './calendar-integration-card.component.html',
	styleUrls: ['./calendar-integration-card.component.scss'],
})
export class CalendarIntegrationCardComponent implements OnInit, OnDestroy {
	@Input() allowSyncCall: boolean | undefined;
	@Output() accountChange = new EventEmitter();
	@Output() connected = new EventEmitter<boolean>();
	connectedIds: connectedAccounts[] | undefined;
	getAssetsPath = getAssetsPath;
	tab: any;
	bindHandleMessage: any;
	authUrl: string | undefined;
	googleCodeDetails = {
		code: '',
		redirectUri: '',
	};
	errorCalendarAlreadyConnected!: string;
	subscription = new Subscription();

	constructor(
		private calendarIntegrationService: CalendarIntegrationService,
		private onBoardingService: OnboardingService
	) {
		this.bindHandleMessage = this.handleMessage.bind(this);
	}

	ngOnInit(): void {
		/* fetch connected account and emit initial data */
		this.subscription.add(
			this.calendarIntegrationService.getAuthUrl().subscribe((data: any) => {
				const getWindowUrl = window.location.origin + '/calendar/sync/result';
				this.authUrl = data.replace('http://localhost:8080', getWindowUrl);
			})
		);

		/* Fetch all connected account /user/account and set connectedIds */
		this.subscription.add(
			this.calendarIntegrationService
				.getConnectedAccounts()
				.subscribe((res) => {
					this.connectedIds = res.userAccounts;
					if (this.connectedIds?.length) {
						this.connected.emit(true);
					}
					this.accountChange.emit(this.connectedIds);
				})
		);
	}

	handleMessage(event: any) {
		/* result from child window */
		const getWindowUrls = window.location.origin + '/calendar/sync/result';
		this.googleCodeDetails.code = event.data.code;
		this.googleCodeDetails.redirectUri = getWindowUrls;

		if (event.data.error) {
			this.tab.close();
			this.tab = undefined;
			return;
		}

		this.subscription.add(
			this.calendarIntegrationService
				.postGoogleCode(this.googleCodeDetails)
				.subscribe((res) => {
					const { data, status } = res;
					this.errorCalendarAlreadyConnected = status.description;
					/* passing userAccountId for get event details */
					if (data) {
						this.subscription.add(
							this.calendarIntegrationService
								.getEventByUserId(data.userAccountId)
								.subscribe(() => {
									/* get connected users API */
									this.calendarIntegrationService
										.getConnectedAccounts()
										.subscribe((res) => {
											this.connectedIds = res.userAccounts;
											if (this.connectedIds?.length) {
												this.connected.emit(true);
												if (this.allowSyncCall) {
													for (
														let index = 0;
														index < res.userAccounts.length;
														index++
													) {
														this.onBoardingService
															.syncCalendarAfterRuleSetup(
																res.userAccounts[index].id
															)
															.subscribe(() => {});
													}
												}
											}
											this.accountChange.emit(this.connectedIds);
										});
								})
						);
					}

					this.tab.close();
					this.tab = undefined;
				})
		);
	}

	handleConnect() {
		/* trigger flow to connect and emit updated data */
		if (this.tab && !this.tab.closed) {
			this.tab.focus();
			return;
		}

		window.removeEventListener('message', this.bindHandleMessage);

		const height = 600;
		const width = 500;
		const left = screen.width / 2 - width / 2;
		const top = screen.height / 2 - height / 2;
		this.tab = window.open(
			this.authUrl,
			'_blank',
			`width=${width},height=${height},top=${top},left=${left}`
		);
		window.addEventListener('message', this.bindHandleMessage);

		this.accountChange.emit();
	}

	handleDisconnect(id: number) {
		/* directly call service to disconnect account */
		this.subscription.add(
			this.calendarIntegrationService
				.removeConnectedAccount(id)
				.pipe(
					switchMap(() =>
						this.calendarIntegrationService.getConnectedAccounts()
					)
				)
				.subscribe((res) => {
					/* get connected users API */
					this.connectedIds = res.userAccounts;
					if (this.connectedIds?.length === 0) {
						this.connected.emit(false);
					}
					this.accountChange.emit(this.connectedIds);
				})
		);
	}

	ngOnDestroy() {
		this.tab && this.tab.close();
		this.subscription.unsubscribe();
	}
}
