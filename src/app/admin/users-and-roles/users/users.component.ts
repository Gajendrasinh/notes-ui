import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { UsersDetails } from 'src/app/models/invited-user-details.model';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { AdminService } from '../../services/admin.service';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	// displayedColumns: string[] = ['select', 'name', 'emailId', 'role', 'lastSignIn', 'edit', 'delete'];
	displayedColumns: string[] = ['name', 'emailId', 'role', 'lastSignIn'];
	dataSource!: MatTableDataSource<UsersDetails>;
	selection = new SelectionModel<UsersDetails>(true, []);
	searchControl: FormControl;
	filterText = '';
	searchedText: string | undefined;

	@ViewChild(MatPaginator) paginator: MatPaginator | any;
	@ViewChild(MatSort) sort!: MatSort;
	loaderId = RecordingDetailsConfig.LOADER_IDS.INVITED_USERs_TABLE;

	constructor(public dialog: MatDialog, private adminservice: AdminService) {
		this.searchControl = new FormControl();

		this.searchControl.valueChanges.pipe(debounceTime(400)).subscribe(() => {
			// dispatch search action
			this.applyFilter();
		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}
	masterToggle() {
		this.isAllSelected()
			? this.selection.clear()
			: this.dataSource.data.forEach((row) => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: UsersDetails): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
			row.id + 1
		}`;
	}

	ngOnInit() {
		this.fetchUserDetails();
	}

	fetchUserDetails() {
		this.adminservice.fetchInvitedUserDetails().subscribe(
			(data) => {
				this.dataSource = new MatTableDataSource<UsersDetails>(data.users);

				setTimeout(() => {
					this.dataSource.sort = this.sort;
					this.dataSource.sortingDataAccessor = (
						data: any,
						sortHeaderId: string
					) => {
						const value = data[sortHeaderId];
						return typeof value === 'string' ? value.toLowerCase() : value;
					};
					this.sort.active = 'name';
					this.sort.direction = 'asc';
					this.sort.sortChange.emit({
						active: this.sort.active,
						direction: this.sort.direction,
					});

					this.initializeFilterPredicate(); // this method used for apply search filter on name column
				});
			},
			() => {}
		);
	}

	/** Filter by name only */
	initializeFilterPredicate() {
		this.dataSource.filterPredicate = function (
			dataSource: UsersDetails,
			filter: string
		): boolean {
			return dataSource.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
		};
	}
	applyFilter() {
		this.searchedText = this.searchControl.value;
		this.dataSource.filter = this.searchControl.value;
	}
	resetFilter() {
		this.searchControl.reset();
		this.dataSource.filter = '';
	}

	openInviteUserDialog(): void {
		const dialogRef = this.dialog.open(InviteUserDialogComponent, {
			width: '50vw',
			height: '78vh',
		});
		dialogRef.afterClosed().subscribe(({ reload }) => {
			if (reload) {
				this.fetchUserDetails();
			}
		});
	}
	selectUserData(row: any) {
		this.selection.toggle(row);
	}
	selectAllUserData() {}
	editUser() {}
	deleteUser() {}
}
