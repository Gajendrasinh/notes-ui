import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'seek-bar',
	templateUrl: './seek-bar.component.html',
	styleUrls: ['./seek-bar.component.scss'],
})
export class SeekBarComponent implements OnDestroy {
	@Input() currentTime = 0;
	@Input() duration = 1;
	@Input() bufferedRange: { start: number; end: number } = {
		start: 0,
		end: 1,
	};

	@Output() seekChange = new EventEmitter();
	@Output() seekStart = new EventEmitter();
	@Output() seekEnd = new EventEmitter();

	@ViewChild('seekHandle') seekHandle!: ElementRef;
	@ViewChild('seekBarContainer') seekBarContainer!: ElementRef;

	dragState = {
		isMouseDown: false,
		initX: 0,
		initY: 0,
	};

	constructor() {}

	calculateChange(e: any) {
		const containerBounding =
			this.seekBarContainer.nativeElement.getBoundingClientRect();
		const containerWidth = Math.ceil(containerBounding.width);
		const containerLeft = containerBounding.left;

		let cx = e.clientX - containerLeft;
		if (cx < 0) {
			cx = 0;
		} else if (cx >= containerWidth) {
			cx = containerWidth;
		}
		this.seekChange.emit((cx / containerWidth) * this.duration);
	}

	handleClick(e: any) {
		if (!e.target.className.includes('handler')) {
			this.seekStart.emit();
			this.calculateChange(e);
			this.seekEnd.emit();
		}
	}

	mouseMove = (e: any) => {
		if (this.dragState.isMouseDown && this.seekHandle) {
			e.preventDefault();
			this.calculateChange(e);
		}
	};

	mouseUp = (e: any) => {
		if (this.dragState.isMouseDown) {
			e.preventDefault();
			this.seekHandlerMouseUp(e);
		}
	};

	seekHandlerMouseDown(e: any) {
		this.seekStart.emit();
		this.dragState.isMouseDown = true;
		this.dragState.initX = e.offsetX;
		this.dragState.initY = e.offsetY;
		document.addEventListener('mousemove', this.mouseMove);
		document.addEventListener('mouseup', this.mouseUp);
	}

	seekHandlerMouseUp(e: any) {
		e.preventDefault();
		this.dragState.isMouseDown = false;
		this.seekEnd.emit();
		document.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('mouseup', this.mouseUp);
	}

	ngOnDestroy() {
		document.removeEventListener('mouseup', this.mouseUp);
		document.removeEventListener('mousemove', this.mouseMove);
	}
}
