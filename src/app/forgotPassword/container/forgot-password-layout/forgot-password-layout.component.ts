import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {CreateUserService} from '../../../services/auth/create-user.service';
import {Router} from '@angular/router';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {RecoveryPasswordMailService} from '../../../services/auth/recovery-password-mail.service';
import {UserModel} from '../../../models/userModel';
import {StateApiModel} from '../../../models/stateApiModel';

@Component({
  selector: 'app-forgot-password-layout',
  imports: [FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    NgIf],
  standalone: true,
  providers: [MessageService],
  templateUrl: './forgot-password-layout.component.html',
  styleUrl: './forgot-password-layout.component.scss'
})
export class ForgotPasswordLayoutComponent implements OnInit, OnDestroy {
  _forgotPasswordForm!: FormGroup;
  _isErrorForm: boolean = false;
  _messageError!: string;

  private _subscription: Subscription = new Subscription();
  private _recoveryPasswordMail$: Subject<string> = new Subject();


  constructor(private recoveryPasswordMailService: RecoveryPasswordMailService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this._isErrorForm = false;
    this.isLogged();
    this.serviceSubscribe();
    this.createForm();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    this._subscription.add(
      this._recoveryPasswordMail$.pipe(
        switchMap(mail => {
          return this.recoveryPasswordMailService.recoveryPasswordMail(mail);
        }),
        tap(data => {
          if (data) {
            console.log(data);
            if (data.stateApi?.status === StateApiModel.StatusEnum.Success) {
              if(data.stateApi.log) {
                this.displayMessage(data.stateApi.log,'Erreur' , 'error');
              } else {
                this.displayMessage('Un mail a été envoyé pour réinitialiser le mot de passe','Succés' , 'success');
              }
            } else {
              this.displayMessage('Une erreur est survenue','Erreur' , 'error');
            }
            //     this.displayMessage('Création réussie', 'Le compte a bien été crée' , 'success');
            //     this.redirectToBoard().then(_ => {
            //     });
            //   } else if (data.stateApi?.status === StateApiModel.StatusEnum.Error) {
            //     const message = data.stateApi.log ?? 'Erreur';
            //     this.displayMessage(message, 'Création impossible', 'error');
            //   } else {
            //     this.displayMessage('Création impossible', 'Erreur', 'error');
            //   }
            // } else {
            //   this.displayMessage('Création impossible', 'Erreur', 'error');
          }
        })).subscribe());
  }

  createForm() {
    this._forgotPasswordForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  displayMessageFormError(message: string) {
    this._isErrorForm = true;
    this._messageError = message;
  }

  onSubmitForm() {
    if (!this._forgotPasswordForm.get('mail')?.value) {
      this.displayMessageFormError('Veuillez remplir tous les champs obligatoires.');
    } else if (!this._forgotPasswordForm.get('mail')?.valid) {
      this.displayMessageFormError('Attention, l\'adresse mail est invalide.');
    } else {
      this._messageError = '';
      this._recoveryPasswordMail$.next(this._forgotPasswordForm.get('mail')?.value);
    }
  }

  onCancel() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const storage = localStorage.getItem('currentJCTF');
    if (storage) {
      this.router.navigate(['inscription']);
    }
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }


}
