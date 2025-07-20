import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environmnent/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {Observable} from 'rxjs';
import {ResponseApiCheckoutIntentModel} from '../../models/responseApiCheckoutIntentModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * Récupère le lien pour éffectuer le paiement
   * @param authorization
   * @param idAdhesion
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCheckoutIntent(authorization: string, idAdhesion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiCheckoutIntentModel>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiCheckoutIntentModel>>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiCheckoutIntentModel>>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getAdherents.');
    }

    if (idAdhesion === null || idAdhesion === undefined) {
      throw new Error('Required parameter idAdhesion was null or undefined when calling getAdherents.');
    }

    let headers = this.defaultHeaders;
    if (authorization !== undefined && authorization !== null) {
      headers = headers.set('Authorization', String(authorization));
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<ResponseApiCheckoutIntentModel>('post', `${this.basePath}/api/ext/payment/${encodeURIComponent(String(idAdhesion))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
