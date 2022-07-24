import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rule, RulesDetails } from 'src/app/models/sync-calendar-rules.model';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { AdminService } from '../services/admin.service';
import * as AdminActions from '../store/actions/admin.actions';
import {
	selectRulesUpdatedStatus,
	selectRulesUpdatedStatusEmptyMessage,
	selectRuleUpdateInProgress,
} from '../store/selectors/admin.selectors';

@Component({
	selector: 'app-recording-settings',
	templateUrl: './recording-settings.component.html',
	styleUrls: ['./recording-settings.component.scss'],
})
export class RecordingSettingsComponent implements OnInit, OnDestroy {
	isSecondStep: boolean = false;
	rulesList: Rule[] = [];
	ruleDetails!: RulesDetails;
	connectedAccounts: any[] | undefined = undefined;
	loaderId = RecordingDetailsConfig.LOADER_IDS.ADMIN_RECORDING_SETTINGS;
	isInvitedUser: boolean | undefined;
	isRuleUpdateInProgress$ = this.store
		.select(selectRuleUpdateInProgress)
		.pipe(tap((inProgress) => (this._isRuleUpdateInProgress = inProgress)));
	ruleUpdateInProgressMsg$ = this.store.select(
		selectRulesUpdatedStatusEmptyMessage
	);
	ruleUpdatedStatus$ = this.store.select(selectRulesUpdatedStatus);
	_isRuleUpdateInProgress: boolean = false;
	subscriptions = new Subscription();
	selectedRule!: string;
	connected = false;

	pollingInterval: any;

	constructor(private adminService: AdminService, private store: Store) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.adminService.getRules().subscribe((res) => {
				this.rulesList = res.rule;
				this.selectedRule = this.rulesList.find((r) => r.default)!.type;
				this.ruleDetails = res;
			})
		);

		this.subscriptions.add(
			this.adminService.getRegistrationDetails().subscribe((res) => {
				this.isInvitedUser = res.invitedUser;
			})
		);

		/** Polling mechanism */
		this.store.dispatch(AdminActions.getRuleUpdatedStatus());
		this.pollingInterval = setInterval(() => {
			this.store.dispatch(AdminActions.getRuleUpdatedStatus());
		}, 15000);
	}

	handleSave() {
		if (!this._isRuleUpdateInProgress) {
			const { name, description, rule } = this.ruleDetails;
			rule.forEach((r) => {
				r.default = this.selectedRule === r.type ? true : false;
			});
			const request = { name, description, rule };
			/* set rule API */
			this.store.dispatch(AdminActions.clearState());
			this.store.dispatch(AdminActions.setRules({ request }));
		}
	}

	ngOnDestroy() {
		clearInterval(this.pollingInterval);
		this.subscriptions.unsubscribe();
	}
}
