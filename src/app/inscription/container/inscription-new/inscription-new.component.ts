import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, forkJoin, Subject, Subscription, switchMap, tap} from 'rxjs';
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
import {CreateBasketService} from '../../../services/basket/create-basket.service';
import {ModalNewBasketComponent} from '../../component/modal-new-basket/modal-new-basket.component';
import {AdherentModel} from '../../../models/adherentModel';
import {ResponseAdherentApiModel} from '../../../models/responseApiAdherentModel';
import {DeleteBasketService} from '../../../services/basket/delete-basket.service';
import {DeleteAllBasketsService} from '../../../services/basket/delete-all-baskets.service';
import {GetAdherentsFreeService} from '../../../services/adherent/get-adherents-free.service';
import {
  ModalCreateAdherentComponent
} from '../../../shared/component/modal-create-adherent/modal-create-adherent.component';
import {CreateAdherentService} from '../../../services/adherent/create-adherent.service';
import {GetActivityDetailsService} from '../../../services/activity/get-activity-details.service';
import {GroupActivityModel} from '../../../models/groupActivityModel';
import {ModalNewBasketModel} from '../../../models/modalNewBasketModel';

@Component({
  selector: 'app-inscription-new',
  imports: [
    HeaderComponent,
    SpinnerComponent,
    ModalBasketComponent,
    ModalNewBasketComponent,
    ModalCreateAdherentComponent,
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
  _adherentsUser: AdherentModel[] | null = null;
  _baskets: AdherentBasketModel[] = [];
  _basketAmountTotal: number = 0;
  _isOpenModal = false;
  _isOpenCreateAdherentModal = false;
  _listGroupActivity: GroupActivityModel[] = [];

  _modalNewBasket: ModalNewBasketModel | null = null;

  private _subscription: Subscription = new Subscription();
  private _getAdhesionDetails$: Subject<number> = new Subject();
  private _getBasket$: Subject<number> = new Subject();
  private _createBasket$: Subject<AdherentBasketModel> = new Subject();
  private _getAdherents$: Subject<boolean> = new Subject();
  private _deleteBasket$: Subject<number> = new Subject();
  private _deleteAllBaskets$: Subject<boolean> = new Subject();
  private _createAdherent$: Subject<AdherentModel> = new Subject();
  private _getActivityDetails$: Subject<boolean> = new Subject();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getAdhesionDetailsService: GetAdhesionDetailsService,
              private getBasketAdherentService: GetBasketAdherentService,
              private getAdherentsFreeService: GetAdherentsFreeService,
              private createBasketService: CreateBasketService,
              private deleteBasketService: DeleteBasketService,
              private deleteAllBasketsService: DeleteAllBasketsService,
              private createAdherentService: CreateAdherentService,
              private getActivityDetailsService: GetActivityDetailsService,
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

    // create basket from user and adhesion
    this._subscription.add(
      this._createBasket$.pipe(
        filter(() => !!this._adhesion?.id),
        switchMap(basket => {
          return this.createBasketService.createBasketAdherent(basket, this._adhesion!.id, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            const response = data.response[0];
            const name = `${response.surname} ${response.name}`;
            this.displayMessage(`Adhérent ${name} ajouté(e) dans votre panier`, 'Succés', 'success');
            this._getBasket$.next(this._adhesion!.id);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // get adherents
    this._subscription.add(
      this._getAdherents$.pipe(
        switchMap(_ => {
          const adherents$ = this.getAdherentsFreeService.getAdherentsFree(this._adhesion!.id, this._token);
          const activities$ = this.getActivityDetailsService.getActivityDetails(this._token);
          return forkJoin({adherents: adherents$, activities: activities$});
        }),
        tap(({adherents, activities}) => {
          this._spinner = false;
          if (adherents && adherents.stateApi?.status === StateApiModel.StatusEnum.Success && adherents.response) {
            this.fillAdherent(adherents);
          } else if (adherents && adherents.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }

          if (activities && activities.stateApi?.status === StateApiModel.StatusEnum.Success && activities.response) {
            this._listGroupActivity = activities.response;
            this._modalNewBasket = {
              listAdherent: this._adherentsUser ?? [],
              listGroupActivity: this._listGroupActivity,
            }
          } else if (activities && activities.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());


    // get activity details
    this._subscription.add(
      this._getActivityDetails$.pipe(
        switchMap(id => {
          return this.getActivityDetailsService.getActivityDetails(this._token);
        }),
        tap(data => {
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this._listGroupActivity = data.response;
            console.log(data.response);
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // delete basket
    this._subscription.add(
      this._deleteBasket$.pipe(
        switchMap(idBasket => {
          return this.deleteBasketService.deleteBasket(idBasket, this._token);
        }),
        tap(data => {
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response) {
            this.displayMessage('L\'adhérent a bien été retiré du panier', 'Succés', 'success');
            this._getBasket$.next(this._adhesion!.id);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // delete all baskets
    this._subscription.add(
      this._deleteAllBaskets$.pipe(
        switchMap(_ => {
          return this.deleteAllBasketsService.deleteAllBaskets(this._token);
        }),
        tap(data => {
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response) {
            this.displayMessage('Le panier a bien été vidé', 'Succés', 'success');
            this._getBasket$.next(this._adhesion!.id);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // create adherent
    this._subscription.add(
      this._createAdherent$.pipe(
        switchMap(adherent => {
          return this.createAdherentService.createAdherent(adherent, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response) {
            this.displayMessage('Création adhérent réussi', 'Succés', 'success');
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());


  }

  private fillAdherent(data: ResponseAdherentApiModel) {
    if (data.response) {
      let listAdherents: AdherentModel[] = data.response;
      if (this._baskets) {
        listAdherents = listAdherents.filter(adherent => this._baskets.find(el => el.id === adherent.id) == null);
      }
      this._adherentsUser = listAdherents;
    }
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

  onOpenNewInscription() {
    this._spinner = true;
    this._getAdherents$.next(true);
  }

  onOpenPaiement() {
    if (this._adhesion?.id) {
      this.router.navigate(['inscription', 'payment', this._adhesion.id]).then(_ => {
      });
    }
  }

  onPaiementBasket(state: boolean) {
    this.onOpenPaiement();
  }

  onOpenCreateAdherentModal() {
    this._isOpenCreateAdherentModal = true;
  }

  onDeleteBasket(baskeIdToDelete: number | null) {
    this._isOpenModal = false;
    if (baskeIdToDelete) {
      this._spinner = true;
      this._deleteBasket$.next(baskeIdToDelete);
    }
  }

  onDeleteAllBasket(state: boolean) {
    this._isOpenModal = false;
    this._spinner = true;
    this._deleteAllBaskets$.next(true);
  }

  onNewAdherentBasket(newAdherentBasket: AdherentBasketModel | null) {
    this._adherentsUser = null;
    if (newAdherentBasket) {
      this._spinner = true;
      this._createBasket$.next(newAdherentBasket);
    }
  }

  onNewAdherent(newAdherent: AdherentModel | null) {
    this._isOpenCreateAdherentModal = false;
    if (newAdherent) {
      this._spinner = true;
      this._createAdherent$.next(newAdherent);
    }
  }

  onRedirect() {
    this.router.navigate(['inscription']).then(_ => {
    });
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
