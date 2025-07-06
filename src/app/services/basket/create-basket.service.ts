import {Injectable} from '@angular/core';
import {BasketService} from '../API/basket.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseApiAdherentBasketModel, ResponseApiBasketModel} from '../../models/responseApiBasketModel';
import {AdherentBasketModel} from '../../models/adherentBasketModel';

@Injectable({
  providedIn: 'root'
})
export class CreateBasketService {

  constructor(private basketService: BasketService) {
  }

  createBasketAdherent(adherentBasket: AdherentBasketModel, idAdhesion: number, authorization: string): Observable<ResponseApiAdherentBasketModel | null> {
    return this.basketService.createBasketAdherent(adherentBasket, authorization, idAdhesion).pipe(
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
