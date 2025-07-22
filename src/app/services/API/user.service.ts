import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environmnent/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {Observable} from 'rxjs';
import {ResponseUserApiModel} from '../../models/responseApiUserModel';
import {UserModel} from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
   * Récupération des informations d'un user
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUser(authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public getUser(authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public getUser(authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public getUser(authorization: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getUser.');
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
    ];

    return this.httpClient.request<ResponseUserApiModel>('get',`${this.basePath}/api/user`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }



  /**
   * Update user
   *
   * @param body
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateUser(body: UserModel, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public updateUser(body: UserModel, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public updateUser(body: UserModel, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public updateUser(body: UserModel, authorization: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateUser.');
    }

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling updateUser.');
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

    return this.httpClient.request<ResponseUserApiModel>('put',`${this.basePath}/api/user`,
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
