import { DateWithLocalTimezonePipe } from './date-with-local-timezone.pipe';

describe('DateWithLocalTimezonePipe', () => {
	it('create an instance', () => {
		const pipe = new DateWithLocalTimezonePipe();
		expect(pipe).toBeTruthy();
	});
});
