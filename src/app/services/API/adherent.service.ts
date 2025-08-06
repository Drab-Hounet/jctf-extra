import {Inject, Injectable, Optional} from '@angular/core';
import {
  HttpClient, HttpHeaders,
  HttpResponse, HttpEvent
} from '@angular/common/http';

import {Observable} from 'rxjs';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';
import {environment} from '../../../environments/environment';
import {AdherentModel} from '../../models/adherentModel';
import {ResponseAdherentApiModel} from '../../models/responseApiAdherentModel';


@Injectable({
  providedIn: 'root'
})
export class AdherentService {
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
   * Récupère tous les adhérents d'un user
   *
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAdherents(authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseAdherentApiModel>;
  public getAdherents(authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseAdherentApiModel>>;
  public getAdherents(authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseAdherentApiModel>>;
  public getAdherents(authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getAdherents1.');
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

    return this.httpClient.request<ResponseAdherentApiModel>('get', `${this.basePath}/api/ext/adherent`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


  /**
   * Récupère tous les adhérents d'un user non présent dans l'adhesion donnée
   *
   * @param authorization
   * @param idAdhesion
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAdherentsFreeAdhesion(authorization: string, idAdhesion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseAdherentApiModel>;
  public getAdherentsFreeAdhesion(authorization: string, idAdhesion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseAdherentApiModel>>;
  public getAdherentsFreeAdhesion(authorization: string, idAdhesion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseAdherentApiModel>>;
  public getAdherentsFreeAdhesion(authorization: string, idAdhesion: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getAdherentsFreeAdhesion.');
    }

    if (idAdhesion === null || idAdhesion === undefined) {
      throw new Error('Required parameter idAdhesion was null or undefined when calling getAdherentsFreeAdhesion.');
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

    return this.httpClient.request<ResponseAdherentApiModel>('get', `${this.basePath}/api/ext/adherent/${encodeURIComponent(String(idAdhesion))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Crée un adherent sans adhésion
   * @param body
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createAdherent(body: AdherentModel, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseAdherentApiModel>;
  public createAdherent(body: AdherentModel, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseAdherentApiModel>>;
  public createAdherent(body: AdherentModel, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseAdherentApiModel>>;
  public createAdherent(body: AdherentModel, authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createAdherent.');
    }

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling createAdherent.');
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

    return this.httpClient.request<ResponseAdherentApiModel>('post', `${this.basePath}/api/ext/adherent`,
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
