import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environmnent/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {Observable} from 'rxjs';
import {ResponseApiCheckoutIntentModel} from '../../models/responseApiCheckoutIntentModel';
import {PaymentStatusModel} from '../../models/PaymentStatusModel';
import {responseApiCheckoutIntentValidationModel} from '../../models/responseApiCheckoutIntentValidationModel';

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
  public getCheckoutIntent(authorization: string, idAdhesion: number, is3InstalmentsPayment: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiCheckoutIntentModel>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, is3InstalmentsPayment: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiCheckoutIntentModel>>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, is3InstalmentsPayment: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiCheckoutIntentModel>>;
  public getCheckoutIntent(authorization: string, idAdhesion: number, is3InstalmentsPayment: boolean, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

    return this.httpClient.request<ResponseApiCheckoutIntentModel>('post', `${this.basePath}/api/ext/payment/${encodeURIComponent(String(idAdhesion))}/${encodeURIComponent(String(is3InstalmentsPayment))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * RÃŠcupÃŠre le lien pour effectuer le paiement
   *
   * @param body
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public setCheckoutIntent(body: PaymentStatusModel, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<responseApiCheckoutIntentValidationModel>;
  public setCheckoutIntent(body: PaymentStatusModel, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<responseApiCheckoutIntentValidationModel>>;
  public setCheckoutIntent(body: PaymentStatusModel, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<responseApiCheckoutIntentValidationModel>>;
  public setCheckoutIntent(body: PaymentStatusModel, authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling setCheckoutIntent.');
    }

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling setCheckoutIntent.');
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

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<responseApiCheckoutIntentValidationModel>('put', `${this.basePath}/api/ext/payment`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


}
