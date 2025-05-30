import {Inject, inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environmnent/environment';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {ResponseAuthApiModel} from '../../models/ResponseApiAuth';
import {AdminLoginModel} from '../../models/adminLoginModel';

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
   * Authentification d'un utilisateur
   *
   * @param adminLogin AdminLoginModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'body', reportProgress?: boolean): Observable<ResponseAuthApiModel>;
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseAuthApiModel>>;
  public createAuthUser(adminLogin: AdminLoginModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseAuthApiModel>>;
  public createAuthUser(adminLogin: AdminLoginModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (adminLogin === null || adminLogin === undefined) {
      throw new Error('Required parameter AdminLoginModel was null or undefined when calling authUserUsingPOST.');
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

    return this.httpClient.post<ResponseAuthApiModel>(`${this.basePath}/api/user/auth`,
      adminLogin,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
