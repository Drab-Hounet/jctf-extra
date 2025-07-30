import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from '../../../environmnent/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {Observable} from 'rxjs';
import {ResponseApiActivityModel} from '../../models/responseApiActivityModel';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

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
   * Récupère des activités + place dispo selon la categorie
   * @param authorization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getActivities(authorization: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseApiActivityModel >;
  public getActivities(authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseApiActivityModel>>;
  public getActivities(authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseApiActivityModel >>;
  public getActivities(authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (authorization === null || authorization === undefined) {
      throw new Error('Required parameter authorization was null or undefined when calling getActivities.');
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

    return this.httpClient.request<ResponseApiActivityModel>('get', `${this.basePath}/api/ext/activity`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


}
