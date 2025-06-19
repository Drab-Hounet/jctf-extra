import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {Toast} from 'primeng/toast';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {PasswordDirective} from 'primeng/password';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {UserModel} from '../../../models/userModel';
import {RecoverySetPasswordService} from '../../../services/auth/recovery-set-password.service';
import {StateApiModel} from '../../../models/stateApiModel';
import {delay} from 'q';

@Component({
  selector: 'app-forgot-password-reset',
  imports: [
    NgIf,
    Card,
    Button,
    SpinnerComponent,
    Toast,
    FormsModule,
    ReactiveFormsModule,
    InputText,
    PasswordDirective
  ],
  standalone: true,
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.scss',
  providers: [MessageService]
})
export class ForgotPasswordResetComponent implements OnInit, OnDestroy {
  _token: string | null = null;
  _error: boolean = false;
  _spinner: boolean = false;

  _isErrorForm: boolean = false;
  _messageError!: string;

  _resetPasswordForm!: FormGroup;

  private _subscription: Subscription = new Subscription();
  private _userToEdit$: Subject<UserModel> = new Subject();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private recoverySetPasswordService: RecoverySetPasswordService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this._token = params.get('token');
      if (!this._token || this._token.length < 10) {
        this._error = true;
      }
    });
    this.createForm();
    this.serviceSubscribe();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    this._subscription.add(
      this._userToEdit$.pipe(
        switchMap(user => {
          return this.recoverySetPasswordService.recoverySetPassword(user);
        }),
        tap(data => {
          this._spinner = false;
          if (data) {
            console.log(data.stateApi)
            if (data.stateApi?.status === StateApiModel.StatusEnum.Success) {
              if (data.stateApi.log) {
                this.displayMessage(data.stateApi.log, 'Erreur', 'error');
              } else {
                this.displayMessage('Mise à jour de votre de passe réussi', 'Succés', 'success');
                this.redirectToLogin().then(_ => {
                });
              }
            } else {
              this.displayMessage('Une erreur est survenue', 'Erreur', 'error');

            }
          }
        })).subscribe());
  }

  async redirectToLogin() {
    await delay(1000);
    this.router.navigate(['login']).then(_ => {
    });
  }

  onCancel() {
    this.router.navigate(['forgotPassword', 'request']);
  }

  createForm() {
    this._resetPasswordForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: [''],
      repeatPassword: ['']
    });
  }

  onSubmitForm() {
    if (this._resetPasswordForm.get('password')?.value !== this._resetPasswordForm.get('repeatPassword')?.value) {
      this.displayMessageFormError('Attention, les mots de passe ne correspondent pas.');
    } else if (!this._resetPasswordForm.get('mail')?.valid) {
      this.displayMessageFormError('Attention, l\'adresse mail est invalide.');
    } else if (!this._resetPasswordForm.valid) {
      this.displayMessageFormError('Veuillez remplir tous les champs obligatoires.');
    } else {
      this._isErrorForm = false;
      this._messageError = '';
      this._spinner = true;
      this._userToEdit$.next({
        name: '',
        surname: '',
        password: '',
        newPassword: this._resetPasswordForm.get('password')?.value,
        mail: this._resetPasswordForm.get('mail')?.value,
        phone: '',
        token: null,
      })
    }
  }

  displayMessageFormError(message: string) {
    this._isErrorForm = true;
    this._messageError = message;
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
