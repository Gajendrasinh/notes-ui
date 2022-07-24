import {
	Component,
	ContentChild,
	ContentChildren,
	Input,
	QueryList,
	ViewEncapsulation,
} from '@angular/core';
import {
	matFormFieldAnimations,
	MatFormFieldControl,
	MatPrefix,
	MatSuffix,
	MAT_PREFIX,
	MAT_SUFFIX,
} from '@angular/material/form-field';

@Component({
	selector: 'do-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [matFormFieldAnimations.transitionMessages],
})
export class InputComponent {
	@Input() label!: string;
	@ContentChildren(MAT_PREFIX) prefixes!: QueryList<MatPrefix>;
	@ContentChildren(MAT_SUFFIX) suffixes!: QueryList<MatSuffix>;

	@ContentChild(MatFormFieldControl)
	_controlNonStatic!: MatFormFieldControl<any>;
	@ContentChild(MatFormFieldControl, { static: true })
	_controlStatic!: MatFormFieldControl<any>;
	get _control() {
		return this._controlNonStatic || this._controlStatic;
	}
}
