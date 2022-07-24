import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appActiveRecording]',
})
export class ActiveRecordingDirective {
	constructor(public elementRef: ElementRef) {}
	@Input('appActiveRecording') hoverClass: any;

	@HostListener('mouseenter') onMouseEnter() {
		this.elementRef.nativeElement.classList.add(this.hoverClass);
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.elementRef.nativeElement.classList.remove(this.hoverClass);
	}
}
