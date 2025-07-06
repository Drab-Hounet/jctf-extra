import {Injectable} from '@angular/core';
import {BasketService} from '../API/basket.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseApiBasketModel} from '../../models/responseApiBasketModel';

@Injectable({
  providedIn: 'root'
})
export class DeleteAllBasketsService {

  constructor(private basketService: BasketService) {
  }

  deleteAllBaskets(authorization: string): Observable<ResponseApiBasketModel | null> {
    return this.basketService.deleteAllBasketAdherent(authorization).pipe(
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
