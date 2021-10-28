import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const user = this.authenticationService.userValue;
        if (user) {
            return true;
        }

        return this.router.createUrlTree(['/login']);
    }
}
