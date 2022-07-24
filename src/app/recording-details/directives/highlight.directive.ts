import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { RecordingDetailsConfig } from '../recording-details.config';

@Directive({
	selector: '[appHighlight]',
})
export class HighlightDirective {
	highlightClasses = RecordingDetailsConfig.HIGHLIGHT_CLASS;

	@Output() highlightedTextClick = new EventEmitter<Event>();

	constructor() {}

	@HostListener('click', ['$event'])
	onHighlightClick(event: MouseEvent) {
		const { SEARCH_HIGHLIGHT } = this.highlightClasses;
		const target = event.target as HTMLSpanElement;
		if (target.classList.contains(SEARCH_HIGHLIGHT)) {
			this.highlightedTextClick.emit(event);
			event.stopPropagation();
		}
	}
}
