import { Injectable } from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {AdhesionService} from '../API/adhesion.service';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';

@Injectable({
  providedIn: 'root'
})
export class GetAllAdhesionsService {

  constructor(private adhesionService: AdhesionService) {
  }

  getAllAdhesions( authorization: string): Observable<ResponseAdhesionApiModel | null> {
    return this.adhesionService.getAllAdhesions(authorization).pipe(
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
