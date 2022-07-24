import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnDestroy {
	@Input() volume = 0;

	@Output() sliderChange = new EventEmitter();

	@ViewChild('handle') handle!: ElementRef;
	@ViewChild('container') container!: ElementRef;

	dragState = {
		isMouseDown: false,
		initX: 0,
		initY: 0,
	};

	subscriptions = new Subscription();

	constructor() {}

	calculateChange(e: any) {
		const containerBounding =
			this.container.nativeElement.getBoundingClientRect();
		const containerWidth = Math.ceil(containerBounding.width);
		const containerLeft = containerBounding.left;

		let cx = e.clientX - containerLeft;
		if (cx < 0) {
			cx = 0;
		} else if (cx >= containerWidth) {
			cx = containerWidth;
		}
		this.sliderChange.emit(cx / containerWidth);
	}

	mouseMove = (e: any) => {
		if (this.dragState.isMouseDown && this.handle) {
			e.preventDefault();
			this.calculateChange(e);
		}
	};

	mouseUp = () => {
		if (this.dragState.isMouseDown) {
			this.handlerMouseUp();
		}
	};

	handleClick(e: any) {
		this.calculateChange(e);
	}

	handlerMouseDown(e: any) {
		e.preventDefault();
		this.dragState.isMouseDown = true;
		this.dragState.initX = e.offsetX;
		this.dragState.initY = e.offsetY;
		document.addEventListener('mousemove', this.mouseMove);
		document.addEventListener('mouseup', this.mouseUp);
	}

	handlerMouseUp() {
		this.dragState.isMouseDown = false;
		document.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('mouseup', this.mouseUp);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		document.removeEventListener('mouseup', this.mouseUp);
		document.removeEventListener('mousemove', this.mouseMove);
	}
}
