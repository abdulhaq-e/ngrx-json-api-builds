var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as _ from 'lodash/index';
import { HttpHeaders, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { generateIncludedQueryParams, generateFieldsQueryParams, generateFilteringQueryParams, generateSortingQueryParams, generateQueryParams, } from './utils';
export class NgrxJsonApi {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
        });
        this.definitions = this.config.resourceDefinitions;
    }
    /**
     * @param {?} query
     * @param {?} operation
     * @return {?}
     */
    urlBuilder(query, operation) {
        switch (operation) {
            case 'GET': {
                if (query.type && query.id) {
                    return this.resourceUrlFor(query.type, query.id);
                }
                else if (query.type) {
                    return this.collectionUrlFor(query.type);
                }
            }
            case 'DELETE': {
                if (query.type && query.id) {
                    return this.resourceUrlFor(query.type, query.id);
                }
            }
            case 'PATCH': {
                if (query.type && query.id) {
                    return this.resourceUrlFor(query.type, query.id);
                }
            }
            case 'POST': {
                return this.collectionUrlFor(query.type);
            }
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    collectionPathFor(type) {
        // assume that type == collectionPath if not configured otherwise
        let /** @type {?} */ definition = _.find(this.definitions, { type: type });
        if (definition) {
            return `${definition.collectionPath}`;
        }
        else {
            return type;
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    collectionUrlFor(type) {
        let /** @type {?} */ collectionPath = this.collectionPathFor(type);
        return `${this.config.apiUrl}/${collectionPath}`;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    resourcePathFor(type, id) {
        let /** @type {?} */ collectionPath = this.collectionPathFor(type);
        return `${collectionPath}/${encodeURIComponent(id)}`;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    resourceUrlFor(type, id) {
        let /** @type {?} */ resourcePath = this.resourcePathFor(type, id);
        return `${this.config.apiUrl}/${resourcePath}`;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    find(query) {
        let /** @type {?} */ _generateIncludedQueryParams = generateIncludedQueryParams;
        let /** @type {?} */ _generateFilteringQueryParams = generateFilteringQueryParams;
        let /** @type {?} */ _generateFieldsQueryParams = generateFieldsQueryParams;
        let /** @type {?} */ _generateSortingQueryParams = generateSortingQueryParams;
        let /** @type {?} */ _generateQueryParams = generateQueryParams;
        if (this.config.hasOwnProperty('urlBuilder')) {
            let /** @type {?} */ urlBuilder = this.config.urlBuilder;
            if (urlBuilder.generateIncludedQueryParams) {
                _generateIncludedQueryParams = urlBuilder.generateIncludedQueryParams;
            }
            if (urlBuilder.generateFilteringQueryParams) {
                _generateFilteringQueryParams = urlBuilder.generateFilteringQueryParams;
            }
            if (urlBuilder.generateFieldsQueryParams) {
                _generateFieldsQueryParams = urlBuilder.generateFieldsQueryParams;
            }
            if (urlBuilder.generateSortingQueryParams) {
                _generateSortingQueryParams = urlBuilder.generateSortingQueryParams;
            }
            if (urlBuilder.generateQueryParams) {
                _generateQueryParams = urlBuilder.generateQueryParams;
            }
        }
        let /** @type {?} */ queryParams = '';
        let /** @type {?} */ includedParam = '';
        let /** @type {?} */ filteringParams = '';
        let /** @type {?} */ sortingParams = '';
        let /** @type {?} */ fieldsParams = '';
        let /** @type {?} */ offsetParams = '';
        let /** @type {?} */ limitParams = '';
        if (typeof query === undefined) {
            return Observable.throw('Query not found');
        }
        if (query.hasOwnProperty('params') && !_.isEmpty(query.params)) {
            if (_.hasIn(query.params, 'include')) {
                includedParam = _generateIncludedQueryParams(query.params.include);
            }
            if (_.hasIn(query.params, 'filtering')) {
                filteringParams = _generateFilteringQueryParams(query.params.filtering);
            }
            if (_.hasIn(query.params, 'sorting')) {
                sortingParams = _generateSortingQueryParams(query.params.sorting);
            }
            if (_.hasIn(query.params, 'fields')) {
                fieldsParams = _generateFieldsQueryParams(query.params.fields);
            }
            if (_.hasIn(query.params, 'limit')) {
                limitParams = 'page[limit]=' + query.params.limit;
            }
            if (_.hasIn(query.params, 'offset')) {
                offsetParams = 'page[offset]=' + query.params.offset;
            }
        }
        queryParams = _generateQueryParams(includedParam, filteringParams, sortingParams, fieldsParams, offsetParams, limitParams);
        let /** @type {?} */ requestOptions = {
            method: 'GET',
            url: this.urlBuilder(query, 'GET') + queryParams,
        };
        return this.request(requestOptions);
    }
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    create(query, document) {
        if (typeof query === undefined) {
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
        }
        let /** @type {?} */ requestOptions = {
            method: 'POST',
            url: this.urlBuilder(query, 'POST'),
            body: JSON.stringify({ data: document.data }),
        };
        return this.request(requestOptions);
    }
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    update(query, document) {
        if (typeof query === undefined) {
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
        }
        let /** @type {?} */ requestOptions = {
            method: 'PATCH',
            url: this.urlBuilder(query, 'PATCH'),
            body: JSON.stringify({ data: document.data }),
        };
        return this.request(requestOptions);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    delete(query) {
        if (typeof query === undefined) {
            return Observable.throw('Query not found');
        }
        let /** @type {?} */ requestOptions = {
            method: 'DELETE',
            url: this.urlBuilder(query, 'DELETE'),
        };
        return this.request(requestOptions);
    }
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    request(requestOptions) {
        let /** @type {?} */ request;
        let /** @type {?} */ newRequestOptions = Object.assign({}, requestOptions, { headers: this.headers });
        if (requestOptions.method === 'GET') {
            let { method, url } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url"]);
            request = new HttpRequest(method, url, init);
        }
        else if (requestOptions.method === 'POST') {
            let { method, url, body } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url", "body"]);
            request = new HttpRequest(method, url, body, init);
        }
        else if (requestOptions.method === 'PATCH') {
            let { method, url, body } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url", "body"]);
            request = new HttpRequest(method, url, body, init);
        }
        else if (requestOptions.method === 'DELETE') {
            let { method, url } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url"]);
            request = new HttpRequest(method, url, init);
        }
        return this.http.request(request);
    }
}
function NgrxJsonApi_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApi.prototype.headers;
    /** @type {?} */
    NgrxJsonApi.prototype.requestUrl;
    /** @type {?} */
    NgrxJsonApi.prototype.definitions;
    /** @type {?} */
    NgrxJsonApi.prototype.http;
    /** @type {?} */
    NgrxJsonApi.prototype.config;
}
//# sourceMappingURL=api.js.map