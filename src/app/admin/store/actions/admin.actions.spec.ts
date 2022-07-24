import * as fromAdmin from './admin.actions';

describe('yAdmins', () => {
	it('should return an action', () => {
		expect(fromAdmin.yAdmins().type).toBe('[Admin] Y Admins');
	});
});
