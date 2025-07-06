import { Injectable } from '@angular/core';
import {AdhesionService} from '../API/adhesion.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';
import {AdherentService} from '../API/adherent.service';

@Injectable({
  providedIn: 'root'
})
export class GetAdherentsService {

  constructor(private adherentService: AdherentService) {
  }

  getAdherents(authorization: string): Observable<ResponseAdhesionApiModel | null> {
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
