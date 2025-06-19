import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environmnent/environment';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {ResponseUserApiModel} from '../../models/ResponseApiUser';
import {AdminLoginModel} from '../../models/adminLoginModel';
import {UserModel} from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
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
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * Authentification user
   * @param adminLogin AdminLoginModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public createAuthUser(adminLogin: AdminLoginModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (adminLogin === null || adminLogin === undefined) {
      throw new Error('Required parameter adminLogin was null or undefined when calling createAuthUser.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.post<ResponseUserApiModel>(`${this.basePath}/api/user/auth`,
      adminLogin,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


  /**
   * Create new user
   * @param newUser UserModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createUser(newUser: UserModel, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public createUser(newUser: UserModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public createUser(newUser: UserModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public createUser(newUser: UserModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (newUser === null || newUser === undefined) {
      throw new Error('Required parameter newUser was null or undefined when calling createUser.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.post<ResponseUserApiModel>(`${this.basePath}/api/user`,
      newUser,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


  /**
   * ask recovery Password (mail)
   * @param mail string
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public recoveryPassword(mail: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public recoveryPassword(mail: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public recoveryPassword(mail: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public recoveryPassword(mail: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (mail === null || mail === undefined) {
      throw new Error('Required parameter mail was null or undefined when calling recoveryPassword.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.post<ResponseUserApiModel>(`${this.basePath}/api/pass/recovery`,
      mail,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
  /**
   * ask recovery Password (mail)
   * @param mail string
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public recoverySetPassword(user: UserModel, observe?: 'body', reportProgress?: boolean): Observable<ResponseUserApiModel>;
  public recoverySetPassword(user: UserModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseUserApiModel>>;
  public recoverySetPassword(user: UserModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseUserApiModel>>;
  public recoverySetPassword(user: UserModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (user === null || user === undefined) {
      throw new Error('Required parameter user was null or undefined when calling recoverySetPassword.');
    }

    let headers = this.defaultHeaders;

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

    return this.httpClient.put<ResponseUserApiModel>(`${this.basePath}/api/pass/recovery`,
      user,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );

  }
}
