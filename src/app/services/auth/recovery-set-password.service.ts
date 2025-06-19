import {Injectable} from '@angular/core';
import {AuthUserService} from '../API/auth-user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseUserApiModel} from '../../models/ResponseApiUser';
import {UserModel} from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class RecoverySetPasswordService {

  constructor(private authService: AuthUserService) {
  }

  recoverySetPassword(user: UserModel): Observable<ResponseUserApiModel | null> {
    user.password = this.makeRequestLogin(user);
    user.newPassword = this.makeRequestLogin(user);
    return this.authService.recoverySetPassword(user).pipe(
      switchMap(data => {
        return of(data);
      }),
      catchError(error => {
        console.log(error);
        return of(error);
      })
    );
  }

  makeRequestLogin(user: UserModel): string {
    return window.btoa(user.mail + ':' + window.btoa(user.newPassword ?? ''));
  }
}
