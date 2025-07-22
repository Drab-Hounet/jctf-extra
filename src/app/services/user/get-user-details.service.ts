import {Injectable} from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {UserService} from '../API/user.service';
import {ResponseUserApiModel} from '../../models/responseApiUserModel';

@Injectable({
  providedIn: 'root'
})
export class GetUserDetailsService {

  constructor(private userService: UserService) {
  }

  getUserDetails(authorization: string): Observable<ResponseUserApiModel | null> {
    return this.userService.getUser(authorization).pipe(
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
