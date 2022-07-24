import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';

@Component({
	selector: 'app-analytics-details-header',
	templateUrl: './analytics-details-header.component.html',
	styleUrls: ['./analytics-details-header.component.scss'],
})
export class AnalyticsDetailsHeaderComponent implements OnInit {
	getAssetsPath = getAssetsPath;

	recordingId: any;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.recordingId = this.activatedRoute.snapshot.paramMap.get('id');
	}
}
