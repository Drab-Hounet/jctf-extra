import { Injectable } from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ActivityService} from '../API/activity.service';
import {ResponseApiActivityModel} from '../../models/responseApiActivityModel';

@Injectable({
  providedIn: 'root'
})
export class GetActivityDetailsService {

  constructor(private activityService: ActivityService) {
  }

  getActivityDetails(authorization: string): Observable<ResponseApiActivityModel | null> {
    return this.activityService.getActivities(authorization).pipe(
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
