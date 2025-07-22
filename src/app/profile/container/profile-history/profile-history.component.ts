import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {Router} from '@angular/router';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {StateApiModel} from '../../../models/stateApiModel';
import {GetAllAdhesionsService} from '../../../services/adhesion/get-all-adhesions.service';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {AdhesionModel} from '../../../models/adhesionModel';
import {NgForOf, NgIf} from '@angular/common';
import {ModalAdhesionDetailsComponent} from '../../component/modal-adhesion-details/modal-adhesion-details.component';
import {GetAdhesionDetailsService} from '../../../services/adhesion/get-adhesion-details.service';

@Component({
  selector: 'app-profile-history',
  imports: [
    CardModule,
    ToastModule,
    SpinnerComponent,
    NgForOf,
    NgIf,
    ModalAdhesionDetailsComponent
  ],
  standalone: true,
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.scss',
  providers: [MessageService]
})
export class ProfileHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  _spinner: boolean = false;
  _token!: string;

  _listAdhesions: AdhesionModel[] = [];
  _adhesionDetails: AdhesionModel | null = null;

  private tokenUtilityClass!: TokenUtilityClass;
  private _subscription: Subscription = new Subscription();
  private _getAdhesions$: Subject<boolean> = new Subject();
  private _getAdhesionDetails$: Subject<number> = new Subject();

  constructor(private getAllAdhesionsService: GetAllAdhesionsService,
              private getAdhesionDetailsService: GetAdhesionDetailsService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngAfterViewInit() {
    this._adhesionDetails = null;
  }

  ngOnInit() {
    this._spinner = true;
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.serviceSubscribe();
    this.getInformationToken();
    this._getAdhesions$.next(true);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    // get all adhesions
    this._subscription.add(
      this._getAdhesions$.pipe(
        switchMap(_ => {
          return this.getAllAdhesionsService.getAllAdhesions(this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this._listAdhesions = data.response;
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // get adhesion details
    this._subscription.add(
      this._getAdhesionDetails$.pipe(
        switchMap(id => {
          return this.getAdhesionDetailsService.getAdhesionDetails(id, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this._adhesionDetails = data.response[0];
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  onOpenModal(adhesion: AdhesionModel) {
    if (adhesion.id) {
      this._spinner = true;
      this._getAdhesionDetails$.next(adhesion.id);
    }
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }


}
