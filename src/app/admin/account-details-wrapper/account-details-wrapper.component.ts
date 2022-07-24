import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/onboarding.model';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { AdminService } from '../services/admin.service';

@Component({
	selector: 'app-account-details-wrapper',
	templateUrl: './account-details-wrapper.component.html',
	styleUrls: ['./account-details-wrapper.component.scss'],
})
export class AccountDetailsWrapperComponent implements OnInit {
	accountDetails!: Account;
	loaderId = RecordingDetailsConfig.LOADER_IDS.ADMIN_ACCOUNT_DETAILS;
	constructor(private adminService: AdminService) {}

	ngOnInit(): void {
		this.adminService.getRegistrationDetails().subscribe((res) => {
			this.accountDetails = res;
		});
	}
}
