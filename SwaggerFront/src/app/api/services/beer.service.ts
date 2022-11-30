/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Beer } from '../models/beer';

@Injectable({
  providedIn: 'root',
})
export class BeerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiBeerGet
   */
  static readonly ApiBeerGetPath = '/api/Beer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBeerGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBeerGet$Plain$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<Beer>> {

    const rb = new RequestBuilder(this.rootUrl, BeerService.ApiBeerGetPath, 'get');
    if (params) {
      rb.query('Id', params.Id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Beer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiBeerGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBeerGet$Plain(params?: {
    Id?: number;
  }): Observable<Beer> {

    return this.apiBeerGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Beer>) => r.body as Beer)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBeerGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBeerGet$Json$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<Beer>> {

    const rb = new RequestBuilder(this.rootUrl, BeerService.ApiBeerGetPath, 'get');
    if (params) {
      rb.query('Id', params.Id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Beer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiBeerGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBeerGet$Json(params?: {
    Id?: number;
  }): Observable<Beer> {

    return this.apiBeerGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Beer>) => r.body as Beer)
    );
  }

}
