import {Injectable} from '@angular/core';
import {AuthUserService} from '../API/auth-user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseUserApiModel} from '../../models/responseApiUserModel';
import {UserModel} from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private authService: AuthUserService) {
  }

  createUser(user: UserModel): Observable<ResponseUserApiModel | null> {
    const pass = this.makeRequestLogin(user);
    user.password = pass;
    return this.authService.createUser(user).pipe(
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
    return window.btoa(user.mail + ':' + window.btoa(user.password));
  }


}
