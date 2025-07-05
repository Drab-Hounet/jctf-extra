import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription, switchMap, tap} from 'rxjs';
import {StateApiModel} from '../../../models/stateApiModel';
import {MessageService} from 'primeng/api';
import {SpinnerComponent} from '../../../shared/component/spinner/spinner.component';
import {ToastModule} from 'primeng/toast';
import {GetAdhesionDetailsService} from '../../../services/adhesion/get-adhesion-details.service';
import {NgIf} from '@angular/common';
import {AdhesionModel} from '../../../models/adhesionModel';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-inscription-new',
  imports: [
    HeaderComponent,
    SpinnerComponent,
    ToastModule,
    NgIf,
    Button,
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

  private _subscription: Subscription = new Subscription();
  private _getAdhesionDetails$: Subject<number> = new Subject();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getAdhesionDetailsService: GetAdhesionDetailsService,
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
          this._spinner = false;
          if (data && data.stateApi?.status === StateApiModel.StatusEnum.Success && data.response && data.response.length > 0) {
            this.fillAdherent(data.response[0]);
          } else if (data && data.stateApi?.status === StateApiModel.StatusEnum.SessionError) {
            this.displayMessage('Identification erronée', 'Erreur', 'error');
            this.tokenUtilityClass.redirectToLogin().then(_ => {
            });
          } else {
            this.displayMessage('Une erreur est survenue', 'Erreur', 'error');
          }
        })).subscribe());
  }

  fillAdherent(adhesion: AdhesionModel) {
    this._adhesion = adhesion;
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    this._pseudo = this.tokenUtilityClass._pseudo;
  }

  onOpenBasket() {

  }

  onRedirect() {
    this.router.navigate(['inscription']).then(_ => {
    });
  }

  displayMessage(message: string, summary: string, type: string) {
    this.messageService.add({severity: type, summary: summary, detail: message})
  }
}
