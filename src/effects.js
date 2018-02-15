var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/concatAll';
import { catchError, combineLatest, filter, flatMap, map, mergeMap, toArray, withLatestFrom, takeUntil, } from 'rxjs/operators';
import { ApiApplyFailAction, ApiApplySuccessAction, ApiDeleteFailAction, ApiDeleteSuccessAction, ApiGetFailAction, ApiGetInitAction, ApiGetSuccessAction, ApiPatchFailAction, ApiPatchSuccessAction, ApiPostFailAction, ApiPostSuccessAction, ApiQueryRefreshAction, LocalQueryFailAction, LocalQuerySuccessAction, NgrxJsonApiActionTypes, } from './actions';
import { NgrxJsonApi } from './api';
import { getNgrxJsonApiZone, selectNgrxJsonApiZone, selectStoreResource, selectStoreResourcesOfType, } from './selectors';
import { generatePayload, getPendingChanges, sortPendingChanges, filterResources, } from './utils';
var NgrxJsonApiEffects = /** @class */ (function () {
    function NgrxJsonApiEffects(actions$, jsonApi, store) {
        var _this = this;
        this.actions$ = actions$;
        this.jsonApi = jsonApi;
        this.store = store;
        this.createResource$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_POST_INIT), mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'POST');
            return _this.jsonApi.create(payload.query, payload.jsonApiData).pipe(map(function (response) {
                return new ApiPostSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            }), catchError(function (error) {
                return of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.updateResource$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_PATCH_INIT), mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'PATCH');
            return _this.jsonApi.update(payload.query, payload.jsonApiData).pipe(map(function (response) {
                return new ApiPatchSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            }), catchError(function (error) {
                return of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.readResource$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_GET_INIT), mergeMap(function (action) {
            var /** @type {?} */ query = action.payload;
            return _this.jsonApi.find(query).pipe(map(function (response) { return response.body; }), map(function (data) {
                return new ApiGetSuccessAction({
                    jsonApiData: data,
                    query: query,
                }, action.zoneId);
            }), catchError(function (error) {
                return of(new ApiGetFailAction(_this.toErrorPayload(query, error), action.zoneId));
            }));
        }));
        this.queryStore$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT), mergeMap(function (action) {
            var /** @type {?} */ query = action.payload;
            return _this.store
                .let(selectNgrxJsonApiZone(action.zoneId))
                .let(_this.executeLocalQuery(query))
                .pipe(map(function (results) {
                return new LocalQuerySuccessAction({
                    jsonApiData: { data: results },
                    query: query,
                }, action.zoneId);
            }), catchError(function (error) {
                return of(new LocalQueryFailAction(_this.toErrorPayload(query, error), action.zoneId));
            }), takeUntil(_this.localQueryInitEventFor(query)), takeUntil(_this.removeQueryEventFor(query)));
        }));
        this.deleteResource$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_DELETE_INIT), mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'DELETE');
            return _this.jsonApi.delete(payload.query).pipe(map(function (response) { return response.body; }), map(function (data) {
                return new ApiDeleteSuccessAction({
                    jsonApiData: data,
                    query: payload.query,
                }, action.zoneId);
            }), catchError(function (error) {
                return of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            }));
        }));
        this.triggerReadOnQueryRefresh$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_QUERY_REFRESH), withLatestFrom(this.store, function (action, store) {
            var /** @type {?} */ queryId = action.payload;
            var /** @type {?} */ state = getNgrxJsonApiZone(store, action.zoneId);
            var /** @type {?} */ query = state.queries[queryId].query;
            return new ApiGetInitAction(query, action.zoneId);
        }));
        this.refreshQueriesOnDelete$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS), withLatestFrom(this.store, function (action, store) {
            var /** @type {?} */ id = { id: action.payload.query.id, type: action.payload.query.type };
            if (!id.id || !id.type) {
                throw new Error('API_DELETE_SUCCESS did not carry resource id and type information');
            }
            var /** @type {?} */ state = getNgrxJsonApiZone(store, action.zoneId);
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
                            actions.push(new ApiQueryRefreshAction(queryId, action.zoneId));
                        }
                    }
                }
            }
            return actions;
        }), flatMap(function (actions) { return of.apply(void 0, actions); }));
        this.applyResources$ = this.actions$.pipe(ofType(NgrxJsonApiActionTypes.API_APPLY_INIT), filter(function () { return _this.jsonApi.config.applyEnabled !== false; }), withLatestFrom(this.store, function (action, storeState) {
            var /** @type {?} */ ngrxstore = getNgrxJsonApiZone(storeState, action.zoneId);
            var /** @type {?} */ payload = (/** @type {?} */ (action)).payload;
            var /** @type {?} */ pending = getPendingChanges(ngrxstore.data, payload.ids, payload.include);
            if (pending.length === 0) {
                return of(new ApiApplySuccessAction([], action.zoneId));
            }
            var /** @type {?} */ sortedPending = sortPendingChanges(pending);
            var /** @type {?} */ actions = [];
            for (var _i = 0, sortedPending_1 = sortedPending; _i < sortedPending_1.length; _i++) {
                var pendingChange = sortedPending_1[_i];
                if (pendingChange.state === 'CREATED') {
                    actions.push(_this.handlePendingCreate(pendingChange, action.zoneId));
                }
                else if (pendingChange.state === 'UPDATED') {
                    actions.push(_this.handlePendingUpdate(pendingChange, action.zoneId));
                }
                else if (pendingChange.state === 'DELETED') {
                    actions.push(_this.handlePendingDelete(pendingChange, action.zoneId));
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return of.apply(void 0, actions).concatAll()
                .pipe(toArray(), map(function (actions) { return _this.toApplyAction(actions, action.zoneId); }));
        }), flatMap(function (actions) { return actions; }));
        this.config = this.jsonApi.config;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.localQueryInitEventFor = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return this.actions$.pipe(ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT), map(function (action) { return (action); }), filter(function (action) { return query.queryId == action.payload.queryId; }));
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.removeQueryEventFor = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return this.actions$.pipe(ofType(NgrxJsonApiActionTypes.REMOVE_QUERY), map(function (action) { return (action); }), filter(function (action) { return query.queryId == action.payload; }));
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.executeLocalQuery = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        return function (state$) {
            var /** @type {?} */ selected$;
            if (!query.type) {
                return state$.map(function () { return Observable.throw('Unknown query'); });
            }
            else if (query.type && query.id) {
                selected$ = state$.let(selectStoreResource({ type: query.type, id: query.id }));
            }
            else {
                selected$ = state$
                    .let(selectStoreResourcesOfType(query.type))
                    .pipe(combineLatest(state$.map(function (it) { return it.data; }), function (resources, storeData) {
                    return filterResources(resources, storeData, query, _this.config.resourceDefinitions, _this.config.filteringConfig);
                }));
            }
            return selected$.distinctUntilChanged();
        };
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingCreate = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'POST');
        return this.jsonApi.create(payload.query, payload.jsonApiData).pipe(map(function (response) {
            return new ApiPostSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        }), catchError(function (error) {
            return of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        }));
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingUpdate = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'PATCH');
        return this.jsonApi.update(payload.query, payload.jsonApiData).pipe(map(function (response) {
            return new ApiPatchSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        }), catchError(function (error) {
            return of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        }));
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingDelete = /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'DELETE');
        return this.jsonApi.delete(payload.query).pipe(map(function (response) {
            return new ApiDeleteSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        }), catchError(function (error) {
            return of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        }));
    };
    /**
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} actions
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toApplyAction = /**
     * @param {?} actions
     * @param {?} zoneId
     * @return {?}
     */
    function (actions, zoneId) {
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            if (action.type === NgrxJsonApiActionTypes.API_POST_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_PATCH_FAIL ||
                action.type === NgrxJsonApiActionTypes.API_DELETE_FAIL) {
                return new ApiApplyFailAction(actions, zoneId);
            }
        }
        return new ApiApplySuccessAction(actions, zoneId);
    };
    /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toErrorPayload = /**
     * @param {?} query
     * @param {?} response
     * @return {?}
     */
    function (query, response) {
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
    NgrxJsonApiEffects.prototype.generatePayload = /**
     * @param {?} resource
     * @param {?} operation
     * @return {?}
     */
    function (resource, operation) {
        return generatePayload(resource, operation);
    };
    NgrxJsonApiEffects.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgrxJsonApiEffects.ctorParameters = function () { return [
        { type: Actions, },
        { type: NgrxJsonApi, },
        { type: Store, },
    ]; };
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "createResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "updateResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "readResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "queryStore$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "deleteResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "triggerReadOnQueryRefresh$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "refreshQueriesOnDelete$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "applyResources$", void 0);
    return NgrxJsonApiEffects;
}());
export { NgrxJsonApiEffects };
function NgrxJsonApiEffects_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgrxJsonApiEffects.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgrxJsonApiEffects.ctorParameters;
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
    NgrxJsonApiEffects.prototype.config;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.actions$;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.jsonApi;
    /** @type {?} */
    NgrxJsonApiEffects.prototype.store;
}
//# sourceMappingURL=effects.js.map