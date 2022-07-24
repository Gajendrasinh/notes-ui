import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSearchTopicComponent } from './add-search-topic.component';

describe('AddSearchTopicComponent', () => {
	let component: AddSearchTopicComponent;
	let fixture: ComponentFixture<AddSearchTopicComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddSearchTopicComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddSearchTopicComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
