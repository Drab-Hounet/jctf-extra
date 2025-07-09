import {Injectable} from '@angular/core';
import {AdherentService} from '../API/adherent.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';
import {ResponseAdherentApiModel} from '../../models/responseApiAdherentModel';
import {AdherentModel} from '../../models/adherentModel';

@Injectable({
  providedIn: 'root'
})
export class CreateAdherentService {

  constructor(private adherentService: AdherentService) {
  }

  createAdherent(adherent: AdherentModel, authorization: string): Observable<ResponseAdherentApiModel | null> {
    return this.adherentService.createAdherent(adherent, authorization).pipe(
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
