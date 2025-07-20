import { Injectable } from '@angular/core';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {PaymentService} from '../API/payment.service';
import {ResponseApiCheckoutIntentModel} from '../../models/responseApiCheckoutIntentModel';

@Injectable({
  providedIn: 'root'
})
export class GetCheckoutIntentService {

  constructor(private paymentService : PaymentService) {}

  getCheckoutIntent(idAdhesion: number, authorization: string): Observable<ResponseApiCheckoutIntentModel | null> {
    return this.paymentService.getCheckoutIntent(authorization, idAdhesion).pipe(
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
