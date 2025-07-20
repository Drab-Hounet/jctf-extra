import { Injectable } from '@angular/core';
import {BasketService} from '../API/basket.service';
import {AdherentBasketModel} from '../../models/adherentBasketModel';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseApiAdherentBasketModel} from '../../models/responseApiBasketModel';

@Injectable({
  providedIn: 'root'
})
export class UpdateBasketAdherentService {

  constructor(private basketService: BasketService) {
  }

  updateBasketAdherent(adherentBasket: AdherentBasketModel, idAdhesion: number, authorization: string): Observable<ResponseApiAdherentBasketModel | null> {
    return this.basketService.updateBasketAdherent(adherentBasket, authorization, idAdhesion).pipe(
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
