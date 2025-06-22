import {Injectable} from '@angular/core';
import {AdhesionService} from '../API/adhesion.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';

@Injectable({
  providedIn: 'root'
})
export class GetAdhesionDetailsService {

  constructor(private adhesionService: AdhesionService) {
  }

  getAdhesionDetails(id: number, authorization: string): Observable<ResponseAdhesionApiModel | null> {
    return this.adhesionService.getAdhesionDetails(id, authorization).pipe(
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
