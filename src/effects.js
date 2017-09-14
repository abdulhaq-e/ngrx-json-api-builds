import { Injectable } from '@angular/core';
import * as _ from 'lodash/index';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/takeUntil';
import { ApiApplyFailAction, ApiApplySuccessAction, ApiDeleteFailAction, ApiDeleteSuccessAction, ApiGetFailAction, ApiGetInitAction, ApiGetSuccessAction, ApiPatchFailAction, ApiPatchSuccessAction, ApiPostFailAction, ApiPostSuccessAction, ApiQueryRefreshAction, LocalQueryFailAction, LocalQuerySuccessAction, NgrxJsonApiActionTypes, } from './actions';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiSelectors } from './selectors';
import { generatePayload, getPendingChanges, sortPendingChanges, } from './utils';
export class NgrxJsonApiEffects {
    /**
     * @param {?} actions$
     * @param {?} jsonApi
     * @param {?} store
     * @param {?} selectors
     */
    constructor(actions$, jsonApi, store, selectors) {
        this.actions$ = actions$;
        this.jsonApi = jsonApi;
        this.store = store;
        this.selectors = selectors;
        this.createResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_POST_INIT)
            .map(it => this.generatePayload(it.payload, 'POST'))
            .mergeMap((payload) => {
            return this.jsonApi
                .create(payload.query, payload.jsonApiData)
                .map((response) => new ApiPostSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }))
                .catch(error => Observable.of(new ApiPostFailAction(this.toErrorPayload(payload.query, error))));
        });
        this.updateResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_PATCH_INIT)
            .map(it => this.generatePayload(it.payload, 'PATCH'))
            .mergeMap((payload) => {
            return this.jsonApi
                .update(payload.query, payload.jsonApiData)
                .map((response) => new ApiPatchSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }))
                .catch(error => Observable.of(new ApiPatchFailAction(this.toErrorPayload(payload.query, error))));
        });
        this.readResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_GET_INIT)
            .map(it => it.payload)
            .mergeMap((query) => {
            return this.jsonApi
                .find(query)
                .map((response) => response.body)
                .map(data => new ApiGetSuccessAction({
                jsonApiData: data,
                query: query,
            }))
                .catch(error => Observable.of(new ApiGetFailAction(this.toErrorPayload(query, error))));
        });
        this.queryStore$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(it => it.payload)
            .mergeMap((query) => {
            return this.store
                .let(this.selectors.getNgrxJsonApiStore$())
                .let(this.selectors.queryStore$(query))
                .map(results => new LocalQuerySuccessAction({
                jsonApiData: { data: results },
                query: query,
            }))
                .catch(error => Observable.of(new LocalQueryFailAction(this.toErrorPayload(query, error))))
                .takeUntil(this.localQueryInitEventFor(query))
                .takeUntil(this.removeQueryEventFor(query));
        });
        this.deleteResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_INIT)
            .map(it => it.payload)
            .map(it => this.generatePayload(it, 'DELETE'))
            .mergeMap((payload) => {
            return this.jsonApi
                .delete(payload.query)
                .map((response) => response.body)
                .map(data => new ApiDeleteSuccessAction({
                jsonApiData: data,
                query: payload.query,
            }))
                .catch(error => Observable.of(new ApiDeleteFailAction(this.toErrorPayload(payload.query, error))));
        });
        this.triggerReadOnQueryRefresh$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_QUERY_REFRESH)
            .withLatestFrom(this.store, (action, store) => {
            let /** @type {?} */ queryId = action.payload;
            let /** @type {?} */ state = (store['NgrxJsonApi']['api']);
            let /** @type {?} */ query = state.queries[queryId].query;
            return new ApiGetInitAction(query);
        });
        this.refreshQueriesOnDelete$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS)
            .withLatestFrom(this.store, (action, store) => {
            let /** @type {?} */ id = { id: action.payload.query.id, type: action.payload.query.type };
            if (!id.id || !id.type) {
                throw new Error('API_DELETE_SUCCESS did not carry resource id and type information');
            }
            let /** @type {?} */ state = (store['NgrxJsonApi']['api']);
            let /** @type {?} */ actions = [];
            for (let /** @type {?} */ queryId in state.queries) {
                if (state.queries.hasOwnProperty(queryId)) {
                    let /** @type {?} */ query = state.queries[queryId];
                    if (query.resultIds) {
                        let /** @type {?} */ needsRefresh = _.findIndex(query.resultIds, function (o) {
                            return _.isEqual(id, o);
                        }) !== -1;
                        let /** @type {?} */ sameIdRequested = query.query.id === id.id && query.query.type === id.type;
                        if (sameIdRequested && (needsRefresh || _.isEmpty(query.errors))) {
                            throw new Error('store is in invalid state, queries for deleted' +
                                ' resource should have been emptied and marked with 404 error');
                        }
                        if (needsRefresh) {
                            actions.push(new ApiQueryRefreshAction(queryId));
                        }
                    }
                }
            }
            return actions;
        })
            .flatMap(actions => Observable.of(...actions));
        this.applyResources$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_APPLY_INIT)
            .filter(() => this.jsonApi.config.applyEnabled !== false)
            .withLatestFrom(this.store.select(this.selectors.getNgrxJsonApiStore$()), (action, ngrxstore) => {
            let /** @type {?} */ payload = ((action)).payload;
            const /** @type {?} */ pending = getPendingChanges(ngrxstore.data, payload.ids, payload.include);
            return pending;
        })
            .flatMap(pending => {
            if (pending.length === 0) {
                return Observable.of(new ApiApplySuccessAction([]));
            }
            pending = sortPendingChanges(pending);
            let /** @type {?} */ actions = [];
            for (let /** @type {?} */ pendingChange of pending) {
                if (pendingChange.state === 'CREATED') {
                    let /** @type {?} */ payload = this.generatePayload(pendingChange, 'POST');
                    actions.push(this.jsonApi
                        .create(payload.query, payload.jsonApiData)
                        .map(response => new ApiPostSuccessAction({
                        jsonApiData: response.body,
                        query: payload.query,
                    }))
                        .catch(error => Observable.of(new ApiPostFailAction(this.toErrorPayload(payload.query, error)))));
                }
                else if (pendingChange.state === 'UPDATED') {
                    // prepare payload, omit links and meta information
                    let /** @type {?} */ payload = this.generatePayload(pendingChange, 'PATCH');
                    actions.push(this.jsonApi
                        .update(payload.query, payload.jsonApiData)
                        .map(response => new ApiPatchSuccessAction({
                        jsonApiData: response.body,
                        query: payload.query,
                    }))
                        .catch(error => Observable.of(new ApiPatchFailAction(this.toErrorPayload(payload.query, error)))));
                }
                else if (pendingChange.state === 'DELETED') {
                    let /** @type {?} */ payload = this.generatePayload(pendingChange, 'DELETE');
                    actions.push(this.jsonApi
                        .delete(payload.query)
                        .map(response => new ApiDeleteSuccessAction({
                        jsonApiData: response.body,
                        query: payload.query,
                    }))
                        .catch(error => Observable.of(new ApiDeleteFailAction(this.toErrorPayload(payload.query, error)))));
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return Observable.of(...actions)
                .concatAll()
                .toArray()
                .map(actions => this.toApplyAction(actions));
        });
    }
    /**
     * @param {?} query
     * @return {?}
     */
    localQueryInitEventFor(query) {
        return this.actions$.ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(action => (action))
            .filter(action => query.queryId == action.payload.queryId);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    removeQueryEventFor(query) {
        return this.actions$.ofType(NgrxJsonApiActionTypes.REMOVE_QUERY)
            .map(action => (action))
            .filter(action => query.queryId == action.payload);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { }
    /**
     * @param {?} actions
     * @return {?}
     */
    toApplyAction(actions) {
        for (let /** @type {?} */ action of actions) {
            if (action.type === NgrxJsonApiActionTypes.API_POST_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_PATCH_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_DELETE_FAIL) {
                return new ApiApplyFailAction(actions);
            }
        }
        return new ApiApplySuccessAction(actions);
    }
    /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
    toErrorPayload(query, response) {
        let /** @type {?} */ contentType = null;
        if (response && response.headers) {
            contentType = response.headers.get('Content-Type');
        }
        let /** @type {?} */ document = null;
        if (contentType != null && contentType.startsWith('application/vnd.api+json')) {
            document = response;
        }
        if (document && document.error && document.error.errors && document.error.errors.length > 0) {
            return {
                query: query,
                jsonApiData: document.error,
            };
        }
        else {
            // transform http to json api error
            let /** @type {?} */ errors = [];
            let /** @type {?} */ error = {
                status: String(response.status),
                code: response.statusText,
            };
            errors.push(error);
            // got json api errors
            return {
                query: query,
                jsonApiData: {
                    errors: errors,
                },
            };
        }
    }
    /**
     * @param {?} resource
     * @param {?} operation
     * @return {?}
     */
    generatePayload(resource, operation) {
        return generatePayload(resource, operation);
    }
}
NgrxJsonApiEffects.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NgrxJsonApiEffects.ctorParameters = () => [
    { type: Actions, },
    { type: NgrxJsonApi, },
    { type: Store, },
    { type: NgrxJsonApiSelectors, },
];
NgrxJsonApiEffects.propDecorators = {
    'createResource$': [{ type: Effect },],
    'updateResource$': [{ type: Effect },],
    'readResource$': [{ type: Effect },],
    'queryStore$': [{ type: Effect },],
    'deleteResource$': [{ type: Effect },],
    'triggerReadOnQueryRefresh$': [{ type: Effect },],
    'refreshQueriesOnDelete$': [{ type: Effect },],
    'applyResources$': [{ type: Effect },],
};
function NgrxJsonApiEffects_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiEffects.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgrxJsonApiEffects.ctorParameters;
    /** @type {?} */
    NgrxJsonApiEffects.propDecorators;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.createResource$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.updateResource$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.readResource$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.queryStore$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.deleteResource$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.triggerReadOnQueryRefresh$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.refreshQueriesOnDelete$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.applyResources$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.actions$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.jsonApi;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.store;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.selectors;
}
//# sourceMappingURL=effects.js.map