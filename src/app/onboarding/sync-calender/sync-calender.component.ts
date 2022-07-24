import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CalendarIntegrationService } from 'src/app/calendar-integration/service/calendar-integration.service';
import { Rule, RulesDetails } from 'src/app/models/sync-calendar-rules.model';
import { OnboardingService } from '../services/onboarding.service';

@Component({
	selector: 'app-sync-calender',
	templateUrl: './sync-calender.component.html',
	styleUrls: ['./sync-calender.component.scss'],
})
export class SyncCalenderComponent implements OnInit {
	@Output() back = new EventEmitter();
	@Output() next = new EventEmitter();
	@Output() skip = new EventEmitter();
	@Output() completed = new EventEmitter();
	@Output() calendarNext = new EventEmitter();
	@Input() isInvitedUser: boolean | undefined;

	isSecondStep = false;
	rulesList: Rule[] = [];
	ruleDetails!: RulesDetails;
	connectedAccounts: any[] | undefined = undefined;

	selectedRule!: string;
	connected = false;
	isDisableDone = false;
	isDisableSave = false;

	subscriptions = new Subscription();

	constructor(
		private onBoardingService: OnboardingService,
		private calendarService: CalendarIntegrationService
	) {}

	ngOnInit(): void {
		this.onBoardingService.getRules().subscribe((res) => {
			this.rulesList = res.rule;
			this.selectedRule = this.rulesList.find((r) => r.default)!.type;
			this.ruleDetails = res;
		});
	}

	handleAccountChange(accounts: any[]) {
		this.connectedAccounts = accounts;
	}

	handleBack() {
		if (this.isSecondStep) {
			this.isSecondStep = false;
		} else {
			this.back.emit();
		}
	}

	handleNext() {
		this.isSecondStep = true;
		this.calendarNext.emit();
	}

	handleSkip() {
		this.onBoardingService.skipCalendarStep().subscribe(() => {
			this.skip.emit();
		});
	}
	handleDone() {
		this.isDisableDone = true;
		this.subscriptions.add(
			this.syncCalender().subscribe(() => {
				this.isDisableDone = false;
			})
		);
	}

	syncCalender() {
		return this.onBoardingService.completedCalandarSync().pipe(
			switchMap(() => this.calendarService.getConnectedAccounts()),
			tap((res) => {
				/* sync calendar events API after rules setup */
				for (let index = 0; index < res.userAccounts.length; index++) {
					this.onBoardingService
						.syncCalendarAfterRuleSetup(res.userAccounts[index].id)
						.subscribe(() => {});
				}
				/* completed emit and popup closed */
				this.completed.emit();
			})
		);
	}

	handleSave() {
		this.isDisableSave = true;
		const { name, description, rule } = this.ruleDetails;
		rule.forEach((r) => {
			r.default = this.selectedRule === r.type ? true : false;
		});
		const request = { name, description, rule };
		/* set rule API */
		this.onBoardingService.setRules(request).subscribe(() => {
			/* completed sync calendar API */
			this.subscriptions.add(
				this.syncCalender().subscribe(() => {
					this.isDisableSave = false;
				})
			);
		});
	}
}
