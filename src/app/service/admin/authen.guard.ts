import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../login/security.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivateChild {
  constructor(
    private service: SecurityService,
    private router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let sercretkey = localStorage.getItem('key');

      if (sercretkey == environment.SECRET_KEY) {
        return true;
      } else {
        this.router.navigate(['login']);
        return true;
      }
  }
  
}