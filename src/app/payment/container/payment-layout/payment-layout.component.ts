import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {MessageService} from 'primeng/api';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import {GetAdhesionDetailsService} from '../../../services/adhesion/get-adhesion-details.service';
import {StateApiModel} from '../../../models/stateApiModel';
import {AdhesionModel} from '../../../models/adhesionModel';
import {GetBasketAdherentService} from '../../../services/basket/get-basket-adherent.service';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {CategoryClass} from '../../../shared/Utils/categoryClass';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {Toast} from 'primeng/toast';
import {Button} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {Tag} from 'primeng/tag';
import {Tooltip} from 'primeng/tooltip';
import {ModalBasketReductionComponent} from '../../component/modal-basket-reduction/modal-basket-reduction.component';
import {UpdateBasketAdherentService} from '../../../services/basket/update-basket-adherent.service';
import {ButtonHelloAssoComponent} from '../../component/button-hello-asso/button-hello-asso.component';
import {GetCheckoutIntentService} from '../../../services/checkoutIntent/get-checkout-intent.service';
import {ResponseCheckoutIntentModel} from '../../../models/responseCheckoutIntentModel';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-payment-layout',
  imports: [
    HeaderComponent,
    ModalBasketReductionComponent,
    NgIf,
    SpinnerComponent,
    ButtonHelloAssoComponent,
    Toast,
    Button,
    DatePipe,
    Divider,
    NgForOf,
    Tag,
    CheckboxModule,
    Tooltip,
    FormsModule
  ],
  standalone: true,
  templateUrl: './payment-layout.component.html',
  styleUrl: './payment-layout.component.scss',
  providers: [MessageService]
})
export class PaymentLayoutComponent implements OnInit, OnDestroy {

  private tokenUtilityClass!: TokenUtilityClass;
  _token!: string;
  _pseudo!: string;
  _spinner: boolean = false;

  _adhesion: AdhesionModel | null = null;
  _basketSelected: AdherentBasketModel | null = null;
  _baskets: AdherentBasketModel[] = [];
  _basketAmountTotal: number = 0;

  _is3InstalmentsPayment =false;

  private _subscription: Subscription = new Subscription();
  private _getAdhesionDetails$: Subject<number> = new Subject();
  private _getBasket$: Subject<number> = new Subject();
  private _updateBasket$: Subject<AdherentBasketModel> = new Subject();
  private _proceedPayment$: Subject<number> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getAdhesionDetailsService: GetAdhesionDetailsService,
    private getBasketAdherentService: GetBasketAdherentService,
    private updateBasketAdherentService: UpdateBasketAdherentService,
    private getCheckoutIntentService: GetCheckoutIntentService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
    this.serviceSubscribe();
    this._spinner = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this._getAdhesionDetails$.next(Number(id));
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    // get adhesion details
    this._subscription.add(
      this._getAdhesionDetails$.pipe(
        switchMap(id => {
          return this.getAdhesionDetailsService.getAdhesionDetails(id, this._token);
        }),
        tap(data => {
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this.fillAdhesion(data.response[0]);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            if (data)
              this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // get basket from user and adhesion
    this._subscription.add(
      this._getBasket$.pipe(
        switchMap(idAdhesion => {
          return this.getBasketAdherentService.getBasketAdherent(idAdhesion, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this.fillAdherentBasket(data.response[0].listAdherent);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // Update basket
    this._subscription.add(
      this._updateBasket$.pipe(
        switchMap(basketAdherent => {
          return this.updateBasketAdherentService.updateBasketAdherent(basketAdherent, this._adhesion?.id ?? 0, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            if (this._adhesion?.id) {
              this._getBasket$.next(this._adhesion.id);
            }
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // Send payment
    this._subscription.add(
      this._proceedPayment$.pipe(
        switchMap(idAdhesion => {
          return this.getCheckoutIntentService.getCheckoutIntent(idAdhesion, this._is3InstalmentsPayment, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            const response: ResponseCheckoutIntentModel = data.response[0];
            window.location.href = response.redirectUrl;
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  fillAdhesion(adhesion: AdhesionModel) {
    this._adhesion = adhesion;
    if (this._adhesion.id) {
      this._getBasket$.next(this._adhesion.id);
    }
  }

  fillAdherentBasket(adherentBaskets: AdherentBasketModel[]) {
    this._basketAmountTotal = 0;
    if (this._adhesion?.beginYear) {
      let categoryClass = new CategoryClass();
      for (let adherent of adherentBaskets || []) {
        this._basketAmountTotal = this._basketAmountTotal + (adherent.basketAmountDetails?.totalPayment ?? 0);
        if (adherent.birth && this._adhesion.beginYear) {
          let date: Date = new Date(adherent.birth);
          adherent.category = categoryClass.getCategory(this._adhesion.beginYear - date.getFullYear());
        }
        if (adherent.basketAmountDetails) {
          adherent.basketAmountDetails.totalReduction = adherent.basketAmountDetails?.tattooAmount + adherent.basketAmountDetails?.passSportAmount + adherent.basketAmountDetails?.passRegionAmount;
        }
      }
      this._baskets = adherentBaskets;
    }
  }

  onAddReduction(adherentBasket: AdherentBasketModel) {
    this._basketSelected = adherentBasket;
  }

  onBasketReduction(adherentBasket: AdherentBasketModel | null) {
    this._basketSelected = null;
    if (adherentBasket) {
      this._updateBasket$.next(adherentBasket);
    }
  }

  onPayAction(state: boolean) {
    this._spinner = true;
    if (this._adhesion?.id) {
      this._proceedPayment$.next(this._adhesion?.id ?? 0);
    }
  }

  onRedirect() {
    this.router.navigate(['inscription', 'new', this._adhesion?.id]).then(_ => {
    });
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
