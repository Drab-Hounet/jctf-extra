import {Injectable} from '@angular/core';
import {AuthUserService} from '../API/auth-user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {AdminLoginModel} from '../../models/adminLoginModel';
import { ResponseUserApiModel} from '../../models/responseApiUserModel';

@Injectable({
  providedIn: 'root'
})
export class CreateAuthService {

  constructor(private authService: AuthUserService) {
  }

  createAuthentification(adminLogin: AdminLoginModel): Observable<ResponseUserApiModel | null> {
    const pass = this.makeRequestLogin(adminLogin);
    adminLogin.password = pass;
    return this.authService.createAuthUser(adminLogin).pipe(
      switchMap(data => {
        return of(data);
      }),
      catchError(error => {
        console.log(error);
        return of(error);
      })
    );
  }

  makeRequestLogin(login: AdminLoginModel): string {
    return window.btoa(login.mail + ':' + window.btoa(login.password));
  }
}
