import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthorizedRedirectGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.authService
			.checkUserAuthenticated()
			.then((user) => {
				if (user) {
					this.router.navigateByUrl('/recordings');
					return false;
				}
				return true;
			})
			.catch(() => {
				return true;
			});
	}
}
