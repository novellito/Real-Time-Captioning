import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserAccessGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (JSON.parse(localStorage.getItem('user')).role === 'student') { // student cannot access this route
            this.router.navigate(['dashboard']);
            return false;
        } else {
            return true; // allow captioner to start session
        }
    }
}