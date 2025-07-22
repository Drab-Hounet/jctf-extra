import {Injectable} from '@angular/core';
import {UserService} from '../API/user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseUserApiModel} from '../../models/responseApiUserModel';
import {UserModel} from '../../models/userModel';
import {AdminLoginModel} from '../../models/adminLoginModel';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private userService: UserService) {
  }

  updateUser(user: UserModel, authorization: string): Observable<ResponseUserApiModel | null> {
    if (user.password !== '') {
      const pass = this.makeRequestLogin(user);
      user.newPassword = pass;
      user.password = '';

    }
    return this.userService.updateUser(user, authorization).pipe(
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
