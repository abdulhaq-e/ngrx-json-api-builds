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
import { getNgrxJsonApiStore, NgrxJsonApiSelectors } from './selectors';
import { generatePayload, getPendingChanges, sortPendingChanges, } from './utils';
var NgrxJsonApiEffects = (function () {
    /**
     * @param {?} actions$
     * @param {?} jsonApi
     * @param {?} store
     * @param {?} selectors
     */
    function NgrxJsonApiEffects(actions$, jsonApi, store, selectors) {
        var _this = this;
        this.actions$ = actions$;
        this.jsonApi = jsonApi;
        this.store = store;
        this.selectors = selectors;
        this.createResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_POST_INIT)
            .map(function (it) { return _this.generatePayload(it.payload, 'POST'); })
            .mergeMap(function (payload) {
            return _this.jsonApi
                .create(payload.query, payload.jsonApiData)
                .map(function (response) {
                return new ApiPostSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                });
            })
                .catch(function (error) {
                return Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error)));
            });
        });
        this.updateResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_PATCH_INIT)
            .map(function (it) { return _this.generatePayload(it.payload, 'PATCH'); })
            .mergeMap(function (payload) {
            return _this.jsonApi
                .update(payload.query, payload.jsonApiData)
                .map(function (response) {
                return new ApiPatchSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                });
            })
                .catch(function (error) {
                return Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error)));
            });
        });
        this.readResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_GET_INIT)
            .map(function (it) { return it.payload; })
            .mergeMap(function (query) {
            return _this.jsonApi
                .find(query)
                .map(function (response) { return response.body; })
                .map(function (data) {
                return new ApiGetSuccessAction({
                    jsonApiData: data,
                    query: query,
                });
            })
                .catch(function (error) {
                return Observable.of(new ApiGetFailAction(_this.toErrorPayload(query, error)));
            });
        });
        this.queryStore$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(function (it) { return it.payload; })
            .mergeMap(function (query) {
            return _this.store
                .let(_this.selectors.getNgrxJsonApiStore$())
                .let(_this.selectors.queryStore$(query))
                .map(function (results) {
                return new LocalQuerySuccessAction({
                    jsonApiData: { data: results },
                    query: query,
                });
            })
                .catch(function (error) {
                return Observable.of(new LocalQueryFailAction(_this.toErrorPayload(query, error)));
            })
                .takeUntil(_this.localQueryInitEventFor(query))
                .takeUntil(_this.removeQueryEventFor(query));
        });
        this.deleteResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_INIT)
            .map(function (it) { return it.payload; })
            .map(function (it) { return _this.generatePayload(it, 'DELETE'); })
            .mergeMap(function (payload) {
            return _this.jsonApi
                .delete(payload.query)
                .map(function (response) { return response.body; })
                .map(function (data) {
                return new ApiDeleteSuccessAction({
                    jsonApiData: data,
                    query: payload.query,
                });
            })
                .catch(function (error) {
                return Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error)));
            });
        });
        this.triggerReadOnQueryRefresh$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_QUERY_REFRESH)
            .withLatestFrom(this.store, function (action, store) {
            var /** @type {?} */ queryId = action.payload;
            var /** @type {?} */ state = (store['NgrxJsonApi']['api']);
            var /** @type {?} */ query = state.queries[queryId].query;
            return new ApiGetInitAction(query);
        });
        this.refreshQueriesOnDelete$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS)
            .withLatestFrom(this.store, function (action, store) {
            var /** @type {?} */ id = { id: action.payload.query.id, type: action.payload.query.type };
            if (!id.id || !id.type) {
                throw new Error('API_DELETE_SUCCESS did not carry resource id and type information');
            }
            var /** @type {?} */ state = (store['NgrxJsonApi']['api']);
            var /** @type {?} */ actions = [];
            for (var /** @type {?} */ queryId in state.queries) {
                if (state.queries.hasOwnProperty(queryId)) {
                    var /** @type {?} */ query = state.queries[queryId];
                    if (query.resultIds) {
                        var /** @type {?} */ needsRefresh = _.findIndex(query.resultIds, function (o) {
                            return _.isEqual(id, o);
                        }) !== -1;
                        var /** @type {?} */ sameIdRequested = query.query.id === id.id && query.query.type === id.type;
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
            .flatMap(function (actions) { return Observable.of.apply(Observable, actions); });
        this.applyResources$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_APPLY_INIT)
            .filter(function () { return _this.jsonApi.config.applyEnabled !== false; })
            .withLatestFrom(this.store.let(getNgrxJsonApiStore), function (action, ngrxstore) {
            var /** @type {?} */ payload = ((action)).payload;
            var /** @type {?} */ pending = getPendingChanges(ngrxstore.data, payload.ids, payload.include);
            return pending;
        })
            .flatMap(function (pending) {
            if (pending.length === 0) {
                return Observable.of(new ApiApplySuccessAction([]));
            }
            pending = sortPendingChanges(pending);
            var /** @type {?} */ actions = [];
            var _loop_1 = function (pendingChange) {
                if (pendingChange.state === 'CREATED') {
                    var /** @type {?} */ payload_1 = _this.generatePayload(pendingChange, 'POST');
                    actions.push(_this.jsonApi
                        .create(payload_1.query, payload_1.jsonApiData)
                        .map(function (response) {
                        return new ApiPostSuccessAction({
                            jsonApiData: response.body,
                            query: payload_1.query,
                        });
                    })
                        .catch(function (error) {
                        return Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload_1.query, error)));
                    }));
                }
                else if (pendingChange.state === 'UPDATED') {
                    // prepare payload, omit links and meta information
                    var /** @type {?} */ payload_2 = _this.generatePayload(pendingChange, 'PATCH');
                    actions.push(_this.jsonApi
                        .update(payload_2.query, payload_2.jsonApiData)
                        .map(function (response) {
                        return new ApiPatchSuccessAction({
                            jsonApiData: response.body,
                            query: payload_2.query,
                        });
                    })
                        .catch(function (error) {
                        return Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload_2.query, error)));
                    }));
                }
                else if (pendingChange.state === 'DELETED') {
                    var /** @type {?} */ payload_3 = _this.generatePayload(pendingChange, 'DELETE');
                    actions.push(_this.jsonApi
                        .delete(payload_3.query)
                        .map(function (response) {
                        return new ApiDeleteSuccessAction({
                            jsonApiData: response.body,
                            query: payload_3.query,
                        });
                    })
                        .catch(function (error) {
                        return Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload_3.query, error)));
                    }));
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            };
            for (var _i = 0, pending_1 = pending; _i < pending_1.length; _i++) {
                var pendingChange = pending_1[_i];
                _loop_1(/** @type {?} */ pendingChange);
            }
            return Observable.of.apply(Observable, actions).concatAll()
                .toArray()
                .map(function (actions) { return _this.toApplyAction(actions); });
        });
    }
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.localQueryInitEventFor = function (query) {
        return this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(function (action) { /** @type {?} */ return (action); })
            .filter(function (action) { return query.queryId == action.payload.queryId; });
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.removeQueryEventFor = function (query) {
        return this.actions$
            .ofType(NgrxJsonApiActionTypes.REMOVE_QUERY)
            .map(function (action) { /** @type {?} */ return (action); })
            .filter(function (action) { return query.queryId == action.payload; });
    };
    /**
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.ngOnDestroy = function () { };
    /**
     * @param {?} actions
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toApplyAction = function (actions) {
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            if (action.type === NgrxJsonApiActionTypes.API_POST_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_PATCH_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_DELETE_FAIL) {
                return new ApiApplyFailAction(actions);
            }
        }
        return new ApiApplySuccessAction(actions);
    };
    /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toErrorPayload = function (query, response) {
        var /** @type {?} */ contentType = null;
        if (response && response.headers) {
            contentType = response.headers.get('Content-Type');
        }
        var /** @type {?} */ document = null;
        if (contentType != null &&
            contentType.startsWith('application/vnd.api+json')) {
            document = response;
        }
        if (document &&
            document.error &&
            document.error.errors &&
            document.error.errors.length > 0) {
            return {
                query: query,
                jsonApiData: document.error,
            };
        }
        else {
            // transform http to json api error
            var /** @type {?} */ errors = [];
            var /** @type {?} */ error = {
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
    };
    /**
     * @param {?} resource
     * @param {?} operation
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.generatePayload = function (resource, operation) {
        return generatePayload(resource, operation);
    };
    NgrxJsonApiEffects.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    NgrxJsonApiEffects.ctorParameters = function () { return [
        { type: Actions, },
        { type: NgrxJsonApi, },
        { type: Store, },
        { type: NgrxJsonApiSelectors, },
    ]; };
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
    return NgrxJsonApiEffects;
}());
export { NgrxJsonApiEffects };
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