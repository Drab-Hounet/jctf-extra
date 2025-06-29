import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {Router} from '@angular/router';
import {GetAllAdhesionsService} from '../../../services/adhesion/get-all-adhesions.service';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {StateApiModel} from '../../../models/stateApiModel';
import {MessageService} from 'primeng/api';
import {AdhesionModel} from '../../../models/adhesionModel';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {ToastModule} from 'primeng/toast';
import {NgFor, NgIf} from '@angular/common';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-inscription-layout',
  imports: [
    HeaderComponent,
    SpinnerComponent,
    ToastModule,
    NgFor,
    NgIf,
    Card
  ],
  standalone: true,
  templateUrl: './inscription-layout.component.html',
  styleUrl: './inscription-layout.component.scss',
  providers: [MessageService]
})
export class InscriptionLayoutComponent implements OnInit, OnDestroy {
  private tokenUtilityClass!: TokenUtilityClass;
  _token!: string;
  _pseudo!: string;
  _spinner: boolean = false;
  _listAdhesionsActive: AdhesionModel[] = [];

  private _subscription: Subscription = new Subscription();
  private _getAdhesionsActive$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private getAllAdhesionsService: GetAllAdhesionsService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
    this.serviceSubscribe();
    this._spinner = true;
    this._getAdhesionsActive$.next(true);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    // get all adhesions
    this._subscription.add(
      this._getAdhesionsActive$.pipe(
        switchMap(_ => {
          return this.getAllAdhesionsService.getAllAdhesions(this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this._listAdhesionsActive = data.response.filter(adhesion => adhesion.inscriptionAvailable == true) as AdhesionModel[];
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  onOpenInscriptionProcess(adhesion: AdhesionModel) {

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
