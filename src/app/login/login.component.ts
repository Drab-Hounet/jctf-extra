import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {AdminLoginModel} from '../models/adminLoginModel';
import {CreateAuthService} from '../services/auth/create-auth.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {StateApiModel} from '../models/stateApiModel';
import {AuthModel} from '../models/authModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  _loginForm!: FormGroup;

  private _subscription: Subscription = new Subscription();
  private _login$: Subject<AdminLoginModel> = new Subject();

  constructor(private fb: FormBuilder,
              private router: Router,
              private createAuthService: CreateAuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.serviceSubscribe();
    this.createForm();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  serviceSubscribe() {
    this._subscription.add(
      this._login$.pipe(
        switchMap(login => {
          return this.createAuthService.createAuthentification(login);
        }),
        tap(data => {
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            // this.setToken(data.response);
            this.displayMessage('Identification réussie', 'Bienvenue ' + data.response[0].pseudo, 'success');
            // this.redirectToBoard();
          } else {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
          }
        })).subscribe());
  }

  createForm() {
    this._loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  submitForm() {
    const adminLogin: AdminLoginModel = {
      pseudo : this._loginForm.get('username')?.value,
      password :this._loginForm.get('password')?.value
    };
    this._login$.next(adminLogin);
  }

  setToken(dataResponse: AuthModel[]) {
    // Il ne peut y avoir qu'une seule authentification
    const pseudo: string = dataResponse[0].pseudo;
    const token: string = dataResponse[0].token;
    localStorage.setItem('currentJCTF', JSON.stringify({ auth: token, username: pseudo }));
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
