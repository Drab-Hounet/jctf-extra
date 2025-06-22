import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environmnent/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../configuration';
import {Observable} from 'rxjs';
import {BASE_PATH} from '../variables';
import {ResponseUserApiModel} from '../../models/responseApiUser';
import {AdminLoginModel} from '../../models/adminLoginModel';
import {ResponseAdhesionApiModel} from '../../models/responseApiAdhesionModel';

@Injectable({
  providedIn: 'root'
})
export class AdhesionService {
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
   * Get all adhesions from user (token)
   */
  public getAllAdhesions(authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseAdhesionApiModel>;
  public getAllAdhesions(authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let headers = this.defaultHeaders;
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
      headers = headers.set('Authorization', authorization);
    }

    const consumes: string[] = [
      'application/json'
    ];

    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.get<ResponseAdhesionApiModel>(`${this.basePath}/api/ext/adhesion`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      });
  }

  /**
   * Récupère le détail d'une adhésion par ID
   * @param id ID de l'adhésion
   */
  getAdhesionDetails(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.get<any>(`${this.basePath}/${id}`, {headers});
  }
}
