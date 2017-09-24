import { Injectable, NgModule, OpaqueToken, Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { cloneDeep, endsWith, filter, find, findIndex, get, hasIn, includes, isArray, isEmpty, isEqual, isPlainObject, isString, isUndefined, mergeWith, omit, reduce, set, startsWith, uniqBy } from 'lodash/index';
import * as _ from 'lodash/index';
import 'rxjs/add/operator/finally';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { Actions, Effect, EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
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
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';

let Direction = {};
Direction.ASC = 0;
Direction.DESC = 1;
Direction[Direction.ASC] = "ASC";
Direction[Direction.DESC] = "DESC";

const NgrxJsonApiActionTypes = {
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
class ApiApplyInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
    }
}
class ApiApplySuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
    }
}
class ApiApplyFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
    }
}
class ApiPostInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_INIT;
    }
}
class ApiPostSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
    }
}
class ApiPostFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
    }
}
class ApiDeleteInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
    }
}
class ApiDeleteSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
    }
}
class ApiDeleteFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
    }
}
class ApiGetInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_INIT;
    }
}
class ApiGetSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
    }
}
class ApiGetFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
    }
}
class ApiRollbackAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
    }
}
class ApiPatchInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
    }
}
class ApiPatchSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
    }
}
class ApiPatchFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
    }
}
class DeleteStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
    }
}
class PatchStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
    }
}
class NewStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
    }
}
class PostStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
    }
}
class RemoveQueryAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
    }
}
class LocalQueryInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
    }
}
class LocalQuerySuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
    }
}
class LocalQueryFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
    }
}
class CompactStoreAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
    }
}
class ClearStoreAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
    }
}
class ApiQueryRefreshAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
    }
}
class ModifyStoreResourceErrorsAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
    }
}

const denormaliseObject = (resource, storeData, bag) => {
    // this function MUST MUTATE resource
    let /** @type {?} */ denormalised = resource;
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(relation => {
            resource.relationships[relation]['reference'] = ({});
            let /** @type {?} */ data = resource.relationships[relation].data;
            // denormalised relation
            let /** @type {?} */ relationDenorm;
            if (data === null || isEqual(data, [])) {
                relationDenorm = data;
            }
            else if (isPlainObject(data)) {
                // hasOne relation
                let /** @type {?} */ relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = denormaliseStoreResource(relatedRS, storeData, bag);
            }
            else if (isArray(data)) {
                // hasMany relation
                let /** @type {?} */ relatedRSs = getMultipleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = relatedRSs.map(r => denormaliseStoreResource(r, storeData, bag));
            }
            let /** @type {?} */ relationDenormPath = 'relationships.' + relation + '.reference';
            denormalised = (set(denormalised, relationDenormPath, relationDenorm));
        });
    }
    return denormalised;
};
const denormaliseStoreResources = (items, storeData, bag = {}) => {
    let /** @type {?} */ results = [];
    for (let /** @type {?} */ item of items) {
        results.push(denormaliseStoreResource(item, storeData, bag));
    }
    return results;
};
const denormaliseStoreResource = (item, storeData, bag = {}) => {
    if (!item) {
        return null;
    }
    let /** @type {?} */ storeResource = cloneDeep(/** @type {?} */ (item));
    if (isUndefined(bag[storeResource.type])) {
        bag[storeResource.type] = {};
    }
    if (isUndefined(bag[storeResource.type][storeResource.id])) {
        bag[storeResource.type][storeResource.id] = storeResource;
        storeResource = denormaliseObject(storeResource, storeData, bag);
        if (storeResource.persistedResource) {
            storeResource.persistedResource = denormaliseObject(storeResource.persistedResource, storeData, bag);
        }
    }
    return bag[storeResource.type][storeResource.id];
};
const getSingleStoreResource = (resourceId, storeData) => {
    return get(storeData, [resourceId.type, resourceId.id], null);
};
const getMultipleStoreResource = (resourceIds, resources) => {
    return resourceIds.map(id => getSingleStoreResource(id, resources));
};
const getDenormalisedPath = (path, baseResourceType, resourceDefinitions, pathSeparator) => {
    let /** @type {?} */ denormPath = [];
    if (isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    let /** @type {?} */ fields = path.split(pathSeparator);
    let /** @type {?} */ currentResourceType = baseResourceType;
    for (let /** @type {?} */ i = 0; i < fields.length; i++) {
        let /** @type {?} */ definition = find(resourceDefinitions, { type: currentResourceType });
        if (isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (isUndefined(definition.attributes) &&
            isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            denormPath.push('attributes', fields[i]);
            break;
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            let /** @type {?} */ resourceRelation = definition.relationships[fields[i]];
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
const getDenormalisedValue = (path, storeResource, resourceDefinitions, pathSeparator) => {
    let /** @type {?} */ denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return get(storeResource, denormalisedPath);
};
/**
 * Given two objects, it will merge the second in the first.
 *
 */
const updateResourceObject = (original, source) => {
    // by default arrays would make use of concat.
    function customizer(objValue, srcValue) {
        if (isArray(objValue)) {
            return srcValue;
        }
    }
    return mergeWith({}, original, source, customizer);
};
/**
 * Insert a StoreResource given the Resource and the StoreResources
 *
 */
const insertStoreResource = (storeResources, resource, fromServer) => {
    let newStoreResources = Object.assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false });
    }
    else {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false });
    }
    return isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
const removeStoreResource = (storeData, resourceId) => {
    if (storeData[resourceId.type][resourceId.id]) {
        let newState = Object.assign({}, storeData);
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
const updateResourceState = (storeData, resourceId, resourceState, loading) => {
    if (isUndefined(storeData[resourceId.type]) ||
        isUndefined(storeData[resourceId.type][resourceId.id])) {
        if (resourceState === 'DELETED') {
            let newState = Object.assign({}, storeData);
            newState[resourceId.type] = Object.assign({}, newState[resourceId.type]);
            newState[resourceId.type][resourceId.id] = Object.assign({}, newState[resourceId.type][resourceId.id]);
            newState[resourceId.type][resourceId.id] = {
                type: resourceId.type,
                id: resourceId.id,
                persistedResource: null,
            };
            newState[resourceId.type][resourceId.id].state = 'NOT_LOADED';
            return newState;
        }
        else {
            return storeData;
        }
    }
    let newState = Object.assign({}, storeData);
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
const isEqualResource = (resource0, resource1) => {
    if (resource0 === resource1) {
        return true;
    }
    if (resource0 !== null !== (resource1 !== null)) {
        return false;
    }
    return (isEqual(resource0.id, resource1.id) &&
        isEqual(resource0.type, resource1.type) &&
        isEqual(resource0.attributes, resource1.attributes) &&
        isEqual(resource0.meta, resource1.meta) &&
        isEqual(resource0.links, resource1.links) &&
        isEqual(resource0.relationships, resource1.relationships));
};
const updateStoreResource = (state, resource, fromServer) => {
    let /** @type {?} */ foundStoreResource = state[resource.id];
    let /** @type {?} */ persistedResource = state[resource.id].persistedResource;
    let /** @type {?} */ newResource;
    let /** @type {?} */ newResourceState;
    if (fromServer) {
        // form server, override everything
        // TODO need to handle check and keep local updates?
        newResource = resource;
        persistedResource = resource;
        newResourceState = 'IN_SYNC';
    }
    else {
        let /** @type {?} */ mergedResource = updateResourceObject(foundStoreResource, resource);
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
    let /** @type {?} */ newState = Object.assign({}, state);
    newState[resource.id] = (Object.assign({}, newResource, { persistedResource: persistedResource, state: newResourceState, errors: [], loading: false }));
    return isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
const updateQueriesForDeletedResource = (state, deletedId) => {
    let /** @type {?} */ newState = state;
    for (let /** @type {?} */ queryId in state) {
        if (state.hasOwnProperty(queryId)) {
            let /** @type {?} */ queryState = state[queryId];
            if (queryState.query.id === deletedId.id &&
                queryState.query.type === deletedId.type) {
                // found a query for a resource that was deleted => modify to 404
                newState = clearQueryResult(newState, queryState.query.queryId);
                let /** @type {?} */ notFoundError = { code: '404', status: 'Not Found' };
                newState[queryState.query.queryId].errors = [notFoundError];
            }
        }
    }
    return newState;
};
const updateResourceErrorsForQuery = (storeData, query, document) => {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
const updateResourceErrors = (storeData, id, errors, modificationType) => {
    if (!storeData[id.type] || !storeData[id.type][id.id]) {
        return storeData;
    }
    let /** @type {?} */ newState = Object.assign({}, storeData);
    newState[id.type] = Object.assign({}, newState[id.type]);
    let /** @type {?} */ storeResource = Object.assign({}, newState[id.type][id.id]);
    if (modificationType === 'SET') {
        storeResource.errors = [];
        if (errors) {
            storeResource.errors.push(...errors);
        }
    }
    else if (modificationType === 'ADD') {
        let /** @type {?} */ currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            storeResource.errors.push(...currentErrors);
        }
        if (errors) {
            storeResource.errors.push(...errors);
        }
    }
    else {
        let /** @type {?} */ currentErrors = storeResource.errors;
        storeResource.errors = [];
        if (currentErrors) {
            for (let /** @type {?} */ currentError of currentErrors) {
                let /** @type {?} */ remove = errors && errors.filter(it => isEqual(it, currentError)).length > 0;
                if (!remove) {
                    storeResource.errors.push(currentError);
                }
            }
        }
    }
    newState[id.type][id.id] = storeResource;
    return newState;
};
/**
 * @param {?} newState
 * @param {?} type
 * @param {?} id
 * @return {?}
 */
function rollbackResource(newState, type, id) {
    let /** @type {?} */ storeResource = newState[type][id];
    if (!storeResource.persistedResource) {
        delete newState[type][id];
    }
    else if (storeResource.state !== 'IN_SYNC') {
        newState[type][id] = (Object.assign({}, newState[type][id], { state: 'IN_SYNC', resource: newState[type][id].persistedResource }));
    }
}
const rollbackStoreResources = (storeData, ids, include) => {
    let /** @type {?} */ newState = Object.assign({}, storeData);
    if (isUndefined(ids)) {
        Object.keys(newState).forEach(type => {
            newState[type] = Object.assign({}, newState[type]);
            Object.keys(newState[type]).forEach(id => {
                rollbackResource(newState, type, id);
            });
        });
    }
    else {
        let /** @type {?} */ modifiedResources = getPendingChanges(newState, ids, include, true);
        for (let /** @type {?} */ modifiedResource of modifiedResources) {
            rollbackResource(newState, modifiedResource.type, modifiedResource.id);
        }
    }
    return newState;
};
const deleteStoreResources = (storeData, query) => {
    let /** @type {?} */ newState = Object.assign({}, storeData);
    // if an id is not provided, all resources of the provided type will be deleted
    if (typeof query.id === 'undefined') {
        newState[query.type] = {};
    }
    else {
        newState[query.type] = (omit(newState[query.type], [
            query.id,
        ]));
    }
    return newState;
};
const clearQueryResult = (storeData, queryId) => {
    let /** @type {?} */ newQuery = Object.assign({}, storeData[queryId]);
    delete newQuery.resultIds;
    delete newQuery.errors;
    delete newQuery.meta;
    delete newQuery.links;
    let /** @type {?} */ newState = Object.assign({}, storeData);
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
const updateStoreDataFromResource = (storeData, resource, fromServer, override) => {
    if (isUndefined(storeData[resource.type])) {
        let newStoreData = Object.assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (isUndefined(storeData[resource.type][resource.id]) || override) {
        let updatedStoreResources = insertStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            let newStoreData = Object.assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
    else {
        let updatedStoreResources = updateStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            let newStoreData = Object.assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
};
const updateStoreDataFromPayload = (storeData, payload) => {
    let /** @type {?} */ data = (get(payload, 'data'));
    if (isUndefined(data)) {
        return storeData;
    }
    data = isArray(data) ? (data) : ([data]);
    let /** @type {?} */ included = (get(payload, 'included'));
    if (!isUndefined(included)) {
        data = [...data, ...included];
    }
    return (reduce(data, (result, resource) => {
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
const updateQueryParams = (storeQueries, query) => {
    if (!query.queryId) {
        return storeQueries;
    }
    let newStoreQuery = Object.assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = cloneDeep(query);
    if (isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    let newStoreQueries = Object.assign({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/**
 * Updates the query results for given a queryId and the results.
 */
const updateQueryResults = (storeQueries, queryId, document) => {
    let storeQuery = storeQueries[queryId];
    if (storeQuery) {
        let data = isArray(document.data) ? document.data : [document.data];
        let newQueryStore = Object.assign({}, storeQuery, { resultIds: data.map(it => (it ? toResourceIdentifier(it) : [])), meta: document.meta, links: document.links, loading: false });
        let newState = Object.assign({}, storeQueries);
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
const updateQueryErrors = (storeQueries, queryId, document) => {
    if (!queryId || !storeQueries[queryId]) {
        return storeQueries;
    }
    let newState = Object.assign({}, storeQueries);
    let newStoreQuery = Object.assign({}, newState[queryId]);
    newStoreQuery.errors = [];
    if (document.errors) {
        newStoreQuery.errors.push(...document.errors);
    }
    newState[queryId] = newStoreQuery;
    return newState;
};
/**
 * Removes a query given its queryId from the NgrxJsonApiStoreQueries.
 */
const removeQuery = (storeQueries, queryId) => {
    let newState = Object.assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/**
 * Given a resource, it will return an object containing the resource id and type.
 */
const toResourceIdentifier = (resource) => {
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
const getResourceFieldValueFromPath = (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) => {
    if (isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    let fields = path.split(pathSeparator);
    let currentStoreResource = baseStoreResource;
    for (let i = 0; i < fields.length; i++) {
        let definition = find(resourceDefinitions, {
            type: currentStoreResource.type,
        });
        if (isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (isUndefined(definition.attributes) &&
            isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            return get(currentStoreResource, 'attributes.' + fields[i], null);
        }
        else if (definition.relationships.hasOwnProperty(fields[i])) {
            if (i === fields.length - 1) {
                throw new Error('The last field in the filtering path cannot be a relation');
            }
            let resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                throw new Error('Cannot filter past a hasMany relation');
            }
            else {
                let relation = get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    let relatedPath = [resourceRelation.type, relation.data.id];
                    currentStoreResource = get(storeData, relatedPath);
                }
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
        if (isUndefined(currentStoreResource)) {
            return null;
        }
    }
};
const filterResources = (resources, storeData, query, resourceDefinitions, filteringConfig) => {
    return filter(resources, resource => {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(element => {
                let /** @type {?} */ pathSeparator;
                let /** @type {?} */ filteringOperators;
                if (!isUndefined(filteringConfig)) {
                    pathSeparator = (get(filteringConfig, 'pathSeparator'));
                    filteringOperators = (get(filteringConfig, 'filteringOperators'));
                }
                // resource type and attribute
                let /** @type {?} */ resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                let /** @type {?} */ operator = (find(filteringOperators, {
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
                        if (isString(element.value) && isString(resourceFieldValue)) {
                            return (element.value.toLowerCase() === resourceFieldValue.toLowerCase());
                        }
                        else {
                            return element.value === resourceFieldValue;
                        }
                    case 'exact':
                        return element.value === resourceFieldValue;
                    case 'contains':
                        return includes(resourceFieldValue, element.value);
                    case 'icontains':
                        return includes(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'in':
                        if (isArray(element.value)) {
                            return includes(element.value, resourceFieldValue);
                        }
                        else {
                            return includes([element.value], resourceFieldValue);
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
                        return startsWith(resourceFieldValue, element.value);
                    case 'istartswith':
                        return startsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'endswith':
                        return endsWith(resourceFieldValue, element.value);
                    case 'iendswith':
                        return endsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
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
const generateIncludedQueryParams = (included) => {
    if (isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
const generateFieldsQueryParams = (fields) => {
    if (isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
const generateFilteringQueryParams = (filtering) => {
    if (isEmpty(filtering)) {
        return '';
    }
    let /** @type {?} */ filteringParams = filtering.map(f => {
        return ('filter[' +
            f.path +
            ']' +
            (f.operator ? '[' + f.operator + ']' : '') +
            '=' +
            encodeURIComponent(f.value));
    });
    return filteringParams.join('&');
};
const generateSortingQueryParams = (sorting) => {
    if (isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(f => (f.direction === Direction.ASC ? '' : '-') + f.api)
            .join(','));
};
const generateQueryParams = (...params) => {
    let /** @type {?} */ newParams = params.filter(p => p !== '');
    if (newParams.length !== 0) {
        return '?' + newParams.join('&');
    }
    else {
        return '';
    }
};
const generatePayload = (resource, operation) => {
    let /** @type {?} */ payload = {
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
const uuid = () => {
    let /** @type {?} */ lut = [];
    for (let /** @type {?} */ i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    let /** @type {?} */ d0 = (Math.random() * 0xffffffff) | 0;
    let /** @type {?} */ d1 = (Math.random() * 0xffffffff) | 0;
    let /** @type {?} */ d2 = (Math.random() * 0xffffffff) | 0;
    let /** @type {?} */ d3 = (Math.random() * 0xffffffff) | 0;
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
const toKey = (id) => {
    return id.id + '@' + id.type;
};
const collectQueryResults = (state, usedResources) => {
    for (let /** @type {?} */ queryName in state.queries) {
        if (state.queries.hasOwnProperty(queryName)) {
            let /** @type {?} */ query = state.queries[queryName];
            if (query.resultIds) {
                for (let /** @type {?} */ resultId of query.resultIds) {
                    usedResources[toKey(resultId)] = true;
                }
            }
        }
    }
};
const collectPendingChanges = (state, usedResources) => {
    for (let /** @type {?} */ type in state.data) {
        if (state.data.hasOwnProperty(type)) {
            let /** @type {?} */ resources = state.data[type];
            for (let /** @type {?} */ id in resources) {
                if (resources.hasOwnProperty(id)) {
                    let /** @type {?} */ resource = resources[id];
                    if (resource.state !== 'IN_SYNC') {
                        usedResources[toKey(resource)] = true;
                    }
                }
            }
        }
    }
};
const collectReferencesForResource = (state, usedResources, resource) => {
    let /** @type {?} */ hasChanges;
    for (let /** @type {?} */ relationshipName in resource.relationships) {
        if (resource.relationships.hasOwnProperty(relationshipName)) {
            let /** @type {?} */ data = resource.relationships[relationshipName].data;
            if (data) {
                let /** @type {?} */ dependencyIds = data instanceof Array ? data : [data];
                for (let /** @type {?} */ dependencyId of dependencyIds) {
                    let /** @type {?} */ dependencyKey = toKey(dependencyId);
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
const collectReferences = (state, usedResources) => {
    while (true) {
        let /** @type {?} */ hasChanges = false;
        for (let /** @type {?} */ type in state.data) {
            if (state.data.hasOwnProperty(type)) {
                let /** @type {?} */ resources = state.data[type];
                for (let /** @type {?} */ id in resources) {
                    if (resources.hasOwnProperty(id)) {
                        let /** @type {?} */ resource = resources[id];
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
const sweepUnusedResources = (state, usedResources) => {
    let /** @type {?} */ hasDeletions = false;
    let /** @type {?} */ newState = cloneDeep(state);
    for (let /** @type {?} */ type in newState.data) {
        if (newState.data.hasOwnProperty(type)) {
            let /** @type {?} */ resources = newState.data[type];
            for (let /** @type {?} */ id in resources) {
                if (resources.hasOwnProperty(id)) {
                    let /** @type {?} */ resource = resources[id];
                    if (!usedResources[toKey(resource)]) {
                        hasDeletions = true;
                        delete resources[id];
                    }
                }
            }
            if (isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
const compactStore = (state) => {
    let /** @type {?} */ usedResources = {};
    // query results can not be collected
    collectQueryResults(state, usedResources);
    // pending changes cannot be collected
    collectPendingChanges(state, usedResources);
    // references from non-collected objects cannot be collected as well
    collectReferences(state, usedResources);
    // remove everything that is not collected
    return sweepUnusedResources(state, usedResources);
};
const sortPendingChanges = (pendingResources) => {
    // allocate dependency
    let /** @type {?} */ dependencies = {};
    let /** @type {?} */ pendingMap = {};
    for (let /** @type {?} */ pendingResource of pendingResources) {
        let /** @type {?} */ resource = pendingResource;
        let /** @type {?} */ key = toKey(resource);
        dependencies[key] = [];
        pendingMap[key] = pendingResource;
    }
    // extract dependencies
    for (let /** @type {?} */ pendingResource of pendingResources) {
        let /** @type {?} */ resource = pendingResource;
        if (resource.relationships) {
            let /** @type {?} */ key = toKey(resource);
            Object.keys(resource.relationships).forEach(relationshipName => {
                let /** @type {?} */ data = resource.relationships[relationshipName].data;
                if (data) {
                    let /** @type {?} */ dependencyIds = data instanceof Array ? data : [data];
                    for (let /** @type {?} */ dependencyId of dependencyIds) {
                        let /** @type {?} */ dependencyKey = toKey(dependencyId);
                        if (pendingMap[dependencyKey] &&
                            pendingMap[dependencyKey].state === 'CREATED') {
                            // we have a dependency between two unsaved objects
                            dependencies[key].push(pendingMap[dependencyKey]);
                        }
                    }
                }
            });
        }
    }
    // order
    let /** @type {?} */ context = {
        pendingResources: pendingResources,
        cursor: pendingResources.length,
        sorted: new Array(pendingResources.length),
        dependencies: dependencies,
        visited: /** @type {?} */ ([]),
    };
    let /** @type {?} */ i = context.cursor;
    while (i--) {
        if (!context.visited[i]) {
            visitPending(pendingResources[i], i, [], context);
        }
    }
    return context.sorted;
};
const visitPending = (pendingResource, i, predecessors, context) => {
    let /** @type {?} */ key = toKey(pendingResource);
    if (predecessors.indexOf(key) >= 0) {
        throw new Error('Cyclic dependency: ' + key + ' with ' + JSON.stringify(predecessors));
    }
    if (context.visited[i]) {
        return;
    }
    context.visited[i] = true;
    // outgoing edges
    let /** @type {?} */ outgoing = context.dependencies[key];
    let /** @type {?} */ preds = predecessors.concat(key);
    for (let /** @type {?} */ child of outgoing) {
        visitPending(child, context.pendingResources.indexOf(child), preds, context);
    }
    context.sorted[--context.cursor] = pendingResource;
};
/**
 * @param {?} state
 * @param {?} pending
 * @param {?} id
 * @param {?} include
 * @param {?} includeNew
 * @return {?}
 */
function collectPendingChange(state, pending, id, include, includeNew) {
    let /** @type {?} */ storeResource = state[id.type][id.id];
    if (storeResource.state !== 'IN_SYNC' &&
        (storeResource.state !== 'NEW' || includeNew)) {
        pending.push(storeResource);
    }
    for (let /** @type {?} */ includeElement of include) {
        if (includeElement.length > 0) {
            let /** @type {?} */ relationshipName = includeElement[0];
            if (storeResource.relationships &&
                storeResource.relationships[relationshipName]) {
                let /** @type {?} */ data = storeResource.relationships[relationshipName].data;
                if (data) {
                    let /** @type {?} */ relationInclude = [];
                    include
                        .filter(relIncludeElem => relIncludeElem.length >= 2 &&
                        relIncludeElem[0] == relationshipName)
                        .forEach(relIncludeElem => relationInclude.push(relIncludeElem.slice(1)));
                    if (isArray(data)) {
                        let /** @type {?} */ relationIds = (data);
                        relationIds.forEach(relationId => collectPendingChange(state, pending, relationId, relationInclude, includeNew));
                    }
                    else {
                        let /** @type {?} */ relationId = (data);
                        collectPendingChange(state, pending, relationId, relationInclude, includeNew);
                    }
                }
            }
        }
    }
}
/**
 * @param {?} state
 * @param {?} ids
 * @param {?} include
 * @param {?=} includeNew
 * @return {?}
 */
function getPendingChanges(state, ids, include, includeNew) {
    let /** @type {?} */ pending = [];
    if (isUndefined(ids)) {
        // check all
        Object.keys(state).forEach(type => {
            Object.keys(state[type]).forEach(id => {
                let /** @type {?} */ storeResource = state[type][id];
                if (storeResource.state !== 'IN_SYNC' &&
                    (storeResource.state !== 'NEW' || includeNew)) {
                    pending.push(storeResource);
                }
            });
        });
    }
    else {
        let /** @type {?} */ relationshipInclusions = [];
        if (include) {
            for (let /** @type {?} */ includeElement of include) {
                relationshipInclusions.push(includeElement.split('.'));
            }
        }
        for (let /** @type {?} */ id of ids) {
            collectPendingChange(state, pending, id, relationshipInclusions, includeNew);
        }
        pending = uniqBy(pending, function (e) {
            return e.type + '####' + e.id;
        });
    }
    return pending;
}

class NgrxJsonApiService {
    /**
     * @param {?} store
     * @param {?} selectors
     */
    constructor(store, selectors) {
        this.store = store;
        this.selectors = selectors;
        this.test = true;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    findOne(options) {
        return (this.findInternal(options, false));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    findMany(options) {
        return (this.findInternal(options, true));
    }
    /**
     * @return {?}
     */
    get storeSnapshot() {
        if (!this._storeSnapshot) {
            this.store
                .let(this.selectors.getNgrxJsonApiStore$())
                .subscribe(it => (this._storeSnapshot = (it)));
            if (!this._storeSnapshot) {
                throw new Error('failed to initialize store snapshot');
            }
        }
        return this._storeSnapshot;
    }
    /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
    putQuery(options) {
        let /** @type {?} */ query = options.query;
        let /** @type {?} */ fromServer = isUndefined(options.fromServer)
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
    }
    /**
     * @param {?} queryId
     * @return {?}
     */
    refreshQuery(queryId) {
        this.store.dispatch(new ApiQueryRefreshAction(queryId));
    }
    /**
     * @param {?} queryId
     * @return {?}
     */
    removeQuery(queryId) {
        this.store.dispatch(new RemoveQueryAction(queryId));
    }
    /**
     * @param {?} options
     * @param {?} multi
     * @return {?}
     */
    findInternal(options, multi) {
        let /** @type {?} */ query = options.query;
        let /** @type {?} */ fromServer = isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        let /** @type {?} */ denormalise = isUndefined(options.denormalise)
            ? false
            : options.denormalise;
        let /** @type {?} */ newQuery;
        if (!query.queryId) {
            newQuery = Object.assign({}, query, { queryId: this.uuid() });
        }
        else {
            newQuery = query;
        }
        this.putQuery({ query: newQuery, fromServer });
        let /** @type {?} */ queryResult$;
        if (multi) {
            queryResult$ = this.selectManyResults(newQuery.queryId, denormalise);
        }
        else {
            queryResult$ = this.selectOneResults(newQuery.queryId, denormalise);
        }
        return (queryResult$.finally(() => this.removeQuery(newQuery.queryId)));
    }
    /**
     * @return {?}
     */
    uuid() {
        return uuid();
    }
    /**
     * Gets the current persisted state of the given resources.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    getPersistedResourceSnapshot(identifier) {
        let /** @type {?} */ snapshot = this.storeSnapshot;
        if (snapshot.data[identifier.type] &&
            snapshot.data[identifier.type][identifier.id]) {
            return snapshot.data[identifier.type][identifier.id].persistedResource;
        }
        return null;
    }
    /**
     * Gets the current state of the given resources in the store.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param {?} identifier
     * @return {?}
     */
    getResourceSnapshot(identifier) {
        let /** @type {?} */ snapshot = this.storeSnapshot;
        if (snapshot.data[identifier.type] &&
            snapshot.data[identifier.type][identifier.id]) {
            return snapshot.data[identifier.type][identifier.id];
        }
        return null;
    }
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    selectManyResults(queryId, denormalize = false) {
        let /** @type {?} */ queryResult$ = this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getManyResults$(queryId, denormalize));
        return queryResult$;
    }
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    selectOneResults(queryId, denormalize = false) {
        let /** @type {?} */ queryResult$ = this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getOneResult$(queryId, denormalize));
        return (queryResult$);
    }
    /**
     * @param {?} identifier of the resource
     * @return {?} observable of the resource
     */
    selectStoreResource(identifier) {
        return this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreResource$(identifier));
    }
    /**
     * @param {?} storeResource$
     * @return {?}
     */
    denormaliseResource(storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreData$()), (storeResource, storeData) => {
            if (isArray(storeResource)) {
                return denormaliseStoreResources(/** @type {?} */ (storeResource), storeData);
            }
            else {
                let /** @type {?} */ resource = (storeResource);
                return (denormaliseStoreResource(resource, storeData));
            }
        }));
    }
    /**
     * @param {?} path
     * @param {?} resourceType
     * @return {?}
     */
    getDenormalisedPath(path, resourceType) {
        let /** @type {?} */ pathSeparator = (get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.selectors.config.resourceDefinitions, pathSeparator);
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    getDenormalisedValue(path, storeResource) {
        let /** @type {?} */ pathSeparator = (get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedValue(path, storeResource, this.selectors.config.resourceDefinitions, pathSeparator);
    }
    /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    patchResource(options) {
        let /** @type {?} */ resource = options.resource;
        let /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPatchInitAction(resource));
        }
        else {
            this.store.dispatch(new PatchStoreResourceAction(resource));
        }
    }
    /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param {?} options
     * @return {?}
     */
    newResource(options) {
        let /** @type {?} */ resource = options.resource;
        this.store.dispatch(new NewStoreResourceAction(resource));
    }
    /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    postResource(options) {
        let /** @type {?} */ resource = options.resource;
        let /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPostInitAction(resource));
        }
        else {
            this.store.dispatch(new PostStoreResourceAction(resource));
        }
    }
    /**
     * Marks the given resource for deletion.
     *
     * @param {?} options
     * @return {?}
     */
    deleteResource(options) {
        let /** @type {?} */ resourceId = options.resourceId;
        let /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiDeleteInitAction(resourceId));
        }
        else {
            this.store.dispatch(new DeleteStoreResourceAction(resourceId));
        }
    }
    /**
     * Applies all pending changes to the remote JSON API endpoint.
     * @return {?}
     */
    apply() {
        this.store.dispatch(new ApiApplyInitAction({}));
    }
    /**
     * Clear all the contents from the store.
     * @return {?}
     */
    clear() {
        this.store.dispatch(new ClearStoreAction());
    }
    /**
     * Compacts the store by removing unreferences and unchanges resources.
     * @return {?}
     */
    compact() {
        this.store.dispatch(new CompactStoreAction());
    }
    /**
     * Adds the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    addResourceErrors(id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'ADD',
        }));
    }
    /**
     * Removes the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    removeResourceErrors(id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'REMOVE',
        }));
    }
    /**
     * Sets the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    setResourceErrors(id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'SET',
        }));
    }
}

class SelectStoreResourcePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    transform(id) {
        return this.service.selectStoreResource(id);
    }
}
SelectStoreResourcePipe.decorators = [
    { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
];
/**
 * @nocollapse
 */
SelectStoreResourcePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];
class DenormaliseStoreResourcePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    transform(obs) {
        return this.service.denormaliseResource(obs);
    }
}
DenormaliseStoreResourcePipe.decorators = [
    { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
];
/**
 * @nocollapse
 */
DenormaliseStoreResourcePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];
class GetDenormalisedValuePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    transform(path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    }
}
GetDenormalisedValuePipe.decorators = [
    { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
];
/**
 * @nocollapse
 */
GetDenormalisedValuePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
class NgrxJsonApi {
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
        let /** @type {?} */ definition = find(this.definitions, { type: type });
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
        if (query.hasOwnProperty('params') && !isEmpty(query.params)) {
            if (hasIn(query.params, 'include')) {
                includedParam = _generateIncludedQueryParams(query.params.include);
            }
            if (hasIn(query.params, 'filtering')) {
                filteringParams = _generateFilteringQueryParams(query.params.filtering);
            }
            if (hasIn(query.params, 'sorting')) {
                sortingParams = _generateSortingQueryParams(query.params.sorting);
            }
            if (hasIn(query.params, 'fields')) {
                fieldsParams = _generateFieldsQueryParams(query.params.fields);
            }
            if (hasIn(query.params, 'limit')) {
                limitParams = 'page[limit]=' + query.params.limit;
            }
            if (hasIn(query.params, 'offset')) {
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
        let /** @type {?} */ newRequestOptions = Object.assign({}, requestOptions, { headers: this.headers, observe: 'response' });
        if (requestOptions.method === 'GET') {
            let { method, url } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url"]);
            return this.http.get(url, init);
        }
        else if (requestOptions.method === 'POST') {
            let { method, url, body } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url", "body"]);
            return this.http.post(url, body, init);
        }
        else if (requestOptions.method === 'PATCH') {
            let { method, url, body } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url", "body"]);
            return this.http.patch(url, body, init);
        }
        else if (requestOptions.method === 'DELETE') {
            let { method, url } = newRequestOptions, init = __rest(newRequestOptions, ["method", "url"]);
            return this.http.delete(url, init);
        }
    }
}

/**
 * @param {?} state$
 * @return {?}
 */
function getNgrxJsonApiStore(state$) {
    return state$.select('NgrxJsonApi').filter(it => !isUndefined(it)).map(it => it.api);
}
class NgrxJsonApiSelectors {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * @return {?}
     */
    getNgrxJsonApiStore$() {
        return (state$) => {
            // note that upon setup the store may not yet be initialized
            return state$.select('NgrxJsonApi').filter(it => !isUndefined(it)).map(it => it.api);
        };
    }
    /**
     * @return {?}
     */
    getStoreData$() {
        return (state$) => {
            return state$.select('data');
        };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getStoreResourceOfType$(type) {
        return (state$) => {
            return state$
                .let(this.getStoreData$())
                .map(resources => (resources ? resources[type] : undefined));
        };
    }
    /**
     * @param {?} query
     * @return {?}
     */
    queryStore$(query) {
        return (state$) => {
            let /** @type {?} */ selected$;
            if (!query.type) {
                return state$.map(() => Observable.throw('Unknown query'));
            }
            else if (query.type && query.id) {
                selected$ = state$.let(this.getStoreResource$({ type: query.type, id: query.id }));
            }
            else {
                selected$ = state$
                    .let(this.getStoreResourceOfType$(query.type))
                    .combineLatest(state$.let(this.getStoreData$()), (resources, storeData) => filterResources(resources, storeData, query, this.config.resourceDefinitions, this.config.filteringConfig));
            }
            return selected$.distinctUntilChanged();
        };
    }
    /**
     * @return {?}
     */
    getStoreQueries$() {
        return (state$) => {
            return state$.select('queries');
        };
    }
    /**
     * @param {?} queryId
     * @return {?}
     */
    getResourceQuery$(queryId) {
        return (state$) => {
            return state$
                .let(this.getStoreQueries$())
                .map(it => (it ? it[queryId] : undefined));
        };
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    getStoreResource$(identifier) {
        return (state$) => {
            return state$
                .let(this.getStoreResourceOfType$(identifier.type))
                .map(resources => ((resources ? resources[identifier.id] : undefined)));
        };
    }
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    getManyResults$(queryId, denormalize) {
        return (state$) => {
            return state$.map(state => {
                let /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (isEmpty(storeQuery.resultIds)) {
                    let /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: isUndefined(storeQuery.resultIds) ? undefined : [] });
                    return queryResult;
                }
                else {
                    let /** @type {?} */ results = storeQuery.resultIds.map(id => (state.data[id.type] ? state.data[id.type][id.id] : undefined));
                    if (denormalize) {
                        results = denormaliseStoreResources(results, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: /** @type {?} */ (results) });
                }
            });
        };
    }
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    getOneResult$(queryId, denormalize) {
        return (state$) => {
            return state$.map(state => {
                let /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (isEmpty(storeQuery.resultIds)) {
                    let /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: isUndefined(storeQuery.resultIds) ? undefined : null });
                    return queryResult;
                }
                else {
                    if (storeQuery.resultIds.length >= 2) {
                        throw new Error('expected single result for query ' + storeQuery.query.queryId);
                    }
                    let /** @type {?} */ resultId = storeQuery.resultIds[0];
                    let /** @type {?} */ result = state.data[resultId.type]
                        ? state.data[resultId.type][resultId.id]
                        : undefined;
                    if (denormalize) {
                        result = denormaliseStoreResource(result, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: result });
                }
            });
        };
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    getPersistedResource$(identifier) {
        return (state$) => {
            return state$
                .let(this.getStoreResource$(identifier))
                .map(it => (it ? it.persistedResource : undefined));
        };
    }
}

class NgrxJsonApiEffects {
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
                        let /** @type {?} */ needsRefresh = findIndex(query.resultIds, function (o) {
                            return isEqual(id, o);
                        }) !== -1;
                        let /** @type {?} */ sameIdRequested = query.query.id === id.id && query.query.type === id.type;
                        if (sameIdRequested && (needsRefresh || isEmpty(query.errors))) {
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
            .withLatestFrom(this.store.let(getNgrxJsonApiStore), (action, ngrxstore) => {
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
        return this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .map(action => (action))
            .filter(action => query.queryId == action.payload.queryId);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    removeQueryEventFor(query) {
        return this.actions$
            .ofType(NgrxJsonApiActionTypes.REMOVE_QUERY)
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

const initialNgrxJsonApiState = {
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
function NgrxJsonApiStoreReducer(state = initialNgrxJsonApiState, action) {
    let /** @type {?} */ newState;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            newState = Object.assign({}, state, { data: updatedData, isCreating: state.isCreating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            let /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query), isReading: state.isReading + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
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
            let /** @type {?} */ queryId = (action.payload);
            newState = Object.assign({}, state, { queries: removeQuery(state.queries, queryId) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            let /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query) });
            return newState;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            let /** @type {?} */ payload = (action.payload);
            newState = Object.assign({}, state, { data: updateResourceErrors(state.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            newState = Object.assign({}, state, { queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData) });
            return newState;
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
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
            let /** @type {?} */ resourceId = (action.payload);
            if (state.data[resourceId.type] &&
                state.data[resourceId.type][resourceId.id]) {
                let /** @type {?} */ resource = state.data[resourceId.type][resourceId.id];
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
            let /** @type {?} */ payload = ((action)).payload;
            let /** @type {?} */ pending = getPendingChanges(state.data, payload.ids, payload.include);
            newState = Object.assign({}, state, { isApplying: state.isApplying + 1 });
            for (let /** @type {?} */ pendingChange of pending) {
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
            let /** @type {?} */ actions = (action.payload);
            newState = state;
            for (let /** @type {?} */ commitAction of actions) {
                newState = NgrxJsonApiStoreReducer(newState, commitAction);
            }
            newState = Object.assign({}, newState, { isApplying: state['isApplying'] - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            let /** @type {?} */ payload = ((action)).payload;
            newState = Object.assign({}, state, { data: rollbackStoreResources(state.data, payload.ids, payload.include) });
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
const reducer = {
    api: NgrxJsonApiStoreReducer,
};

const NGRX_JSON_API_CONFIG = new OpaqueToken('NGRX_JSON_API_CONFIG');
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
            deps: [HttpClient, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
            deps: [NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [Store, NgrxJsonApiSelectors],
        },
        {
            provide: NGRX_JSON_API_CONFIG,
            useValue: config,
        },
    ];
}
class NgrxJsonApiModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static configure(config) {
        return {
            ngModule: NgrxJsonApiModule,
            providers: configure(config),
        };
    }
}
NgrxJsonApiModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DenormaliseStoreResourcePipe,
                    GetDenormalisedValuePipe,
                    SelectStoreResourcePipe,
                ],
                imports: [
                    EffectsModule.forFeature([NgrxJsonApiEffects]),
                    StoreModule.forFeature('NgrxJsonApi', reducer, {}),
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
NgrxJsonApiModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { SelectStoreResourcePipe, DenormaliseStoreResourcePipe, GetDenormalisedValuePipe, NgrxJsonApiService, NgrxJsonApiModule, NGRX_JSON_API_CONFIG, uuid, Direction, NgrxJsonApiActionTypes, ApiApplyInitAction, ApiApplySuccessAction, ApiApplyFailAction, ApiPostInitAction, ApiPostSuccessAction, ApiPostFailAction, ApiDeleteInitAction, ApiDeleteSuccessAction, ApiDeleteFailAction, ApiGetInitAction, ApiGetSuccessAction, ApiGetFailAction, ApiRollbackAction, ApiPatchInitAction, ApiPatchSuccessAction, ApiPatchFailAction, DeleteStoreResourceAction, PatchStoreResourceAction, NewStoreResourceAction, PostStoreResourceAction, RemoveQueryAction, LocalQueryInitAction, LocalQuerySuccessAction, LocalQueryFailAction, CompactStoreAction, ClearStoreAction, ApiQueryRefreshAction, ModifyStoreResourceErrorsAction, getNgrxJsonApiStore, NgrxJsonApiSelectors, NgrxJsonApi as ɵf, NgrxJsonApiEffects as ɵe, apiFactory as ɵa, configure as ɵd, selectorsFactory as ɵb, serviceFactory as ɵc, NgrxJsonApiStoreReducer as ɵg, reducer as ɵh };
//# sourceMappingURL=ngrx-json-api.js.map
