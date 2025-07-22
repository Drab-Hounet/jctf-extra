import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {GetUserDetailsService} from '../../../services/user/get-user-details.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {StateApiModel} from '../../../models/stateApiModel';
import {UserModel} from '../../../models/userModel';
import {UpperCasePipe} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {ModalEditUserComponent} from '../../component/modal-edit-user/modal-edit-user.component';
import {UpdateUserService} from '../../../services/user/update-user.service';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-profile-details',
  imports: [
    CardModule,
    ButtonModule,
    UpperCasePipe,
    DividerModule,
    Tooltip,
    ToastModule,
    ModalEditUserComponent
  ],
  standalone: true,
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
  providers: [MessageService]
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  _spinner: boolean = false;
  _token!: string;

  _userToEdit: UserModel | null = null;

  _userDetails: UserModel | null = null;
  private tokenUtilityClass!: TokenUtilityClass;
  private _subscription: Subscription = new Subscription();
  private _getUser$: Subject<boolean> = new Subject();
  private _updateUser$: Subject<UserModel> = new Subject();

  constructor(private getUserDetailsService: GetUserDetailsService,
              private updateUserService: UpdateUserService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this._spinner = true;
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.serviceSubscribe();
    this.getInformationToken();
    this._getUser$.next(true);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    // get user details
    this._subscription.add(
      this._getUser$.pipe(
        switchMap(_ => {
          return this.getUserDetailsService.getUserDetails(this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this._userDetails = data.response[0];
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());

    // update user
    this._subscription.add(
      this._updateUser$.pipe(
        switchMap(userToUpdate => {
          return this.updateUserService.updateUser(userToUpdate, this._token);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this.displayMessage('Mise à jour réussi', 'Succés', 'success');
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  onEditProfil() {
    this._userToEdit = this._userDetails;
  }

  onUserEdit(userEdit: UserModel | null) {
    this._userToEdit = null;
    if (userEdit) {
      this._spinner = true;
      this._updateUser$.next(userEdit);
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
