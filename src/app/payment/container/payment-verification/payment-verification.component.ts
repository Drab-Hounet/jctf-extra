import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {MessageService} from 'primeng/api';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {Toast} from 'primeng/toast';
import {FieldsetModule} from 'primeng/fieldset';
import {StatusPaymentEnum} from '../../../shared/enum/statusPaymentEnum';
import {SetCheckoutIntentService} from '../../../services/checkoutIntent/set-checkout-intent.service';
import {PaymentStatusModel} from '../../../models/PaymentStatusModel';
import {StateApiModel} from '../../../models/stateApiModel';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-payment-verification',
  imports: [
    HeaderComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    SpinnerComponent,
    FieldsetModule,
    Toast,
    Button
  ],
  templateUrl: './payment-verification.component.html',
  styleUrl: './payment-verification.component.scss',
  standalone: true,
  providers: [MessageService]

})
export class PaymentVerificationComponent implements OnInit, OnDestroy {

  private tokenUtilityClass!: TokenUtilityClass;
  _token!: string;
  _pseudo!: string;
  _spinner: boolean = true;

  _IN_PROGRESS_STATUS = StatusPaymentEnum.InProgress;
  _SUCCESS_STATUS = StatusPaymentEnum.Success;

  _statePayment: StatusPaymentEnum = StatusPaymentEnum.InProgress;

  _paymentStatus: PaymentStatusModel | null = null;

  private _subscription: Subscription = new Subscription();
  private _setCheckoutIntent$: Subject<PaymentStatusModel> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private setCheckoutIntentService: SetCheckoutIntentService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
    this.serviceSubscribe();

    this.route.paramMap.subscribe(params => {
      const idParamAdhesion = params.get('id');
      const idAdhesion: number | null = idParamAdhesion !== null && !isNaN(+idParamAdhesion) ? +idParamAdhesion : null;

      const idParamCheckoutIntent = this.route.snapshot.queryParamMap.get('checkoutIntentId');
      const checkoutIntentId: number | null = idParamCheckoutIntent !== null && !isNaN(+idParamCheckoutIntent) ? +idParamCheckoutIntent : null;
      const code = this.route.snapshot.queryParamMap.get('code');
      const idParamOrder = this.route.snapshot.queryParamMap.get('orderId');
      const orderId: number | null = idParamOrder !== null && !isNaN(+idParamOrder) ? +idParamOrder : null;
      if (code != null && orderId != null && checkoutIntentId != null && idAdhesion != null) {
        this._paymentStatus = {
          status: code,
          orderId: orderId,
          checkoutIntentId: checkoutIntentId,
          idAdhesion: idAdhesion,
        }
      }
      // send information
      if (this._paymentStatus != null) {
        this._setCheckoutIntent$.next(this._paymentStatus);
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    // get adhesion details
    this._subscription.add(
      this._setCheckoutIntent$.pipe(
        switchMap(id => {
          return this.setCheckoutIntentService.setCheckoutIntent(id, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success) {
            this._statePayment = StatusPaymentEnum.Success;
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            if (data)
              this._statePayment = StatusPaymentEnum.Error;
              this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  onSubmit() {
    this.router.navigate(['inscription', 'new', this._paymentStatus?.idAdhesion]).then(_ =>{} );
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    this._pseudo = this.tokenUtilityClass._pseudo;
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
