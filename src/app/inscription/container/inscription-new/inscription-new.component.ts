import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {StateApiModel} from '../../../models/stateApiModel';
import {MessageService} from 'primeng/api';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {ToastModule} from 'primeng/toast';
import {GetAdhesionDetailsService} from '../../../services/adhesion/get-adhesion-details.service';
import {NgIf} from '@angular/common';
import {AdhesionModel} from '../../../models/adhesionModel';
import {Button} from 'primeng/button';
import {GetBasketAdherentService} from '../../../services/basket/get-basket-adherent.service';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {TooltipModule} from 'primeng/tooltip';
import {ModalBasketComponent} from '../../component/modal-basket/modal-basket.component';
import {CategoryClass} from '../../../shared/Utils/categoryClass';

@Component({
  selector: 'app-inscription-new',
  imports: [
    HeaderComponent,
    SpinnerComponent,
    ModalBasketComponent,
    ToastModule,
    NgIf,
    Button,
    TooltipModule
  ],
  standalone: true,
  templateUrl: './inscription-new.component.html',
  styleUrl: './inscription-new.component.scss',
  providers: [MessageService]
})
export class InscriptionNewComponent implements OnInit, OnDestroy {
  private tokenUtilityClass!: TokenUtilityClass;
  _token!: string;
  _pseudo!: string;
  _spinner: boolean = false;

  _adhesion: AdhesionModel | null = null;
  _baskets: AdherentBasketModel[] = [];
  _isOpenModal = false;

  private _subscription: Subscription = new Subscription();
  private _getAdhesionDetails$: Subject<number> = new Subject();
  private _getBasket$: Subject<number> = new Subject();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getAdhesionDetailsService: GetAdhesionDetailsService,
              private getBasketAdherentService: GetBasketAdherentService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this._spinner = true;
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
    this.serviceSubscribe();
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
            this.fillAdherent(data.response[0]);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
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
  }

  fillAdherent(adhesion: AdhesionModel) {
    this._adhesion = adhesion;
    if (this._adhesion.id) {
      this._getBasket$.next(this._adhesion.id);
    }
  }

  fillAdherentBasket(adherentBaskets: AdherentBasketModel[]) {
    if (this._adhesion?.beginYear) {
      let categoryClass = new CategoryClass();
      for (let adherent of adherentBaskets || []) {
        if (adherent.birth && this._adhesion.beginYear) {
          let date: Date = new Date(adherent.birth);
          adherent.category = categoryClass.getCategory(this._adhesion.beginYear - date.getFullYear())
        }
      }
      this._baskets = adherentBaskets;
    }
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    this._pseudo = this.tokenUtilityClass._pseudo;
  }

  onOpenBasket() {
    this._isOpenModal = true;
  }

  onModalBasketClose(isModalClosed: boolean) {
    this._isOpenModal = false;
  }

  onRedirect() {
    this.router.navigate(['inscription']).then(_ => {
    });
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
