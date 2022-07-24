import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDiscussedComponent } from './topic-discussed.component';

describe('TopicDiscussedComponent', () => {
	let component: TopicDiscussedComponent;
	let fixture: ComponentFixture<TopicDiscussedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TopicDiscussedComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TopicDiscussedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
