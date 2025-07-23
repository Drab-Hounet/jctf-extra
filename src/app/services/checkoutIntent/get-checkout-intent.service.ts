import {Injectable} from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {PaymentService} from '../API/payment.service';
import {ResponseApiCheckoutIntentModel} from '../../models/responseApiCheckoutIntentModel';

@Injectable({
  providedIn: 'root'
})
export class GetCheckoutIntentService {

  constructor(private paymentService: PaymentService) {
  }

  getCheckoutIntent(idAdhesion: number, is3InstalmentsPayment: boolean, authorization: string): Observable<ResponseApiCheckoutIntentModel | null> {
    return this.paymentService.getCheckoutIntent(authorization, idAdhesion, is3InstalmentsPayment).pipe(
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
