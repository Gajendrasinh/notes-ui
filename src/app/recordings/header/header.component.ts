import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { setSearchText } from '../store/recording.actions';

@Component({
	selector: 'recordings-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@Input() hideSearchInput = false;
	@Input() hideUpload = false;
	getAssetsPath = getAssetsPath;
	searchControl: FormControl;
	constructor(private store: Store) {
		this.searchControl = new FormControl();
		this.searchControl.valueChanges
			.pipe(debounceTime(400))
			.subscribe((searchText) => {
				// dispatch search action
				this.store.dispatch(setSearchText({ searchText }));
			});
	}
}
