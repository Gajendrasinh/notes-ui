import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zone } from './timezone';

@Injectable({
	providedIn: 'root',
})
export class TimezoneService {
	private userTimezone: Zone | undefined;

	get timezoneAbbr() {
		return this.userTimezone?.abbr(new Date().getTime()) || '';
	}

	get timezone() {
		return this.userTimezone;
	}

	public timezoneSubject = new BehaviorSubject(this.timezone);

	constructor(private httpClient: HttpClient) {
		this.loadTimezone();
	}

	loadTimezone() {
		import('./timezone').then(async (tz) => {
			const data = await this.loadTimezoneData();
			tz.loadData(data);

			/** guess the user timezone */
			const zone: Zone = tz.getZone(tz.guess(true));
			if (zone) {
				this.userTimezone = zone;
				this.timezoneSubject.next(zone);
			}
		});
	}

	/** Load IANA timezone json */
	loadTimezoneData() {
		return fetch(
			`${environment.urls.deployUrl}/assets/data/tz-latest.json`
		).then((data) => data.ok && data.json());
	}
}
