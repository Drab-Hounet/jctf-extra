import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {AdherentBasketModel} from '../../models/adherentBasketModel';
import {ResponseApiAdherentBasketModel, ResponseApiBasketModel} from '../../models/responseApiBasketModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
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
   * Créer un element du panier du user
   *
   * @param body
   * @param authorization
   * @param idAdhesion
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiAdherentBasketModel>;
  public createBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiAdherentBasketModel>>;
  public createBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiAdherentBasketModel>>;
  public createBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createBasketAdherent.');
    }

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling createBasketAdherent.');
    }

    if (idAdhesion === null || idAdhesion === undefined) {
      throw new Error('Required parameter idAdhesion was null or undefined when calling createBasketAdherent.');
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

    return this.httpClient.request<ResponseApiAdherentBasketModel>('post', `${this.basePath}/api/ext/basket/${encodeURIComponent(String(idAdhesion))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Efface tous les elements du panier du user
   *
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteAllBasketAdherent(authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiBasketModel>;
  public deleteAllBasketAdherent(authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiBasketModel>>;
  public deleteAllBasketAdherent(authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiBasketModel>>;
  public deleteAllBasketAdherent(authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling deleteAllBasketAdherent.');
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
    const consumes: string[] = [];

    return this.httpClient.request<ResponseApiBasketModel>('delete', `${this.basePath}/api/ext/basket`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Efface un element du panier du user
   *
   * @param authorization
   * @param idBasketAdherent
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteBasketAdherent(authorization: string, idBasketAdherent: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiBasketModel>;
  public deleteBasketAdherent(authorization: string, idBasketAdherent: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiBasketModel>>;
  public deleteBasketAdherent(authorization: string, idBasketAdherent: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiBasketModel>>;
  public deleteBasketAdherent(authorization: string, idBasketAdherent: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling deleteBasketAdherent.');
    }

    if (idBasketAdherent === null || idBasketAdherent === undefined) {
      throw new Error('Required parameter idBasketAdherent was null or undefined when calling deleteBasketAdherent.');
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
    const consumes: string[] = [];

    return this.httpClient.request<ResponseApiBasketModel>('delete', `${this.basePath}/api/ext/basket/${encodeURIComponent(String(idBasketAdherent))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Récupère le panier du user
   *
   * @param authorization
   * @param idAdhesion
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getBasketAdherent(authorization: string, idAdhesion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiBasketModel>;
  public getBasketAdherent(authorization: string, idAdhesion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiBasketModel>>;
  public getBasketAdherent(authorization: string, idAdhesion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiBasketModel>>;
  public getBasketAdherent(authorization: string, idAdhesion: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getBasketAdherent.');
    }

    if (idAdhesion === null || idAdhesion === undefined) {
      throw new Error('Required parameter idAdhesion was null or undefined when calling getBasketAdherent.');
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
    const consumes: string[] = [];

    return this.httpClient.request<ResponseApiBasketModel>('get', `${this.basePath}/api/ext/basket/${encodeURIComponent(String(idAdhesion))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Met à jour un element du panier du user
   *
   * @param body
   * @param authorization
   * @param idAdhesion
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiBasketModel>;
  public updateBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiBasketModel>>;
  public updateBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiBasketModel>>;
  public updateBasketAdherent(body: AdherentBasketModel, authorization: string, idAdhesion: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateBasketAdherent.');
    }

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling updateBasketAdherent.');
    }

    if (idAdhesion === null || idAdhesion === undefined) {
      throw new Error('Required parameter idAdhesion was null or undefined when calling updateBasketAdherent.');
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

    return this.httpClient.request<ResponseApiBasketModel>('put', `${this.basePath}/api/ext/basket/${encodeURIComponent(String(idAdhesion))}`,
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
