import { HttpHeaders, HttpClient, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Document, NgrxJsonApiConfig, ResourceDefinition, Query } from './interfaces';
export declare class NgrxJsonApi {
    private http;
    config: NgrxJsonApiConfig;
    headers: HttpHeaders;
    requestUrl: string;
    definitions: ResourceDefinition[];
    constructor(http: HttpClient, config: NgrxJsonApiConfig);
    private urlBuilder(query, operation);
    private collectionPathFor(type);
    private collectionUrlFor(type);
    private resourcePathFor(type, id);
    private resourceUrlFor(type, id);
    find(query: Query): ErrorObservable | Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>>;
    create(query: Query, document: Document): ErrorObservable | Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>>;
    update(query: Query, document: Document): ErrorObservable | Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>>;
    delete(query: Query): ErrorObservable | Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>>;
    private request(requestOptions);
}
