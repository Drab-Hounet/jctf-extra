import { Injectable } from '@angular/core';
import {AdherentService} from '../API/adherent.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';

@Injectable({
  providedIn: 'root'
})
export class GetAdherentsFreeService {

  constructor(private adherentService: AdherentService) {
  }

  getAdherentsFree(idAdhesion: number, authorization: string): Observable<ResponseAdhesionApiModel | null> {
    return this.adherentService.getAdherentsFreeAdhesion(authorization, idAdhesion).pipe(
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
