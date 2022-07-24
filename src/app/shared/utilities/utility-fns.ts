import { Dialogue } from 'src/app/models/tracker.model';
import { environment } from 'src/environments/environment';

// Escape characters that have a special meaning in Regular Expressions
export function escapeRegExp(s: string): string {
	return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

/** Check if element is null or undefined */
export function isNullOrUndefined(value: any) {
	return value === undefined || value === null;
}

/** Check if element is visible in scroll container */
export function isVisible(ele: Element, container: Element) {
	const { bottom, top } = ele.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return top <= containerRect.top
		? containerRect.top <= top
		: bottom <= containerRect.bottom;
}

export const getAssetsPath = (path: string): string =>
	environment.production ? environment.urls.deployUrl + path : path;

export const sortTrackersById = (dialogues: Dialogue[]): Dialogue[] =>
	dialogues.sort((a: Dialogue, b: Dialogue) => a.id - b.id);

export const sortTrackersByBeginOffset = (dialogues: Dialogue[]): Dialogue[] =>
	dialogues.sort((a: Dialogue, b: Dialogue) => b.beginOffset - a.beginOffset);

export const trimObjectKeys = (object: any) => {
	const newOb = { ...object };
	Object.keys(object).forEach((key) => {
		if (typeof newOb[key] === 'string') {
			newOb[key] = newOb[key].trim();
		}
	});

	return newOb;
};
