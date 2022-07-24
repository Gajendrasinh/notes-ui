import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return Auth.currentSession()
			.then(() => {
				this.authService.registerLogoutListener();
				return true;
			})
			.catch(() => {
				this.router.navigate(['/login'], {
					queryParams: { redirectTo: state.url },
				});
				return false;
			});
	}
}
