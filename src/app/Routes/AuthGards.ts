import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storage = localStorage.getItem('currentJCTF');
    if (storage && JSON.parse(storage)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
