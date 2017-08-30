(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/add/operator/let'), require('lodash/index'), require('rxjs/add/operator/finally'), require('@angular/common/http'), require('@ngrx/store'), require('@ngrx/effects'), require('rxjs/Observable'), require('rxjs/add/operator/map'), require('rxjs/add/observable/throw'), require('rxjs/add/observable/of'), require('rxjs/add/operator/catch'), require('rxjs/add/operator/concatAll'), require('rxjs/add/operator/do'), require('rxjs/add/operator/mapTo'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/switchMapTo'), require('rxjs/add/operator/take'), require('rxjs/add/operator/toArray'), require('rxjs/add/operator/withLatestFrom'), require('rxjs/add/observable/concat'), require('rxjs/add/operator/combineLatest'), require('rxjs/add/operator/concat'), require('rxjs/add/operator/concatMap'), require('rxjs/add/operator/distinctUntilChanged'), require('rxjs/add/operator/filter'), require('rxjs/add/observable/zip')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/add/operator/let', 'lodash/index', 'rxjs/add/operator/finally', '@angular/common/http', '@ngrx/store', '@ngrx/effects', 'rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/observable/throw', 'rxjs/add/observable/of', 'rxjs/add/operator/catch', 'rxjs/add/operator/concatAll', 'rxjs/add/operator/do', 'rxjs/add/operator/mapTo', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/switchMapTo', 'rxjs/add/operator/take', 'rxjs/add/operator/toArray', 'rxjs/add/operator/withLatestFrom', 'rxjs/add/observable/concat', 'rxjs/add/operator/combineLatest', 'rxjs/add/operator/concat', 'rxjs/add/operator/concatMap', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/filter', 'rxjs/add/observable/zip'], factory) :
	(factory((global.ngrx = global.ngrx || {}, global.ngrx.json = global.ngrx.json || {}, global.ngrx.json.api = {}),global.ng.core,null,global.lodash_index,null,global._angular_common_http,global._ngrx_store,global._ngrx_effects,global.Rx));
}(this, (function (exports,_angular_core,rxjs_add_operator_let,lodash_index,rxjs_add_operator_finally,_angular_common_http,_ngrx_store,_ngrx_effects,rxjs_Observable) { 'use strict';

var Direction = {};
Direction.ASC = 0;
Direction.DESC = 1;
Direction[Direction.ASC] = "ASC";
Direction[Direction.DESC] = "DESC";
var NgrxJsonApiActionTypes = {
    API_POST_INIT: '[NgrxJsonApi] API_POST_INIT',
    API_POST_SUCCESS: '[NgrxJsonApi] API_POST_SUCCESS',
    API_POST_FAIL: '[NgrxJsonApi] API_POST_FAIL',
    API_GET_INIT: '[NgrxJsonApi] API_GET_INIT',
    API_GET_SUCCESS: '[NgrxJsonApi] API_GET_SUCCESS',
    API_GET_FAIL: '[NgrxJsonApi] API_GET_FAIL',
    API_PATCH_INIT: '[NgrxJsonApi] API_PATCH_INIT',
    API_PATCH_SUCCESS: '[NgrxJsonApi] API_PATCH_SUCCESS',
    API_PATCH_FAIL: '[NgrxJsonApi] API_PATCH_FAIL',
    API_DELETE_INIT: '[NgrxJsonApi] API_DELETE_INIT',
    API_DELETE_SUCCESS: '[NgrxJsonApi] API_DELETE_SUCCESS',
    API_DELETE_FAIL: '[NgrxJsonApi] API_DELETE_FAIL',
    API_APPLY_INIT: '[NgrxJsonApi] API_APPLY_INIT',
    API_APPLY_SUCCESS: '[NgrxJsonApi] API_APPLY_SUCCESS',
    API_APPLY_FAIL: '[NgrxJsonApi] API_APPLY_FAIL',
    API_ROLLBACK: '[NgrxJsonApi] API_ROLLBACK',
    API_QUERY_REFRESH: '[NgrxJsonApi] API_QUERY_REFRESH',
    LOCAL_QUERY_INIT: '[NgrxJsonApi] LOCAL_QUERY_INIT',
    LOCAL_QUERY_SUCCESS: '[NgrxJsonApi] LOCAL_QUERY_SUCCESS',
    LOCAL_QUERY_FAIL: '[NgrxJsonApi] LOCAL_QUERY_FAIL',
    DELETE_STORE_RESOURCE: '[NgrxJsonApi] DELETE_STORE_RESOURCE',
    PATCH_STORE_RESOURCE: '[NgrxJsonApi] PATCH_STORE_RESOURCE',
    NEW_STORE_RESOURCE: '[NgrxJsonApi] NEW_STORE_RESOURCE',
    POST_STORE_RESOURCE: '[NgrxJsonApi] POST_STORE_RESOURCE',
    MODIFY_STORE_RESOURCE_ERRORS: '[NgrxJsonApi] MODIFY_STORE_RESOURCE_ERRORS',
    REMOVE_QUERY: '[NgrxJsonApi] REMOVE_QUERY',
    COMPACT_STORE: '[NgrxJsonApi] COMPACT_STORE',
    CLEAR_STORE: '[NgrxJsonApi] CLEAR_STORE',
};
var ApiApplyInitAction = (function () {
    function ApiApplyInitAction() {
        this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
    }
    return ApiApplyInitAction;
}());
var ApiApplySuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiApplySuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
    }
    return ApiApplySuccessAction;
}());
var ApiApplyFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiApplyFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
    }
    return ApiApplyFailAction;
}());
var ApiPostInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_INIT;
    }
    return ApiPostInitAction;
}());
var ApiPostSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
    }
    return ApiPostSuccessAction;
}());
var ApiPostFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
    }
    return ApiPostFailAction;
}());
var ApiDeleteInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
    }
    return ApiDeleteInitAction;
}());
var ApiDeleteSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
    }
    return ApiDeleteSuccessAction;
}());
var ApiDeleteFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
    }
    return ApiDeleteFailAction;
}());
var ApiGetInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_INIT;
    }
    return ApiGetInitAction;
}());
var ApiGetSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
    }
    return ApiGetSuccessAction;
}());
var ApiGetFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
    }
    return ApiGetFailAction;
}());
var ApiRollbackAction = (function () {
    function ApiRollbackAction() {
        this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
    }
    return ApiRollbackAction;
}());
var ApiPatchInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
    }
    return ApiPatchInitAction;
}());
var ApiPatchSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
    }
    return ApiPatchSuccessAction;
}());
var ApiPatchFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
    }
    return ApiPatchFailAction;
}());
var DeleteStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function DeleteStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
    }
    return DeleteStoreResourceAction;
}());
var PatchStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function PatchStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
    }
    return PatchStoreResourceAction;
}());
var NewStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function NewStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
    }
    return NewStoreResourceAction;
}());
var PostStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function PostStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
    }
    return PostStoreResourceAction;
}());
var RemoveQueryAction = (function () {
    /**
     * @param {?} payload
     */
    function RemoveQueryAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
    }
    return RemoveQueryAction;
}());
var LocalQueryInitAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQueryInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
    }
    return LocalQueryInitAction;
}());
var LocalQuerySuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQuerySuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
    }
    return LocalQuerySuccessAction;
}());
var LocalQueryFailAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQueryFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
    }
    return LocalQueryFailAction;
}());
var CompactStoreAction = (function () {
    function CompactStoreAction() {
        this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
    }
    return CompactStoreAction;
}());
var ClearStoreAction = (function () {
    function ClearStoreAction() {
        this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
    }
    return ClearStoreAction;
}());
var ApiQueryRefreshAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiQueryRefreshAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
    }
    return ApiQueryRefreshAction;
}());
var ModifyStoreResourceErrorsAction = (function () {
    /**
     * @param {?} payload
     */
    function ModifyStoreResourceErrorsAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
    }
    return ModifyStoreResourceErrorsAction;
}());
var denormaliseObject = function (resource, storeData, bag) {
    // this function MUST MUTATE resource
    var /** @type {?} */ denormalised = resource;
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(function (relation) {
            resource.relationships[relation]['reference'] = ({});
            var /** @type {?} */ data = resource.relationships[relation].data;
            // denormalised relation
            var /** @type {?} */ relationDenorm;
            if (data === null || lodash_index.isEqual(data, [])) {
                relationDenorm = data;
            }
            else if (lodash_index.isPlainObject(data)) {
                // hasOne relation
                var /** @type {?} */ relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = denormaliseStoreResource(relatedRS, storeData, bag);
            }
            else if (lodash_index.isArray(data)) {
                // hasMany relation
                var /** @type {?} */ relatedRSs = getMultipleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = relatedRSs.map(function (r) { return denormaliseStoreResource(r, storeData, bag); });
            }
            var /** @type {?} */ relationDenormPath = 'relationships.' + relation + '.reference';
            denormalised = (lodash_index.set(denormalised, relationDenormPath, relationDenorm));
        });
    }
    return denormalised;
};
var denormaliseStoreResources = function (items, storeData, bag) {
    if (bag === void 0) { bag = {}; }
    var /** @type {?} */ results = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        results.push(denormaliseStoreResource(item, storeData, bag));
    }
    return results;
};
var denormaliseStoreResource = function (item, storeData, bag) {
    if (bag === void 0) { bag = {}; }
    if (!item) {
        return null;
    }
    var /** @type {?} */ storeResource = lodash_index.cloneDeep(/** @type {?} */ (item));
    if (lodash_index.isUndefined(bag[storeResource.type])) {
        bag[storeResource.type] = {};
    }
    if (lodash_index.isUndefined(bag[storeResource.type][storeResource.id])) {
        bag[storeResource.type][storeResource.id] = storeResource;
        storeResource = denormaliseObject(storeResource, storeData, bag);
        if (storeResource.persistedResource) {
            storeResource.persistedResource = denormaliseObject(storeResource.persistedResource, storeData, bag);
        }
    }
    return bag[storeResource.type][storeResource.id];
};
var getSingleStoreResource = function (resourceId, storeData) {
    return lodash_index.get(storeData, [resourceId.type, resourceId.id], null);
};
var getMultipleStoreResource = function (resourceIds, resources) {
    return resourceIds.map(function (id) { return getSingleStoreResource(id, resources); });
};
var getDenormalisedPath = function (path, baseResourceType, resourceDefinitions, pathSeparator) {
    var /** @type {?} */ denormPath = [];
    if (lodash_index.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var /** @type {?} */ fields = path.split(pathSeparator);
    var /** @type {?} */ currentResourceType = baseResourceType;
    for (var /** @type {?} */ i = 0; i < fields.length; i++) {
        var /** @type {?} */ definition = lodash_index.find(resourceDefinitions, { type: currentResourceType });
        if (lodash_index.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (lodash_index.isUndefined(definition.attributes) &&
            lodash_index.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            denormPath.push('attributes', fields[i]);
            break;
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            var /** @type {?} */ resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                if (i !== fields.length - 1) {
                    throw new Error('Cannot filter past a hasMany relation');
                }
                else {
                    denormPath.push('relationships', fields[i], 'reference');
                }
            }
            else {
                currentResourceType = resourceRelation.type;
                denormPath.push('relationships', fields[i], 'reference');
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
    }
    return denormPath.join(pathSeparator);
};
var getDenormalisedValue = function (path, storeResource, resourceDefinitions, pathSeparator) {
    var /** @type {?} */ denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return lodash_index.get(storeResource, denormalisedPath);
};
/**
 * Given two objects, it will merge the second in the first.
 *
 */
var updateResourceObject = function (original, source) {
    // by default arrays would make use of concat.
    function customizer(objValue, srcValue) {
        if (lodash_index.isArray(objValue)) {
            return srcValue;
        }
    }
    return lodash_index.mergeWith({}, original, source, customizer);
};
/**
 * Insert a StoreResource given the Resource and the StoreResources
 *
 */
var insertStoreResource = function (storeResources, resource, fromServer) {
    var newStoreResources = Object.assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false });
    }
    else {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false });
    }
    return lodash_index.isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
var removeStoreResource = function (storeData, resourceId) {
    if (storeData[resourceId.type][resourceId.id]) {
        var newState = Object.assign({}, storeData);
        newState[resourceId.type] = Object.assign({}, newState[resourceId.type]);
        delete newState[resourceId.type][resourceId.id];
        return newState;
    }
    return storeData;
};
/**
 * Updates the state of a StoreResource in the store.
 *
 * @param storeData
 * @param resourceId
 * @param resourceState
 * @param loading
 */
var updateResourceState = function (storeData, resourceId, resourceState, loading) {
    if (lodash_index.isUndefined(storeData[resourceId.type]) ||
        lodash_index.isUndefined(storeData[resourceId.type][resourceId.id])) {
        if (resourceState === 'DELETED') {
            var newState_1 = Object.assign({}, storeData);
            newState_1[resourceId.type] = Object.assign({}, newState_1[resourceId.type]);
            newState_1[resourceId.type][resourceId.id] = Object.assign({}, newState_1[resourceId.type][resourceId.id]);
            newState_1[resourceId.type][resourceId.id] = {
                type: resourceId.type,
                id: resourceId.id,
                persistedResource: null,
            };
            newState_1[resourceId.type][resourceId.id].state = 'NOT_LOADED';
            return newState_1;
        }
        else {
            return storeData;
        }
    }
    var newState = Object.assign({}, storeData);
    newState[resourceId.type] = Object.assign({}, newState[resourceId.type]);
    newState[resourceId.type][resourceId.id] = Object.assign({}, newState[resourceId.type][resourceId.id]);
    if (resourceState !== null) {
        newState[resourceId.type][resourceId.id].state = resourceState;
    }
    if (loading != null) {
        newState[resourceId.type][resourceId.id].loading = loading;
    }
    return newState;
};
/**
 * Check equality of resource and ignore additional contents used by the
 * store (state, persistedResource, etc.)
 * @param resource0
 * @param resource1
 */
var isEqualResource = function (resource0, resource1) {
    if (resource0 === resource1) {
        return true;
    }
    if (resource0 !== null !== (resource1 !== null)) {
        return false;
    }
    return (lodash_index.isEqual(resource0.id, resource1.id) &&
        lodash_index.isEqual(resource0.type, resource1.type) &&
        lodash_index.isEqual(resource0.attributes, resource1.attributes) &&
        lodash_index.isEqual(resource0.meta, resource1.meta) &&
        lodash_index.isEqual(resource0.links, resource1.links) &&
        lodash_index.isEqual(resource0.relationships, resource1.relationships));
};
var updateStoreResource = function (state, resource, fromServer) {
    var /** @type {?} */ foundStoreResource = state[resource.id];
    var /** @type {?} */ persistedResource = state[resource.id].persistedResource;
    var /** @type {?} */ newResource;
    var /** @type {?} */ newResourceState;
    if (fromServer) {
        // form server, override everything
        // TODO need to handle check and keep local updates?
        newResource = resource;
        persistedResource = resource;
        newResourceState = 'IN_SYNC';
    }
    else {
        var /** @type {?} */ mergedResource = updateResourceObject(foundStoreResource, resource);
        if (isEqualResource(mergedResource, persistedResource)) {
            // no changes anymore, do nothing
            newResource = persistedResource;
            newResourceState = 'IN_SYNC';
        }
        else {
            // merge changes and mark as CREATED or UPDATED depending on whether
            // an original version is available
            newResource = mergedResource;
            if (persistedResource !== null) {
                newResourceState = 'UPDATED';
            }
            else if (foundStoreResource.state === 'NEW') {
                newResourceState = 'NEW';
            }
            else {
                newResourceState = 'CREATED';
            }
        }
    }
    var /** @type {?} */ newState = Object.assign({}, state);
    newState[resource.id] = (Object.assign({}, newResource, { persistedResource: persistedResource, state: newResourceState, errors: [], loading: false }));
    return lodash_index.isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
var updateQueriesForDeletedResource = function (state, deletedId) {
    var /** @type {?} */ newState = state;
    for (var /** @type {?} */ queryId in state) {
        if (state.hasOwnProperty(queryId)) {
            var /** @type {?} */ queryState = state[queryId];
            if (queryState.query.id === deletedId.id &&
                queryState.query.type === deletedId.type) {
                // found a query for a resource that was deleted => modify to 404
                newState = clearQueryResult(newState, queryState.query.queryId);
                var /** @type {?} */ notFoundError = { code: '404', status: 'Not Found' };
                newState[queryState.query.queryId].errors = [notFoundError];
            }
        }
    }
    return newState;
};
var updateResourceErrorsForQuery = function (storeData, query, document) {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
var updateResourceErrors = function (storeData, id, errors, modificationType) {
    if (!storeData[id.type] || !storeData[id.type][id.id]) {
        return storeData;
    }
    var /** @type {?} */ newState = Object.assign({}, storeData);
    newState[id.type] = Object.assign({}, newState[id.type]);
    var /** @type {?} */ storeResource = Object.assign({}, newState[id.type][id.id]);
    if (modificationType === 'SET') {
        storeResource.errors = [];
        if (errors) {
            (_a = storeResource.errors).push.apply(_a, errors);
        }
    }
    else if (modificationType === 'ADD') {
        var /** @type {?} */ currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            (_b = storeResource.errors).push.apply(_b, currentErrors);
        }
        if (errors) {
            (_c = storeResource.errors).push.apply(_c, errors);
        }
    }
    else {
        var /** @type {?} */ currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            var _loop_1 = function (currentError) {
                var /** @type {?} */ remove = errors && errors.filter(function (it) { return lodash_index.isEqual(it, currentError); }).length > 0;
                if (!remove) {
                    storeResource.errors.push(currentError);
                }
            };
            for (var _i = 0, currentErrors_1 = currentErrors; _i < currentErrors_1.length; _i++) {
                var currentError = currentErrors_1[_i];
                _loop_1(/** @type {?} */ currentError);
            }
        }
    }
    newState[id.type][id.id] = storeResource;
    return newState;
    var _a, _b, _c;
};
var rollbackStoreResources = function (storeData) {
    var /** @type {?} */ newState = Object.assign({}, storeData);
    Object.keys(newState).forEach(function (type) {
        newState[type] = Object.assign({}, newState[type]);
        Object.keys(newState[type]).forEach(function (id) {
            var /** @type {?} */ storeResource = newState[type][id];
            if (!storeResource.persistedResource) {
                delete newState[type][id];
            }
            else if (storeResource.state !== 'IN_SYNC') {
                newState[type][id] = (Object.assign({}, newState[type][id], { state: 'IN_SYNC', resource: newState[type][id].persistedResource }));
            }
        });
    });
    return newState;
};
var deleteStoreResources = function (storeData, query) {
    var /** @type {?} */ newState = Object.assign({}, storeData);
    // if an id is not provided, all resources of the provided type will be deleted
    if (typeof query.id === 'undefined') {
        newState[query.type] = {};
    }
    else {
        newState[query.type] = (lodash_index.omit(newState[query.type], [
            query.id,
        ]));
    }
    return newState;
};
var clearQueryResult = function (storeData, queryId) {
    var /** @type {?} */ newQuery = Object.assign({}, storeData[queryId]);
    delete newQuery.resultIds;
    delete newQuery.errors;
    delete newQuery.meta;
    delete newQuery.links;
    var /** @type {?} */ newState = Object.assign({}, storeData);
    newState[queryId] = newQuery;
    return newState;
};
/**
 * Updates a given storeData by either inserting a resource or updating
 * an existing resource.
 *
 * @param storeData
 * @param resource
 * @param fromServer
 * @param override
 *
 * @return a new NgrxJsonApiStoreData with an inserted/updated resource.
 */
var updateStoreDataFromResource = function (storeData, resource, fromServer, override) {
    if (lodash_index.isUndefined(storeData[resource.type])) {
        var newStoreData = Object.assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (lodash_index.isUndefined(storeData[resource.type][resource.id]) || override) {
        var updatedStoreResources = insertStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = Object.assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
    else {
        var updatedStoreResources = updateStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = Object.assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
};
var updateStoreDataFromPayload = function (storeData, payload) {
    var /** @type {?} */ data = (lodash_index.get(payload, 'data'));
    if (lodash_index.isUndefined(data)) {
        return storeData;
    }
    data = lodash_index.isArray(data) ? (data) : ([data]);
    var /** @type {?} */ included = (lodash_index.get(payload, 'included'));
    if (!lodash_index.isUndefined(included)) {
        data = data.concat(included);
    }
    return (lodash_index.reduce(data, function (result, resource) {
        // let resourcePath: string = getResourcePath(
        //   result.resourcesDefinitions, resource.type);
        // Extremely ugly, needs refactoring!
        // let newPartialState = { data: {} };
        // newPartialState.data[resourcePath] = { data: {} } ;
        // newPartialState.data = updateOrInsertResource(
        // result.data, resource);
        return updateStoreDataFromResource(result, resource, true, true);
        // result.data[resourcePath].data = updateOrInsertResource(
        // result.data[resourcePath].data, resource);
        // return <NgrxJsonApiStore>_.merge({}, result, newPartialState);
    }, storeData));
};
/**
 * Updates the storeQueries by either adding a new ResourceQueryStore
 * or modifying an existing one.
 *
 * @param storeQueries
 * @param query
 *
 * @return a new NgrxJsonApiStoreQueries with the inserted/modified
 * ResourceQueryStore
 */
var updateQueryParams = function (storeQueries, query) {
    if (!query.queryId) {
        return storeQueries;
    }
    var newStoreQuery = Object.assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = lodash_index.cloneDeep(query);
    if (lodash_index.isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    var newStoreQueries = Object.assign({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/**
 * Updates the query results for given a queryId and the results.
 */
var updateQueryResults = function (storeQueries, queryId, document) {
    var storeQuery = storeQueries[queryId];
    if (storeQuery) {
        var data = lodash_index.isArray(document.data) ? document.data : [document.data];
        var newQueryStore = Object.assign({}, storeQuery, { resultIds: data.map(function (it) { return (it ? toResourceIdentifier(it) : []); }), meta: document.meta, links: document.links, loading: false });
        var newState = Object.assign({}, storeQueries);
        newState[queryId] = newQueryStore;
        return newState;
    }
    return storeQueries;
};
/**
 * Update the query errors given the queryId and a storeQueries and the
 * document containing the error
 *
 *
 */
var updateQueryErrors = function (storeQueries, queryId, document) {
    if (!queryId || !storeQueries[queryId]) {
        return storeQueries;
    }
    var newState = Object.assign({}, storeQueries);
    var newStoreQuery = Object.assign({}, newState[queryId]);
    newStoreQuery.errors = [];
    if (document.errors) {
        (_a = newStoreQuery.errors).push.apply(_a, document.errors);
    }
    newState[queryId] = newStoreQuery;
    return newState;
    var _a;
};
/**
 * Removes a query given its queryId from the NgrxJsonApiStoreQueries.
 */
var removeQuery = function (storeQueries, queryId) {
    var newState = Object.assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/**
 * Given a resource, it will return an object containing the resource id and type.
 */
var toResourceIdentifier = function (resource) {
    return { type: resource.type, id: resource.id };
};
/**
 * Get the value for the last field in a given fitering path.
 *
 * @param path
 * @param baseStoreResource
 * @param storeData
 * @param resourceDefinitions
 * @param pathSepartor
 * @return the value of the last field in the path.
 */
var getResourceFieldValueFromPath = function (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) {
    if (lodash_index.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var fields = path.split(pathSeparator);
    var currentStoreResource = baseStoreResource;
    for (var i = 0; i < fields.length; i++) {
        var definition = lodash_index.find(resourceDefinitions, {
            type: currentStoreResource.type,
        });
        if (lodash_index.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (lodash_index.isUndefined(definition.attributes) &&
            lodash_index.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            return lodash_index.get(currentStoreResource, 'attributes.' + fields[i], null);
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            if (i === fields.length - 1) {
                throw new Error('The last field in the filtering path cannot be a relation');
            }
            var resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                throw new Error('Cannot filter past a hasMany relation');
            }
            else {
                var relation = lodash_index.get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    var relatedPath = [resourceRelation.type, relation.data.id];
                    currentStoreResource = lodash_index.get(storeData, relatedPath);
                }
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
        if (lodash_index.isUndefined(currentStoreResource)) {
            return null;
        }
    }
};
var filterResources = function (resources, storeData, query, resourceDefinitions, filteringConfig) {
    return lodash_index.filter(resources, function (resource) {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(function (element) {
                var /** @type {?} */ pathSeparator;
                var /** @type {?} */ filteringOperators;
                if (!lodash_index.isUndefined(filteringConfig)) {
                    pathSeparator = (lodash_index.get(filteringConfig, 'pathSeparator'));
                    filteringOperators = (lodash_index.get(filteringConfig, 'filteringOperators'));
                }
                // resource type and attribute
                var /** @type {?} */ resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                var /** @type {?} */ operator = (lodash_index.find(filteringOperators, {
                    name: element.operator,
                }));
                if (operator) {
                    return operator.comparison(element.value, resourceFieldValue);
                }
                element.operator = element.hasOwnProperty('operator')
                    ? element.operator
                    : 'iexact';
                switch (element.operator) {
                    case 'iexact':
                        if (lodash_index.isString(element.value) && lodash_index.isString(resourceFieldValue)) {
                            return (element.value.toLowerCase() === resourceFieldValue.toLowerCase());
                        }
                        else {
                            return element.value === resourceFieldValue;
                        }
                    case 'exact':
                        return element.value === resourceFieldValue;
                    case 'contains':
                        return lodash_index.includes(resourceFieldValue, element.value);
                    case 'icontains':
                        return lodash_index.includes(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'in':
                        if (lodash_index.isArray(element.value)) {
                            return lodash_index.includes(element.value, resourceFieldValue);
                        }
                        else {
                            return lodash_index.includes([element.value], resourceFieldValue);
                        }
                    case 'gt':
                        return element.value > resourceFieldValue;
                    case 'gte':
                        return element.value >= resourceFieldValue;
                    case 'lt':
                        return element.value < resourceFieldValue;
                    case 'lte':
                        return element.value <= resourceFieldValue;
                    case 'startswith':
                        return lodash_index.startsWith(resourceFieldValue, element.value);
                    case 'istartswith':
                        return lodash_index.startsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'endswith':
                        return lodash_index.endsWith(resourceFieldValue, element.value);
                    case 'iendswith':
                        return lodash_index.endsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    default:
                        return true;
                }
            });
        }
        else {
            return true;
        }
    });
};
var generateIncludedQueryParams = function (included) {
    if (lodash_index.isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
var generateFieldsQueryParams = function (fields) {
    if (lodash_index.isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
var generateFilteringQueryParams = function (filtering) {
    if (lodash_index.isEmpty(filtering)) {
        return '';
    }
    var /** @type {?} */ filteringParams = filtering.map(function (f) {
        return ('filter[' +
            f.path +
            ']' +
            (f.operator ? '[' + f.operator + ']' : '') +
            '=' +
            encodeURIComponent(f.value));
    });
    return filteringParams.join('&');
};
var generateSortingQueryParams = function (sorting) {
    if (lodash_index.isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(function (f) { return (f.direction === Direction.ASC ? '' : '-') + f.api; })
            .join(','));
};
var generateQueryParams = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var /** @type {?} */ newParams = params.filter(function (p) { return p !== ''; });
    if (newParams.length !== 0) {
        return '?' + newParams.join('&');
    }
    else {
        return '';
    }
};
var generatePayload = function (resource, operation) {
    var /** @type {?} */ payload = {
        query: {
            type: resource.type,
        },
    };
    // the data to be updated or created
    if (operation === 'POST' || operation === 'PATCH') {
        payload.jsonApiData = {
            data: {
                id: resource.id,
                type: resource.type,
                attributes: resource.attributes,
                relationships: resource.relationships,
            },
        };
    }
    if (operation === 'POST' && resource.hasTemporaryId) {
        delete payload.jsonApiData.data.id;
    }
    // 'DELETE' only needs a query and it also needs an id in its query
    // 'PATCH' also needs an id in its query
    // 'POST' needed locally to allow to write back errors to store if id is available
    if (operation === 'PATCH' || operation === 'DELETE' || operation === 'POST') {
        payload.query.id = resource.id;
    }
    return payload;
};
/* tslint:disable */
var uuid = function () {
    var /** @type {?} */ lut = [];
    for (var /** @type {?} */ i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    var /** @type {?} */ d0 = (Math.random() * 0xffffffff) | 0;
    var /** @type {?} */ d1 = (Math.random() * 0xffffffff) | 0;
    var /** @type {?} */ d2 = (Math.random() * 0xffffffff) | 0;
    var /** @type {?} */ d3 = (Math.random() * 0xffffffff) | 0;
    return (lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] +
        '-' +
        lut[d1 & 0xff] +
        lut[(d1 >> 8) & 0xff] +
        '-' +
        lut[((d1 >> 16) & 0x0f) | 0x40] +
        lut[(d1 >> 24) & 0xff] +
        '-' +
        lut[(d2 & 0x3f) | 0x80] +
        lut[(d2 >> 8) & 0xff] +
        '-' +
        lut[(d2 >> 16) & 0xff] +
        lut[(d2 >> 24) & 0xff] +
        lut[d3 & 0xff] +
        lut[(d3 >> 8) & 0xff] +
        lut[(d3 >> 16) & 0xff] +
        lut[(d3 >> 24) & 0xff]);
};
/* tslint:enable */
var toKey = function (id) {
    return id.id + '@' + id.type;
};
var collectQueryResults = function (state, usedResources) {
    for (var /** @type {?} */ queryName in state.queries) {
        if (state.queries.hasOwnProperty(queryName)) {
            var /** @type {?} */ query = state.queries[queryName];
            if (query.resultIds) {
                for (var _i = 0, _a = query.resultIds; _i < _a.length; _i++) {
                    var resultId = _a[_i];
                    usedResources[toKey(resultId)] = true;
                }
            }
        }
    }
};
var collectPendingChanges = function (state, usedResources) {
    for (var /** @type {?} */ type in state.data) {
        if (state.data.hasOwnProperty(type)) {
            var /** @type {?} */ resources = state.data[type];
            for (var /** @type {?} */ id in resources) {
                if (resources.hasOwnProperty(id)) {
                    var /** @type {?} */ resource = resources[id];
                    if (resource.state !== 'IN_SYNC') {
                        usedResources[toKey(resource)] = true;
                    }
                }
            }
        }
    }
};
var collectReferencesForResource = function (state, usedResources, resource) {
    var /** @type {?} */ hasChanges;
    for (var /** @type {?} */ relationshipName in resource.relationships) {
        if (resource.relationships.hasOwnProperty(relationshipName)) {
            var /** @type {?} */ data = resource.relationships[relationshipName].data;
            if (data) {
                var /** @type {?} */ dependencyIds = data instanceof Array ? data : [data];
                for (var _i = 0, dependencyIds_1 = dependencyIds; _i < dependencyIds_1.length; _i++) {
                    var dependencyId = dependencyIds_1[_i];
                    var /** @type {?} */ dependencyKey = toKey(dependencyId);
                    if (!usedResources[dependencyKey]) {
                        // change found, an other iteration will be necssary to detect
                        // transitive dependencies
                        hasChanges = true;
                        usedResources[dependencyKey] = true;
                    }
                }
            }
        }
    }
    return hasChanges;
};
var collectReferences = function (state, usedResources) {
    while (true) {
        var /** @type {?} */ hasChanges = false;
        for (var /** @type {?} */ type in state.data) {
            if (state.data.hasOwnProperty(type)) {
                var /** @type {?} */ resources = state.data[type];
                for (var /** @type {?} */ id in resources) {
                    if (resources.hasOwnProperty(id)) {
                        var /** @type {?} */ resource = resources[id];
                        if (usedResources[toKey(resource)]) {
                            // in use, do not collect its relations
                            hasChanges =
                                hasChanges ||
                                    collectReferencesForResource(state, usedResources, resource);
                        }
                    }
                }
            }
        }
        if (!hasChanges) {
            break;
        }
    }
};
var sweepUnusedResources = function (state, usedResources) {
    var /** @type {?} */ hasDeletions = false;
    var /** @type {?} */ newState = lodash_index.cloneDeep(state);
    for (var /** @type {?} */ type in newState.data) {
        if (newState.data.hasOwnProperty(type)) {
            var /** @type {?} */ resources = newState.data[type];
            for (var /** @type {?} */ id in resources) {
                if (resources.hasOwnProperty(id)) {
                    var /** @type {?} */ resource = resources[id];
                    if (!usedResources[toKey(resource)]) {
                        hasDeletions = true;
                        delete resources[id];
                    }
                }
            }
            if (lodash_index.isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
var compactStore = function (state) {
    var /** @type {?} */ usedResources = {};
    // query results can not be collected
    collectQueryResults(state, usedResources);
    // pending changes cannot be collected
    collectPendingChanges(state, usedResources);
    // references from non-collected objects cannot be collected as well
    collectReferences(state, usedResources);
    // remove everything that is not collected
    return sweepUnusedResources(state, usedResources);
};
var sortPendingChanges = function (pendingResources) {
    // allocate dependency
    var /** @type {?} */ dependencies = {};
    var /** @type {?} */ pendingMap = {};
    for (var _i = 0, pendingResources_1 = pendingResources; _i < pendingResources_1.length; _i++) {
        var pendingResource = pendingResources_1[_i];
        var /** @type {?} */ resource = pendingResource;
        var /** @type {?} */ key = toKey(resource);
        dependencies[key] = [];
        pendingMap[key] = pendingResource;
    }
    var _loop_2 = function (pendingResource) {
        var /** @type {?} */ resource = pendingResource;
        if (resource.relationships) {
            var /** @type {?} */ key_1 = toKey(resource);
            Object.keys(resource.relationships).forEach(function (relationshipName) {
                var /** @type {?} */ data = resource.relationships[relationshipName].data;
                if (data) {
                    var /** @type {?} */ dependencyIds = data instanceof Array ? data : [data];
                    for (var _i = 0, dependencyIds_2 = dependencyIds; _i < dependencyIds_2.length; _i++) {
                        var dependencyId = dependencyIds_2[_i];
                        var /** @type {?} */ dependencyKey = toKey(dependencyId);
                        if (pendingMap[dependencyKey] &&
                            pendingMap[dependencyKey].state === 'CREATED') {
                            // we have a dependency between two unsaved objects
                            dependencies[key_1].push(pendingMap[dependencyKey]);
                        }
                    }
                }
            });
        }
    };
    // extract dependencies
    for (var _a = 0, pendingResources_2 = pendingResources; _a < pendingResources_2.length; _a++) {
        var pendingResource = pendingResources_2[_a];
        _loop_2(/** @type {?} */ pendingResource);
    }
    // order
    var /** @type {?} */ context = {
        pendingResources: pendingResources,
        cursor: pendingResources.length,
        sorted: new Array(pendingResources.length),
        dependencies: dependencies,
        visited: /** @type {?} */ ([]),
    };
    var /** @type {?} */ i = context.cursor;
    while (i--) {
        if (!context.visited[i]) {
            visitPending(pendingResources[i], i, [], context);
        }
    }
    return context.sorted;
};
var visitPending = function (pendingResource, i, predecessors, context) {
    var /** @type {?} */ key = toKey(pendingResource);
    if (predecessors.indexOf(key) >= 0) {
        throw new Error('Cyclic dependency: ' + key + ' with ' + JSON.stringify(predecessors));
    }
    if (context.visited[i]) {
        return;
    }
    context.visited[i] = true;
    // outgoing edges
    var /** @type {?} */ outgoing = context.dependencies[key];
    var /** @type {?} */ preds = predecessors.concat(key);
    for (var _i = 0, outgoing_1 = outgoing; _i < outgoing_1.length; _i++) {
        var child = outgoing_1[_i];
        visitPending(child, context.pendingResources.indexOf(child), preds, context);
    }
    context.sorted[--context.cursor] = pendingResource;
};
/**
 * @param {?} state
 * @return {?}
 */
function getPendingChanges(state) {
    var /** @type {?} */ pending = [];
    Object.keys(state.data).forEach(function (type) {
        Object.keys(state.data[type]).forEach(function (id) {
            var /** @type {?} */ storeResource = state.data[type][id];
            if (storeResource.state !== 'IN_SYNC' && storeResource.state !== 'NEW') {
                pending.push(storeResource);
            }
        });
    });
    return pending;
}
var NgrxJsonApiService = (function () {
    /**
     * @param {?} store
     * @param {?} selectors
     */
    function NgrxJsonApiService(store, selectors) {
        this.store = store;
        this.selectors = selectors;
        this.test = true;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.findOne = function (options) {
        return (this.findInternal(options, false));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.findMany = function (options) {
        return (this.findInternal(options, true));
    };
    Object.defineProperty(NgrxJsonApiService.prototype, "storeSnapshot", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            if (!this._storeSnapshot) {
                this.store
                    .let(this.selectors.getNgrxJsonApiStore$())
                    .subscribe(function (it) { return (_this._storeSnapshot = (it)); });
                if (!this._storeSnapshot) {
                    throw new Error('failed to initialize store snapshot');
                }
            }
            return this._storeSnapshot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.putQuery = function (options) {
        var /** @type {?} */ query = options.query;
        var /** @type {?} */ fromServer = lodash_index.isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        if (!query.queryId) {
            throw new Error('to query must have a queryId');
        }
        if (fromServer) {
            this.store.dispatch(new ApiGetInitAction(query));
        }
        else {
            this.store.dispatch(new LocalQueryInitAction(query));
        }
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiService.prototype.refreshQuery = function (queryId) {
        this.store.dispatch(new ApiQueryRefreshAction(queryId));
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiService.prototype.removeQuery = function (queryId) {
        this.store.dispatch(new RemoveQueryAction(queryId));
    };
    /**
     * @param {?} options
     * @param {?} multi
     * @return {?}
     */
    NgrxJsonApiService.prototype.findInternal = function (options, multi) {
        var _this = this;
        var /** @type {?} */ query = options.query;
        var /** @type {?} */ fromServer = lodash_index.isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        var /** @type {?} */ denormalise = lodash_index.isUndefined(options.denormalise)
            ? false
            : options.denormalise;
        var /** @type {?} */ newQuery;
        if (!query.queryId) {
            newQuery = Object.assign({}, query, { queryId: this.uuid() });
        }
        else {
            newQuery = query;
        }
        this.putQuery({ query: newQuery, fromServer: fromServer });
        var /** @type {?} */ queryResult$;
        if (multi) {
            queryResult$ = this.selectManyResults(newQuery.queryId, denormalise);
        }
        else {
            queryResult$ = this.selectOneResults(newQuery.queryId, denormalise);
        }
        return (queryResult$.finally(function () { return _this.removeQuery(newQuery.queryId); }));
    };
    /**
     * @return {?}
     */
    NgrxJsonApiService.prototype.uuid = function () {
        return uuid();
    };
    /**
     * Gets the current persisted state of the given resources.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiService.prototype.getPersistedResourceSnapshot = function (identifier) {
        var /** @type {?} */ snapshot = this.storeSnapshot;
        if (snapshot.data[identifier.type] &&
            snapshot.data[identifier.type][identifier.id]) {
            return snapshot.data[identifier.type][identifier.id].persistedResource;
        }
        return null;
    };
    /**
     * Gets the current state of the given resources in the store.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiService.prototype.getResourceSnapshot = function (identifier) {
        var /** @type {?} */ snapshot = this.storeSnapshot;
        if (snapshot.data[identifier.type] &&
            snapshot.data[identifier.type][identifier.id]) {
            return snapshot.data[identifier.type][identifier.id];
        }
        return null;
    };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiService.prototype.selectManyResults = function (queryId, denormalize) {
        if (denormalize === void 0) { denormalize = false; }
        var /** @type {?} */ queryResult$ = this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getManyResults$(queryId, denormalize));
        return queryResult$;
    };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiService.prototype.selectOneResults = function (queryId, denormalize) {
        if (denormalize === void 0) { denormalize = false; }
        var /** @type {?} */ queryResult$ = this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getOneResult$(queryId, denormalize));
        return (queryResult$);
    };
    /**
     * @param {?} identifier of the resource
     * @return {?} observable of the resource
     */
    NgrxJsonApiService.prototype.selectStoreResource = function (identifier) {
        return this.store.let(this.selectors.getStoreResource$(identifier));
    };
    /**
     * @param {?} storeResource$
     * @return {?}
     */
    NgrxJsonApiService.prototype.denormaliseResource = function (storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreData$()), function (storeResource, storeData) {
            if (lodash_index.isArray(storeResource)) {
                return denormaliseStoreResources(/** @type {?} */ (storeResource), storeData);
            }
            else {
                var /** @type {?} */ resource = (storeResource);
                return (denormaliseStoreResource(resource, storeData));
            }
        }));
    };
    /**
     * @param {?} path
     * @param {?} resourceType
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedPath = function (path, resourceType) {
        var /** @type {?} */ pathSeparator = (lodash_index.get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.selectors.config.resourceDefinitions, pathSeparator);
    };
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedValue = function (path, storeResource) {
        var /** @type {?} */ pathSeparator = (lodash_index.get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedValue(path, storeResource, this.selectors.config.resourceDefinitions, pathSeparator);
    };
    /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.patchResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        var /** @type {?} */ toRemote = lodash_index.isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPatchInitAction(resource));
        }
        else {
            this.store.dispatch(new PatchStoreResourceAction(resource));
        }
    };
    /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.newResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        this.store.dispatch(new NewStoreResourceAction(resource));
    };
    /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.postResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        var /** @type {?} */ toRemote = lodash_index.isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPostInitAction(resource));
        }
        else {
            this.store.dispatch(new PostStoreResourceAction(resource));
        }
    };
    /**
     * Marks the given resource for deletion.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiService.prototype.deleteResource = function (options) {
        var /** @type {?} */ resourceId = options.resourceId;
        var /** @type {?} */ toRemote = lodash_index.isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiDeleteInitAction(resourceId));
        }
        else {
            this.store.dispatch(new DeleteStoreResourceAction(resourceId));
        }
    };
    /**
     * Applies all pending changes to the remote JSON API endpoint.
     * @return {?}
     */
    NgrxJsonApiService.prototype.apply = function () {
        this.store.dispatch(new ApiApplyInitAction());
    };
    /**
     * Clear all the contents from the store.
     * @return {?}
     */
    NgrxJsonApiService.prototype.clear = function () {
        this.store.dispatch(new ClearStoreAction());
    };
    /**
     * Compacts the store by removing unreferences and unchanges resources.
     * @return {?}
     */
    NgrxJsonApiService.prototype.compact = function () {
        this.store.dispatch(new CompactStoreAction());
    };
    /**
     * Adds the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiService.prototype.addResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'ADD',
        }));
    };
    /**
     * Removes the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiService.prototype.removeResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'REMOVE',
        }));
    };
    /**
     * Sets the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiService.prototype.setResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'SET',
        }));
    };
    return NgrxJsonApiService;
}());
var SelectStoreResourcePipe = (function () {
    /**
     * @param {?} service
     */
    function SelectStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    SelectStoreResourcePipe.prototype.transform = function (id) {
        return this.service.selectStoreResource(id);
    };
    return SelectStoreResourcePipe;
}());
SelectStoreResourcePipe.decorators = [
    { type: _angular_core.Pipe, args: [{ name: 'jaSelectStoreResource' },] },
];
/**
 * @nocollapse
 */
SelectStoreResourcePipe.ctorParameters = function () { return [
    { type: NgrxJsonApiService, },
]; };
var DenormaliseStoreResourcePipe = (function () {
    /**
     * @param {?} service
     */
    function DenormaliseStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    DenormaliseStoreResourcePipe.prototype.transform = function (obs) {
        return this.service.denormaliseResource(obs);
    };
    return DenormaliseStoreResourcePipe;
}());
DenormaliseStoreResourcePipe.decorators = [
    { type: _angular_core.Pipe, args: [{ name: 'denormaliseStoreResource' },] },
];
/**
 * @nocollapse
 */
DenormaliseStoreResourcePipe.ctorParameters = function () { return [
    { type: NgrxJsonApiService, },
]; };
var GetDenormalisedValuePipe = (function () {
    /**
     * @param {?} service
     */
    function GetDenormalisedValuePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    GetDenormalisedValuePipe.prototype.transform = function (path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    };
    return GetDenormalisedValuePipe;
}());
GetDenormalisedValuePipe.decorators = [
    { type: _angular_core.Pipe, args: [{ name: 'getDenormalisedValue' },] },
];
/**
 * @nocollapse
 */
GetDenormalisedValuePipe.ctorParameters = function () { return [
    { type: NgrxJsonApiService, },
]; };
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
    return t;
};
var NgrxJsonApi = (function () {
    /**
     * @param {?} http
     * @param {?} config
     */
    function NgrxJsonApi(http, config) {
        this.http = http;
        this.config = config;
        this.headers = new _angular_common_http.HttpHeaders({
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
    NgrxJsonApi.prototype.urlBuilder = function (query, operation) {
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
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApi.prototype.collectionPathFor = function (type) {
        // assume that type == collectionPath if not configured otherwise
        var /** @type {?} */ definition = lodash_index.find(this.definitions, { type: type });
        if (definition) {
            return "" + definition.collectionPath;
        }
        else {
            return type;
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApi.prototype.collectionUrlFor = function (type) {
        var /** @type {?} */ collectionPath = this.collectionPathFor(type);
        return this.config.apiUrl + "/" + collectionPath;
    };
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    NgrxJsonApi.prototype.resourcePathFor = function (type, id) {
        var /** @type {?} */ collectionPath = this.collectionPathFor(type);
        return collectionPath + "/" + encodeURIComponent(id);
    };
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    NgrxJsonApi.prototype.resourceUrlFor = function (type, id) {
        var /** @type {?} */ resourcePath = this.resourcePathFor(type, id);
        return this.config.apiUrl + "/" + resourcePath;
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApi.prototype.find = function (query) {
        var /** @type {?} */ _generateIncludedQueryParams = generateIncludedQueryParams;
        var /** @type {?} */ _generateFilteringQueryParams = generateFilteringQueryParams;
        var /** @type {?} */ _generateFieldsQueryParams = generateFieldsQueryParams;
        var /** @type {?} */ _generateSortingQueryParams = generateSortingQueryParams;
        var /** @type {?} */ _generateQueryParams = generateQueryParams;
        if (this.config.hasOwnProperty('urlBuilder')) {
            var /** @type {?} */ urlBuilder = this.config.urlBuilder;
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
        var /** @type {?} */ queryParams = '';
        var /** @type {?} */ includedParam = '';
        var /** @type {?} */ filteringParams = '';
        var /** @type {?} */ sortingParams = '';
        var /** @type {?} */ fieldsParams = '';
        var /** @type {?} */ offsetParams = '';
        var /** @type {?} */ limitParams = '';
        if (typeof query === undefined) {
            return rxjs_Observable.Observable.throw('Query not found');
        }
        if (query.hasOwnProperty('params') && !lodash_index.isEmpty(query.params)) {
            if (lodash_index.hasIn(query.params, 'include')) {
                includedParam = _generateIncludedQueryParams(query.params.include);
            }
            if (lodash_index.hasIn(query.params, 'filtering')) {
                filteringParams = _generateFilteringQueryParams(query.params.filtering);
            }
            if (lodash_index.hasIn(query.params, 'sorting')) {
                sortingParams = _generateSortingQueryParams(query.params.sorting);
            }
            if (lodash_index.hasIn(query.params, 'fields')) {
                fieldsParams = _generateFieldsQueryParams(query.params.fields);
            }
            if (lodash_index.hasIn(query.params, 'limit')) {
                limitParams = 'page[limit]=' + query.params.limit;
            }
            if (lodash_index.hasIn(query.params, 'offset')) {
                offsetParams = 'page[offset]=' + query.params.offset;
            }
        }
        queryParams = _generateQueryParams(includedParam, filteringParams, sortingParams, fieldsParams, offsetParams, limitParams);
        var /** @type {?} */ requestOptions = {
            method: 'GET',
            url: this.urlBuilder(query, 'GET') + queryParams,
        };
        return this.request(requestOptions);
    };
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    NgrxJsonApi.prototype.create = function (query, document) {
        if (typeof query === undefined) {
            return rxjs_Observable.Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return rxjs_Observable.Observable.throw('Data not found');
        }
        var /** @type {?} */ requestOptions = {
            method: 'POST',
            url: this.urlBuilder(query, 'POST'),
            body: JSON.stringify({ data: document.data }),
        };
        return this.request(requestOptions);
    };
    /**
     * @param {?} query
     * @param {?} document
     * @return {?}
     */
    NgrxJsonApi.prototype.update = function (query, document) {
        if (typeof query === undefined) {
            return rxjs_Observable.Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return rxjs_Observable.Observable.throw('Data not found');
        }
        var /** @type {?} */ requestOptions = {
            method: 'PATCH',
            url: this.urlBuilder(query, 'PATCH'),
            body: JSON.stringify({ data: document.data }),
        };
        return this.request(requestOptions);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApi.prototype.delete = function (query) {
        if (typeof query === undefined) {
            return rxjs_Observable.Observable.throw('Query not found');
        }
        var /** @type {?} */ requestOptions = {
            method: 'DELETE',
            url: this.urlBuilder(query, 'DELETE'),
        };
        return this.request(requestOptions);
    };
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    NgrxJsonApi.prototype.request = function (requestOptions) {
        var /** @type {?} */ request;
        var /** @type {?} */ newRequestOptions = Object.assign({}, requestOptions, { headers: this.headers, observe: 'response' });
        if (requestOptions.method === 'GET') {
            var method = newRequestOptions.method, url = newRequestOptions.url, init = __rest(newRequestOptions, ["method", "url"]);
            return this.http.get(url, init);
        }
        else if (requestOptions.method === 'POST') {
            var method = newRequestOptions.method, url = newRequestOptions.url, body = newRequestOptions.body, init = __rest(newRequestOptions, ["method", "url", "body"]);
            return this.http.post(url, body, init);
        }
        else if (requestOptions.method === 'PATCH') {
            var method = newRequestOptions.method, url = newRequestOptions.url, body = newRequestOptions.body, init = __rest(newRequestOptions, ["method", "url", "body"]);
            return this.http.patch(url, body, init);
        }
        else if (requestOptions.method === 'DELETE') {
            var method = newRequestOptions.method, url = newRequestOptions.url, init = __rest(newRequestOptions, ["method", "url"]);
            return this.http.delete(url, init);
        }
    };
    return NgrxJsonApi;
}());
var NgrxJsonApiSelectors = (function () {
    /**
     * @param {?} config
     */
    function NgrxJsonApiSelectors(config) {
        this.config = config;
    }
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getNgrxJsonApiStore$ = function () {
        return function (state$) {
            return state$.select('NgrxJsonApi').select('api');
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreData$ = function () {
        return function (state$) {
            return state$.select('data');
        };
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResourceOfType$ = function (type) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreData$())
                .map(function (resources) { return (resources ? resources[type] : undefined); });
        };
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.queryStore$ = function (query) {
        var _this = this;
        return function (state$) {
            var /** @type {?} */ selected$;
            if (!query.type) {
                return state$.map(function () { return rxjs_Observable.Observable.throw('Unknown query'); });
            }
            else if (query.type && query.id) {
                selected$ = state$.let(_this.getStoreResource$({ type: query.type, id: query.id }));
            }
            else {
                selected$ = state$
                    .let(_this.getStoreResourceOfType$(query.type))
                    .combineLatest(state$.let(_this.getStoreData$()), function (resources, storeData) { return filterResources(resources, storeData, query, _this.config.resourceDefinitions, _this.config.filteringConfig); });
            }
            return selected$.distinctUntilChanged();
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreQueries$ = function () {
        return function (state$) {
            return state$.select('queries');
        };
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getResourceQuery$ = function (queryId) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreQueries$())
                .map(function (it) { return (it ? it[queryId] : undefined); });
        };
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResource$ = function (identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResourceOfType$(identifier.type))
                .map(function (resources) { return ((resources ? resources[identifier.id] : undefined)); });
        };
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getManyResults$ = function (queryId, denormalize) {
        return function (state$) {
            return state$.map(function (state) {
                var /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (lodash_index.isEmpty(storeQuery.resultIds)) {
                    var /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: lodash_index.isUndefined(storeQuery.resultIds) ? undefined : [] });
                    return queryResult;
                }
                else {
                    var /** @type {?} */ results = storeQuery.resultIds.map(function (id) { return (state.data[id.type] ? state.data[id.type][id.id] : undefined); });
                    if (denormalize) {
                        results = denormaliseStoreResources(results, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: /** @type {?} */ (results) });
                }
            });
        };
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getOneResult$ = function (queryId, denormalize) {
        return function (state$) {
            return state$.map(function (state) {
                var /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (lodash_index.isEmpty(storeQuery.resultIds)) {
                    var /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: lodash_index.isUndefined(storeQuery.resultIds) ? undefined : null });
                    return queryResult;
                }
                else {
                    if (storeQuery.resultIds.length >= 2) {
                        throw new Error('expected single result for query ' + storeQuery.query.queryId);
                    }
                    var /** @type {?} */ resultId = storeQuery.resultIds[0];
                    var /** @type {?} */ result = state.data[resultId.type]
                        ? state.data[resultId.type][resultId.id]
                        : undefined;
                    if (denormalize) {
                        result = denormaliseStoreResource(result, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: result });
                }
            });
        };
    };
    /**
     * @param {?} store
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getPersistedResource$ = function (store, identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResource$(identifier))
                .map(function (it) { return (it ? it.persistedResource : undefined); });
        };
    };
    return NgrxJsonApiSelectors;
}());
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
                .mapTo(new ApiPostSuccessAction(payload))
                .catch(function (error) { return rxjs_Observable.Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error))); });
        });
        this.updateResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_PATCH_INIT)
            .map(function (it) { return _this.generatePayload(it.payload, 'PATCH'); })
            .mergeMap(function (payload) {
            return _this.jsonApi
                .update(payload.query, payload.jsonApiData)
                .mapTo(new ApiPatchSuccessAction(payload))
                .catch(function (error) { return rxjs_Observable.Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error))); });
        });
        this.readResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_GET_INIT)
            .map(function (it) { return it.payload; })
            .mergeMap(function (query) {
            return _this.jsonApi
                .find(query)
                .map(function (response) { return response.body; })
                .map(function (data) { return new ApiGetSuccessAction({
                jsonApiData: data,
                query: query,
            }); })
                .catch(function (error) { return rxjs_Observable.Observable.of(new ApiGetFailAction(_this.toErrorPayload(query, error))); });
        });
        this.queryStore$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(function (it) { return it.payload; })
            .mergeMap(function (query) {
            return _this.store
                .let(_this.selectors.getNgrxJsonApiStore$())
                .let(_this.selectors.queryStore$(query))
                .map(function (results) { return new LocalQuerySuccessAction({
                jsonApiData: { data: results },
                query: query,
            }); })
                .catch(function (error) { return rxjs_Observable.Observable.of(new LocalQueryFailAction(_this.toErrorPayload(query, error))); });
        });
        this.deleteResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_INIT)
            .map(function (it) { return it.payload; })
            .map(function (it) { return _this.generatePayload(it, 'DELETE'); })
            .mergeMap(function (payload) {
            return _this.jsonApi
                .delete(payload.query)
                .map(function (response) { return response.body; })
                .map(function (data) { return new ApiDeleteSuccessAction({
                jsonApiData: data,
                query: payload.query,
            }); })
                .catch(function (error) { return rxjs_Observable.Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error))); });
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
                        var /** @type {?} */ needsRefresh = lodash_index.findIndex(query.resultIds, function (o) {
                            return lodash_index.isEqual(id, o);
                        }) !== -1;
                        var /** @type {?} */ sameIdRequested = query.query.id === id.id && query.query.type === id.type;
                        if (sameIdRequested && (needsRefresh || lodash_index.isEmpty(query.errors))) {
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
            .flatMap(function (actions) { return rxjs_Observable.Observable.of.apply(rxjs_Observable.Observable, actions); });
        this.applyResources$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_APPLY_INIT)
            .mergeMap(function () { return _this.store.let(_this.selectors.getNgrxJsonApiStore$()).take(1); })
            .mergeMap(function (ngrxstore) {
            var /** @type {?} */ pending = getPendingChanges(ngrxstore);
            if (pending.length > 0) {
                pending = sortPendingChanges(pending);
                var /** @type {?} */ actions = [];
                var _loop_3 = function (pendingChange) {
                    if (pendingChange.state === 'CREATED') {
                        var /** @type {?} */ payload_1 = _this.generatePayload(pendingChange, 'POST');
                        actions.push(_this.jsonApi
                            .create(payload_1.query, payload_1.jsonApiData)
                            .mapTo(new ApiPostSuccessAction(payload_1))
                            .catch(function (error) { return rxjs_Observable.Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload_1.query, error))); }));
                    }
                    else if (pendingChange.state === 'UPDATED') {
                        // prepare payload, omit links and meta information
                        var /** @type {?} */ payload_2 = _this.generatePayload(pendingChange, 'PATCH');
                        actions.push(_this.jsonApi
                            .update(payload_2.query, payload_2.jsonApiData)
                            .map(function (data) { return new ApiPatchSuccessAction({
                            jsonApiData: data,
                            query: payload_2.query,
                        }); })
                            .catch(function (error) { return rxjs_Observable.Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload_2.query, error))); }));
                    }
                    else if (pendingChange.state === 'DELETED') {
                        var /** @type {?} */ payload_3 = _this.generatePayload(pendingChange, 'DELETE');
                        actions.push(_this.jsonApi
                            .delete(payload_3.query)
                            .map(function (data) { return new ApiDeleteSuccessAction({
                            jsonApiData: data,
                            query: payload_3.query,
                        }); })
                            .catch(function (error) { return rxjs_Observable.Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload_3.query, error))); }));
                    }
                    else {
                        throw new Error('unknown state ' + pendingChange.state);
                    }
                };
                for (var _i = 0, pending_1 = pending; _i < pending_1.length; _i++) {
                    var pendingChange = pending_1[_i];
                    _loop_3(/** @type {?} */ pendingChange);
                }
                return rxjs_Observable.Observable.of.apply(rxjs_Observable.Observable, actions).concatAll()
                    .toArray()
                    .map(function (actions) { return _this.toApplyAction(actions); });
            }
            else {
                return rxjs_Observable.Observable.of(new ApiApplySuccessAction([]));
            }
        });
    }
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
        if (contentType === 'application/vnd.api+json') {
            document = response;
        }
        if (document && document.errors && document.errors.length > 0) {
            return {
                query: query,
                jsonApiData: document,
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
    return NgrxJsonApiEffects;
}());
NgrxJsonApiEffects.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
NgrxJsonApiEffects.ctorParameters = function () { return [
    { type: _ngrx_effects.Actions, },
    { type: NgrxJsonApi, },
    { type: _ngrx_store.Store, },
    { type: NgrxJsonApiSelectors, },
]; };
NgrxJsonApiEffects.propDecorators = {
    'createResource$': [{ type: _ngrx_effects.Effect },],
    'updateResource$': [{ type: _ngrx_effects.Effect },],
    'readResource$': [{ type: _ngrx_effects.Effect },],
    'queryStore$': [{ type: _ngrx_effects.Effect },],
    'deleteResource$': [{ type: _ngrx_effects.Effect },],
    'triggerReadOnQueryRefresh$': [{ type: _ngrx_effects.Effect },],
    'refreshQueriesOnDelete$': [{ type: _ngrx_effects.Effect },],
    'applyResources$': [{ type: _ngrx_effects.Effect },],
};
var initialNgrxJsonApiState = {
    isCreating: 0,
    isReading: 0,
    isUpdating: 0,
    isDeleting: 0,
    isApplying: 0,
    data: {},
    queries: {},
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function NgrxJsonApiStoreReducer(state, action) {
    if (state === void 0) { state = initialNgrxJsonApiState; }
    var /** @type {?} */ newState;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            newState = Object.assign({}, state, { data: updatedData, isCreating: state.isCreating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            var /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query), isReading: state.isReading + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            newState = Object.assign({}, state, { data: updatedData, isUpdating: state.isUpdating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newState = Object.assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED'), isDeleting: state.isDeleting + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newState = Object.assign({}, state, { data: deleteStoreResources(state.data, action.payload.query), queries: updateQueriesForDeletedResource(state.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newState = Object.assign({}, state, { queries: clearQueryResult(state.queries, action.payload) });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newState = Object.assign({}, state, { queries: updateQueryErrors(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            var /** @type {?} */ queryId = (action.payload);
            newState = Object.assign({}, state, { queries: removeQuery(state.queries, queryId) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            var /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query) });
            return newState;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            var /** @type {?} */ payload = (action.payload);
            newState = Object.assign({}, state, { data: updateResourceErrors(state.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            newState = Object.assign({}, state, { queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData) });
            return newState;
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            updatedData = updateResourceState(updatedData, action.payload, 'NEW');
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE: {
            var /** @type {?} */ resourceId = (action.payload);
            if (state.data[resourceId.type] &&
                state.data[resourceId.type][resourceId.id]) {
                var /** @type {?} */ resource = state.data[resourceId.type][resourceId.id];
                if (resource.state === 'NEW' || resource.state === 'CREATED') {
                    // not yet stored on server-side, just delete
                    newState = Object.assign({}, state, { data: removeStoreResource(state.data, resourceId) });
                    return newState;
                }
                else {
                    // stored on server, mark for deletion
                    newState = Object.assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED') });
                    return newState;
                }
            }
            return state;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            var /** @type {?} */ pending_2 = getPendingChanges(state);
            newState = Object.assign({}, state, { isApplying: state.isApplying + 1 });
            for (var _i = 0, pending_3 = pending_2; _i < pending_3.length; _i++) {
                var pendingChange = pending_3[_i];
                if (pendingChange.state === 'CREATED') {
                    newState.isCreating++;
                }
                else if (pendingChange.state === 'UPDATED') {
                    newState.isUpdating++;
                }
                else if (pendingChange.state === 'DELETED') {
                    newState.isDeleting++;
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return newState;
        }
        case NgrxJsonApiActionTypes.API_APPLY_SUCCESS:
        case NgrxJsonApiActionTypes.API_APPLY_FAIL: {
            // apply all the committed or failed changes
            var /** @type {?} */ actions = (action.payload);
            newState = state;
            for (var _a = 0, actions_2 = actions; _a < actions_2.length; _a++) {
                var commitAction = actions_2[_a];
                newState = NgrxJsonApiStoreReducer(newState, commitAction);
            }
            newState = Object.assign({}, newState, { isApplying: state['isApplying'] - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            newState = Object.assign({}, state, { data: rollbackStoreResources(state.data) });
            return newState;
        }
        case NgrxJsonApiActionTypes.CLEAR_STORE: {
            return initialNgrxJsonApiState;
        }
        case NgrxJsonApiActionTypes.COMPACT_STORE: {
            return compactStore(state);
        }
        default:
            return state;
    }
}
var reducer = {
    api: NgrxJsonApiStoreReducer,
};
var NGRX_JSON_API_CONFIG = new _angular_core.OpaqueToken('NGRX_JSON_API_CONFIG');
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function apiFactory(http, config) {
    return new NgrxJsonApi(http, config);
}
/**
 * @param {?} config
 * @return {?}
 */
function selectorsFactory(config) {
    return new NgrxJsonApiSelectors(config);
}
/**
 * @param {?} store
 * @param {?} selectors
 * @return {?}
 */
function serviceFactory(store, selectors) {
    return new NgrxJsonApiService(store, selectors);
}
/**
 * @param {?} config
 * @return {?}
 */
function configure(config) {
    return [
        {
            provide: NgrxJsonApi,
            useFactory: apiFactory,
            deps: [_angular_common_http.HttpClient, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
            deps: [NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [_ngrx_store.Store, NgrxJsonApiSelectors],
        },
        {
            provide: NGRX_JSON_API_CONFIG,
            useValue: config,
        },
    ];
}
var NgrxJsonApiModule = (function () {
    function NgrxJsonApiModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgrxJsonApiModule.configure = function (config) {
        return {
            ngModule: NgrxJsonApiModule,
            providers: configure(config),
        };
    };
    return NgrxJsonApiModule;
}());
NgrxJsonApiModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [
                    DenormaliseStoreResourcePipe,
                    GetDenormalisedValuePipe,
                    SelectStoreResourcePipe,
                ],
                imports: [
                    _ngrx_effects.EffectsModule.forFeature([NgrxJsonApiEffects]),
                    _ngrx_store.StoreModule.forFeature('NgrxJsonApi', reducer, {}),
                ],
                exports: [
                    DenormaliseStoreResourcePipe,
                    GetDenormalisedValuePipe,
                    SelectStoreResourcePipe,
                ],
            },] },
];
/**
 * @nocollapse
 */
NgrxJsonApiModule.ctorParameters = function () { return []; };

exports.SelectStoreResourcePipe = SelectStoreResourcePipe;
exports.DenormaliseStoreResourcePipe = DenormaliseStoreResourcePipe;
exports.GetDenormalisedValuePipe = GetDenormalisedValuePipe;
exports.NgrxJsonApiService = NgrxJsonApiService;
exports.NgrxJsonApiModule = NgrxJsonApiModule;
exports.Direction = Direction;
exports.NgrxJsonApiActionTypes = NgrxJsonApiActionTypes;
exports.ApiApplyInitAction = ApiApplyInitAction;
exports.ApiApplySuccessAction = ApiApplySuccessAction;
exports.ApiApplyFailAction = ApiApplyFailAction;
exports.ApiPostInitAction = ApiPostInitAction;
exports.ApiPostSuccessAction = ApiPostSuccessAction;
exports.ApiPostFailAction = ApiPostFailAction;
exports.ApiDeleteInitAction = ApiDeleteInitAction;
exports.ApiDeleteSuccessAction = ApiDeleteSuccessAction;
exports.ApiDeleteFailAction = ApiDeleteFailAction;
exports.ApiGetInitAction = ApiGetInitAction;
exports.ApiGetSuccessAction = ApiGetSuccessAction;
exports.ApiGetFailAction = ApiGetFailAction;
exports.ApiRollbackAction = ApiRollbackAction;
exports.ApiPatchInitAction = ApiPatchInitAction;
exports.ApiPatchSuccessAction = ApiPatchSuccessAction;
exports.ApiPatchFailAction = ApiPatchFailAction;
exports.DeleteStoreResourceAction = DeleteStoreResourceAction;
exports.PatchStoreResourceAction = PatchStoreResourceAction;
exports.NewStoreResourceAction = NewStoreResourceAction;
exports.PostStoreResourceAction = PostStoreResourceAction;
exports.RemoveQueryAction = RemoveQueryAction;
exports.LocalQueryInitAction = LocalQueryInitAction;
exports.LocalQuerySuccessAction = LocalQuerySuccessAction;
exports.LocalQueryFailAction = LocalQueryFailAction;
exports.CompactStoreAction = CompactStoreAction;
exports.ClearStoreAction = ClearStoreAction;
exports.ApiQueryRefreshAction = ApiQueryRefreshAction;
exports.ModifyStoreResourceErrorsAction = ModifyStoreResourceErrorsAction;
exports.ɵh = NgrxJsonApi;
exports.ɵg = NgrxJsonApiEffects;
exports.ɵa = NGRX_JSON_API_CONFIG;
exports.ɵb = apiFactory;
exports.ɵe = configure;
exports.ɵc = selectorsFactory;
exports.ɵd = serviceFactory;
exports.ɵi = NgrxJsonApiStoreReducer;
exports.ɵj = reducer;
exports.ɵf = NgrxJsonApiSelectors;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-json-api.umd.js.map
