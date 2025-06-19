import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {CreateUserService} from '../../../services/auth/create-user.service';
import {UserModel} from '../../../models/userModel';
import {StateApiModel} from '../../../models/stateApiModel';
import {delay} from 'q';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';

@Component({
  selector: 'app-new-user-layout',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    NgIf,
    SpinnerComponent,
  ],
  templateUrl: './new-user.component-layout.html',
  styleUrl: './new-user.component-layout.scss',
  providers: [MessageService]
})
export class NewUserLayoutComponent implements OnInit, OnDestroy {
  _newForm!: FormGroup;
  _isErrorForm: boolean = false;
  _messageError!: string;
  _spinner = false;

  private _subscription: Subscription = new Subscription();
  private _userToCreate$: Subject<UserModel> = new Subject();

  constructor(private createUserService: CreateUserService,
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
      this._userToCreate$.pipe(
        switchMap(user => {
          return this.createUserService.createUser(user);
        }),
        tap(data => {
          this._spinner = false;
          if (data) {
            if (data.stateApi?.status === StateApiModel.StatusEnum.Success) {
              this.displayMessage('Création réussie', 'Le compte a bien été crée', 'success');
              this.redirectToBoard().then(_ => {
              });
            } else if (data.stateApi?.status === StateApiModel.StatusEnum.Error) {
              const message = data.stateApi.log ?? 'Erreur';
              this.displayMessage(message, 'Création impossible', 'error');
            } else {
              this.displayMessage('Création impossible', 'Erreur', 'error');
            }
          } else {
            this.displayMessage('Création impossible', 'Erreur', 'error');
          }
        })).subscribe());
  }

  createForm() {
    this._newForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^((\+33|0)[1-9](\d{2}){4})$/)]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  onSubmitForm() {
    if (this._newForm.get('password')?.value !== this._newForm.get('repeatPassword')?.value) {
      this.displayMessageFormError('Attention, les mots de passe ne correspondent pas.');
    } else if (!this._newForm.get('phone')?.valid) {
      this.displayMessageFormError('Attention, le numéro de téléphone est invalide.');
    } else if (!this._newForm.get('mail')?.valid) {
      this.displayMessageFormError('Attention, l\'adresse mail est invalide.');
    } else if (!this._newForm.valid) {
      this.displayMessageFormError('Veuillez remplir tous les champs obligatoires.');
    } else {
      this._isErrorForm = false;
      this._messageError = '';
      this._spinner = true;
      this._userToCreate$.next({
        name: this._newForm.get('name')?.value,
        surname: this._newForm.get('surname')?.value,
        password: this._newForm.get('password')?.value,
        mail: this._newForm.get('mail')?.value,
        phone: this._newForm.get('phone')?.value,
        token: null,
      })
    }
  }

  async redirectToBoard() {
    await delay(1000);
    this.router.navigate(['login']).then(_ => {
    });
  }

  displayMessageFormError(message: string) {
    this._isErrorForm = true;
    this._messageError = message;
  }

  onCancel() {
    this.router.navigate(['login']).then(_ => {
    });
  }

  isLogged() {
    const storage = localStorage.getItem('currentJCTF');
    if (storage) {
      this.router.navigate(['inscription']).then(_ => {
      });
    }
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }

}
