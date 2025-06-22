import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateAuthService} from '../../../services/auth/create-auth.service';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {AdminLoginModel} from '../../../models/adminLoginModel';
import {StateApiModel} from '../../../models/stateApiModel';
import {GetAllAdhesionsService} from '../../../services/adhesion/get-all-adhesions.service';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {AdhesionModel} from '../../../models/adhesionModel';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile-history',
  imports: [
    CardModule,
    ToastModule,
    SpinnerComponent,
    NgForOf
  ],
  standalone: true,
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.scss',
  providers: [MessageService]
})
export class ProfileHistoryComponent implements OnInit, OnDestroy {
  _spinner: boolean = false;
  _token!: string;

  _listAdhesions: AdhesionModel[] = [];

  private tokenUtilityClass!: TokenUtilityClass;
  private _subscription: Subscription = new Subscription();
  private _getAdhesions$: Subject<boolean> = new Subject();



  constructor(private getAllAdhesionsService: GetAllAdhesionsService,
              private router: Router,
              private messageService: MessageService) {
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
            this.tokenUtilityClass.redirectToLogin().then(_ =>  {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    //this._pseudo = this.tokenUtilityClass._pseudo;
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }


}
