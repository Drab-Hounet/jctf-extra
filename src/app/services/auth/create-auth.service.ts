import {Injectable} from '@angular/core';
import {AuthUserService} from '../API/auth-user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {AdminLoginModel} from '../../models/adminLoginModel';
import {ResponseAuthApiModel} from '../../models/ResponseApiAuth';
import {LoginModel} from '../../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class CreateAuthService {

  constructor(private authService: AuthUserService) {
  }

  createAuthentification(adminLogin: AdminLoginModel): Observable<ResponseAuthApiModel | null> {
    const pass = this.makeRequestLogin(adminLogin);
    adminLogin.password = pass;
    console.log(adminLogin);
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
    console.log(login.pseudo + ':' + login.password);

    return window.btoa(login.pseudo + ':' + window.btoa(login.password));
  }
}
