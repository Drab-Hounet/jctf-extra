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
import {delay} from 'q';
import {UserModel} from '../models/userModel';
import {SpinnerComponent} from '../shared/component/spinner/spinner.component';
import {DividerModule} from 'primeng/divider';

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
    SpinnerComponent,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  _loginForm!: FormGroup;
  _spinner: boolean = false;

  private _subscription: Subscription = new Subscription();
  private _login$: Subject<AdminLoginModel> = new Subject();

  constructor(private fb: FormBuilder,
              private router: Router,
              private createAuthService: CreateAuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.isLogged();
    this.serviceSubscribe();
    this.createForm();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  isLogged() {
    const storage = localStorage.getItem('currentJCTF');
    if (storage) {
      this.router.navigate(['inscription']).then(_ => {});
    }
  }

  serviceSubscribe() {
    this._subscription.add(
      this._login$.pipe(
        switchMap(login => {
          return this.createAuthService.createAuthentification(login);
        }),
        tap(data => {
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this.setToken(data.response);
            this.displayMessage('Identification réussie', 'Bienvenue ' + data.response[0].surname, 'success');
            this.redirectToBoard().then(_ => {
            });
          } else {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
          }
        })).subscribe());
  }

  createForm() {
    this._loginForm = this.fb.group({
      mail: [''],
      password: ['']
    });
  }

  onSubmitForm() {
    this._spinner = true;
    const adminLogin: AdminLoginModel = {
      mail: this._loginForm.get('mail')?.value,
      password: this._loginForm.get('password')?.value
    };
    this._login$.next(adminLogin);
  }

  onNewUserForm() {
    this.router.navigate(['new']).then(_ => {});
  }

  onForgotPassword() {
    this.router.navigate(['forgotPassword']).then(_ =>{} );
  }

  async redirectToBoard() {
    await delay(1000);
    this.router.navigate(['inscription']).then(_ => {
    });
  }

  setToken(dataResponse: UserModel[]) {
    const pseudo: string = `${dataResponse[0].surname}`;
    const token: string | null = dataResponse[0].token;
    localStorage.setItem('currentJCTF', JSON.stringify({auth: token, username: pseudo}));
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
