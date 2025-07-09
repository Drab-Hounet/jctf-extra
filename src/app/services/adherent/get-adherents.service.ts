import { Injectable } from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {AdherentService} from '../API/adherent.service';
import {ResponseAdherentApiModel} from '../../models/responseApiAdherentModel';

@Injectable({
  providedIn: 'root'
})
export class GetAdherentsService {

  constructor(private adherentService: AdherentService) {
  }

  getAdherents(authorization: string): Observable<ResponseAdherentApiModel | null> {
    return this.adherentService.getAdherents(authorization).pipe(
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
