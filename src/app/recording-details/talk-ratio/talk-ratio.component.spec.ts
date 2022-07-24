import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkRatioComponent } from './talk-ratio.component';

describe('TalkRatioComponent', () => {
	let component: TalkRatioComponent;
	let fixture: ComponentFixture<TalkRatioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalkRatioComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TalkRatioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
