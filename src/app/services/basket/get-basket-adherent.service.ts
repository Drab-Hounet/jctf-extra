import { Injectable } from '@angular/core';
import {BasketService} from '../API/basket.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseApiAdherentBasketModel} from '../../models/responseApiAdherentBasketModel';

@Injectable({
  providedIn: 'root'
})
export class GetBasketAdherentService {

  constructor(private basketService : BasketService) {}

  getBasketAdherent(idAdhesion: number, authorization: string): Observable<ResponseApiAdherentBasketModel | null> {
    return this.basketService.getBasketAdherent(authorization, idAdhesion).pipe(
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
