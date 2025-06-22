import { Injectable } from '@angular/core';
import {AuthUserService} from '../API/auth-user.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseUserApiModel} from '../../models/responseApiUser';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordMailService {

  constructor(private authService: AuthUserService) {
  }

  recoveryPasswordMail(mail: string): Observable<ResponseUserApiModel | null> {
    return this.authService.recoveryPassword(mail).pipe(
      switchMap(data => {
        return of(data);
      }),
      catchError(error => {
        console.log(error);
        return of(error);
      })
    );
  }
}
