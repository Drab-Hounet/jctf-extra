import { Injectable } from '@angular/core';
import {PaymentService} from '../API/payment.service';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {ResponseApiCheckoutIntentModel} from '../../models/responseApiCheckoutIntentModel';
import {PaymentStatusModel} from '../../models/PaymentStatusModel';

@Injectable({
  providedIn: 'root'
})
export class SetCheckoutIntentService {

  constructor(private paymentService : PaymentService) {}

  setCheckoutIntent(paymentStatusModel: PaymentStatusModel, authorization: string): Observable<ResponseApiCheckoutIntentModel | null> {
    return this.paymentService.setCheckoutIntent(paymentStatusModel, authorization).pipe(
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
