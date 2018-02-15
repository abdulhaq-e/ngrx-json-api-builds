import { Injectable, InjectionToken, NgModule, Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { clone, cloneDeep, endsWith, filter, find, findIndex, get, hasIn, includes, isArray, isEmpty, isEqual, isString, isUndefined, keys, mergeWith, omit, setWith, startsWith, uniqBy } from 'lodash/index';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/zip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { Actions, Effect, EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/takeUntil';
var NGRX_JSON_API_DEFAULT_ZONE = 'default';
var Direction = {};
Direction.ASC = 0;
Direction.DESC = 1;
Direction[Direction.ASC] = "ASC";
Direction[Direction.DESC] = "DESC";
var __assign$2 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @param {?} state
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setIn(state, path, value) {
    var /** @type {?} */ currentValue = get(state, path);
    if (value === currentValue) {
        return state;
    }
    return setWith(clone(state), path, value, function (nsValue, key, nsObject) {
        var /** @type {?} */ newObject = clone(nsObject);
        newObject[key] = nsValue;
        return newObject;
    });
}
var denormaliseObject = function (resource, storeData, bag, denormalizePersisted) {
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    // this function MUST MUTATE resource
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(function (relationshipName) {
            var /** @type {?} */ orginalRelationship = resource.relationships[relationshipName];
            var /** @type {?} */ data = orginalRelationship.data;
            if (!isUndefined(data)) {
                var /** @type {?} */ denormalizedRelation = void 0;
                if (data === null) {
                    denormalizedRelation = data;
                }
                else if (!isArray(data)) {
                    // one relation
                    var /** @type {?} */ relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                    denormalizedRelation = denormaliseStoreResource(relatedRS, storeData, bag, denormalizePersisted);
                }
                else if (((data)).length == 0) {
                    denormalizedRelation = data;
                }
                else {
                    // many relation
                    var /** @type {?} */ relatedRSs = getMultipleStoreResource(/** @type {?} */ (data), storeData);
                    denormalizedRelation = relatedRSs.map(function (r) {
                        return denormaliseStoreResource(r, storeData, bag, denormalizePersisted);
                    });
                }
                var /** @type {?} */ relationship = __assign$2({}, orginalRelationship);
                relationship['reference'] = denormalizedRelation;
                resource.relationships[relationshipName] = relationship;
            }
        });
    }
    return resource;
};
var denormaliseStoreResources = function (items, storeData, bag, denormalizePersisted) {
    if (bag === void 0) {
        bag = {};
    }
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    var /** @type {?} */ results = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        results.push(denormaliseStoreResource(item, storeData, bag, denormalizePersisted));
    }
    return results;
};
var denormaliseStoreResource = function (item, storeData, bag, denormalizePersisted) {
    if (bag === void 0) {
        bag = {};
    }
    if (denormalizePersisted === void 0) {
        denormalizePersisted = false;
    }
    if (!item) {
        return null;
    }
    if (isUndefined(bag[item.type])) {
        bag[item.type] = {};
    }
    if (isUndefined(bag[item.type][item.id])) {
        var /** @type {?} */ storeResource = __assign$2({}, item);
        if (item.relationships) {
            storeResource.relationships = __assign$2({}, item.relationships);
        }
        bag[storeResource.type][storeResource.id] = storeResource;
        storeResource = denormaliseObject(storeResource, storeData, bag, denormalizePersisted);
        if (storeResource.persistedResource && denormalizePersisted) {
            storeResource.persistedResource = denormaliseObject(storeResource.persistedResource, storeData, bag, denormalizePersisted);
        }
    }
    return bag[item.type][item.id];
};
var getSingleStoreResource = function (resourceId, storeData) {
    return get(storeData, [resourceId.type, resourceId.id], null);
};
var getMultipleStoreResource = function (resourceIds, resources) {
    return resourceIds.map(function (id) { return getSingleStoreResource(id, resources); });
};
var getDenormalisedPath = function (path, baseResourceType, resourceDefinitions, pathSeparator) {
    var /** @type {?} */ denormPath = [];
    if (isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var /** @type {?} */ fields = path.split(pathSeparator);
    var /** @type {?} */ currentResourceType = baseResourceType;
    for (var /** @type {?} */ i = 0; i < fields.length; i++) {
        var /** @type {?} */ definition = find(resourceDefinitions, { type: currentResourceType });
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
    return get(storeResource, denormalisedPath);
};
/**
 * Given two objects, it will merge the second in the first.
 *
 */
var updateResourceObject = function (original, source) {
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
var insertStoreResource = function (storeResources, resource, fromServer) {
    var newStoreResources = __assign$2({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = __assign$2({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false });
    }
    else {
        newStoreResources[resource.id] = __assign$2({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false });
    }
    return isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
var removeStoreResource = function (storeData, resourceId) {
    if (storeData[resourceId.type][resourceId.id]) {
        var newState = __assign$2({}, storeData);
        newState[resourceId.type] = __assign$2({}, newState[resourceId.type]);
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
 * @return
 */
var updateResourceState = function (storeData, resourceId, resourceState, loading) {
    if (isUndefined(storeData[resourceId.type]) ||
        isUndefined(storeData[resourceId.type][resourceId.id])) {
        if (resourceState === 'DELETED') {
            var newState_1 = __assign$2({}, storeData);
            newState_1[resourceId.type] = __assign$2({}, newState_1[resourceId.type]);
            newState_1[resourceId.type][resourceId.id] = __assign$2({}, newState_1[resourceId.type][resourceId.id]);
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
    var newState = __assign$2({}, storeData);
    newState[resourceId.type] = __assign$2({}, newState[resourceId.type]);
    newState[resourceId.type][resourceId.id] = __assign$2({}, newState[resourceId.type][resourceId.id]);
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
 * @return
 */
var isEqualResource = function (resource0, resource1) {
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
    var /** @type {?} */ newState = __assign$2({}, state);
    newState[resource.id] = (__assign$2({}, newResource, { persistedResource: persistedResource, state: newResourceState, errors: [], loading: false }));
    return isEqual(newState[resource.id], state[resource.id])
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
    var /** @type {?} */ newState = __assign$2({}, storeData);
    newState[id.type] = __assign$2({}, newState[id.type]);
    var /** @type {?} */ storeResource = __assign$2({}, newState[id.type][id.id]);
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
                var /** @type {?} */ remove = errors && errors.filter(function (it) { return isEqual(it, currentError); }).length > 0;
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
/**
 * @param {?} newState
 * @param {?} type
 * @param {?} id
 * @return {?}
 */
function rollbackResource(newState, type, id) {
    var /** @type {?} */ storeResource = newState[type][id];
    if (!storeResource.persistedResource) {
        delete newState[type][id];
    }
    else if (storeResource.state !== 'IN_SYNC') {
        newState[type][id] = (__assign$2({}, newState[type][id], { state: 'IN_SYNC', resource: newState[type][id].persistedResource }));
    }
}
var rollbackStoreResources = function (storeData, ids, include) {
    var /** @type {?} */ newState = __assign$2({}, storeData);
    if (isUndefined(ids)) {
        Object.keys(newState).forEach(function (type) {
            newState[type] = __assign$2({}, newState[type]);
            Object.keys(newState[type]).forEach(function (id) {
                rollbackResource(newState, type, id);
            });
        });
    }
    else {
        var /** @type {?} */ modifiedResources = getPendingChanges(newState, ids, include, true);
        for (var _i = 0, modifiedResources_1 = modifiedResources; _i < modifiedResources_1.length; _i++) {
            var modifiedResource = modifiedResources_1[_i];
            rollbackResource(newState, modifiedResource.type, modifiedResource.id);
        }
    }
    return newState;
};
var deleteStoreResources = function (storeData, query) {
    var /** @type {?} */ newState = __assign$2({}, storeData);
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
var clearQueryResult = function (storeData, queryId) {
    var /** @type {?} */ newQuery = __assign$2({}, storeData[queryId]);
    delete newQuery.resultIds;
    delete newQuery.errors;
    delete newQuery.meta;
    delete newQuery.links;
    var /** @type {?} */ newState = __assign$2({}, storeData);
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
    if (isUndefined(storeData[resource.type])) {
        var newStoreData = __assign$2({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (isUndefined(storeData[resource.type][resource.id]) || override) {
        var updatedStoreResources = insertStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = __assign$2({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
    else {
        var updatedStoreResources = updateStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = __assign$2({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
};
var updateStoreDataFromPayload = function (storeData, payload) {
    var /** @type {?} */ data = (get(payload, 'data'));
    if (isUndefined(data)) {
        return storeData;
    }
    var /** @type {?} */ resources = isArray(data) ? (data) : ([data]);
    var /** @type {?} */ included = (get(payload, 'included'));
    if (!isUndefined(included)) {
        resources = resources.concat(included);
    }
    var /** @type {?} */ newStoreData = __assign$2({}, storeData);
    var /** @type {?} */ hasChange = false;
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        var /** @type {?} */ storeResource = (__assign$2({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false }));
        if (!isEqual(storeResource, resource)) {
            hasChange = true;
            if (!newStoreData[resource.type]) {
                newStoreData[resource.type] = {};
            }
            else if (newStoreData[resource.type] === storeData[resource.type]) {
                newStoreData[resource.type] = __assign$2({}, storeData[resource.type]);
            }
            newStoreData[resource.type][resource.id] = storeResource;
        }
    }
    return hasChange ? newStoreData : storeData;
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
    var newStoreQuery = __assign$2({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = cloneDeep(query);
    if (isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    var newStoreQueries = __assign$2({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/**
 * Updates the query results for given a queryId and the results.
 */
var updateQueryResults = function (storeQueries, queryId, document) {
    var storeQuery = storeQueries[queryId];
    if (storeQuery) {
        var data = isArray(document.data) ? document.data : [document.data];
        var newQueryStore = __assign$2({}, storeQuery, { resultIds: data.map(function (it) { return (it ? toResourceIdentifier(it) : []); }), meta: document.meta, links: document.links, loading: false });
        if (!isEqual(newQueryStore, storeQuery)) {
            var newState = __assign$2({}, storeQueries);
            newState[queryId] = newQueryStore;
            return newState;
        }
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
    var newState = __assign$2({}, storeQueries);
    var newStoreQuery = __assign$2({}, newState[queryId]);
    newStoreQuery.errors = [];
    newStoreQuery.loading = false;
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
    var newState = __assign$2({}, storeQueries);
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
    if (isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var fields = path.split(pathSeparator);
    var currentStoreResource = baseStoreResource;
    for (var i = 0; i < fields.length; i++) {
        var definition = find(resourceDefinitions, {
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
        if (fields[i] === 'id') {
            return get(currentStoreResource, 'id', null);
        }
        else if (definition.attributes.hasOwnProperty(fields[i])) {
            return get(currentStoreResource, 'attributes.' + fields[i], null);
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
                var relation = get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    var relatedPath = [resourceRelation.type, relation.data.id];
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
var filterResources = function (resources, storeData, query, resourceDefinitions, filteringConfig) {
    return filter(resources, function (resource) {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(function (element) {
                var /** @type {?} */ pathSeparator;
                var /** @type {?} */ filteringOperators;
                if (!isUndefined(filteringConfig)) {
                    pathSeparator = (get(filteringConfig, 'pathSeparator'));
                    filteringOperators = (get(filteringConfig, 'filteringOperators'));
                }
                // resource type and attribute
                var /** @type {?} */ resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                var /** @type {?} */ operator = (find(filteringOperators, {
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
var generateIncludedQueryParams = function (included) {
    if (isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
var generateFieldsQueryParams = function (fields) {
    if (isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
var generateFilteringQueryParams = function (filtering) {
    if (isEmpty(filtering)) {
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
    if (isEmpty(sorting)) {
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
    var /** @type {?} */ newState = cloneDeep(state);
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
            if (isEmpty(resources)) {
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
 * @param {?} pending
 * @param {?} id
 * @param {?} include
 * @param {?} includeNew
 * @return {?}
 */
function collectPendingChange(state, pending, id, include, includeNew) {
    var /** @type {?} */ storeResource = state[id.type][id.id];
    if (storeResource.state !== 'IN_SYNC' &&
        (storeResource.state !== 'NEW' || includeNew)) {
        pending.push(storeResource);
    }
    var _loop_3 = function (includeElement) {
        if (includeElement.length > 0) {
            var /** @type {?} */ relationshipName_1 = includeElement[0];
            if (storeResource.relationships &&
                storeResource.relationships[relationshipName_1]) {
                var /** @type {?} */ data = storeResource.relationships[relationshipName_1].data;
                if (data) {
                    var /** @type {?} */ relationInclude_1 = [];
                    include
                        .filter(function (relIncludeElem) {
                        return relIncludeElem.length >= 2 &&
                            relIncludeElem[0] == relationshipName_1;
                    })
                        .forEach(function (relIncludeElem) {
                        return relationInclude_1.push(relIncludeElem.slice(1));
                    });
                    if (isArray(data)) {
                        var /** @type {?} */ relationIds = (data);
                        relationIds.forEach(function (relationId) {
                            return collectPendingChange(state, pending, relationId, relationInclude_1, includeNew);
                        });
                    }
                    else {
                        var /** @type {?} */ relationId = (data);
                        collectPendingChange(state, pending, relationId, relationInclude_1, includeNew);
                    }
                }
            }
        }
    };
    for (var _i = 0, include_1 = include; _i < include_1.length; _i++) {
        var includeElement = include_1[_i];
        _loop_3(/** @type {?} */ includeElement);
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
    var /** @type {?} */ pending = [];
    if (isUndefined(ids)) {
        // check all
        Object.keys(state).forEach(function (type) {
            Object.keys(state[type]).forEach(function (id) {
                var /** @type {?} */ storeResource = state[type][id];
                if (storeResource.state !== 'IN_SYNC' &&
                    (storeResource.state !== 'NEW' || includeNew)) {
                    pending.push(storeResource);
                }
            });
        });
    }
    else {
        var /** @type {?} */ relationshipInclusions = [];
        if (include) {
            for (var _i = 0, include_2 = include; _i < include_2.length; _i++) {
                var includeElement = include_2[_i];
                relationshipInclusions.push(includeElement.split('.'));
            }
        }
        for (var _a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
            var id = ids_1[_a];
            collectPendingChange(state, pending, id, relationshipInclusions, includeNew);
        }
        pending = uniqBy(pending, function (e) {
            return e.type + '####' + e.id;
        });
    }
    return pending;
}
var __assign$1 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * @return {?}
 */
function selectNgrxJson() {
    return function (state$) {
        return state$.select('NgrxJsonApi')
            .map(function (it) { /** @type {?} */ return (it); })
            .filter(function (it) { return !isUndefined(it); });
    };
}
/**
 * @return {?}
 */
function selectNgrxJsonApiDefaultZone() {
    return selectNgrxJsonApiZone(NGRX_JSON_API_DEFAULT_ZONE);
}
/**
 * @param {?} zoneId
 * @return {?}
 */
function selectNgrxJsonApiZone(zoneId) {
    return function (state$) {
        return state$.let(selectNgrxJson())
            .map(function (it) { /** @type {?} */ return (it.zones[zoneId]); });
    };
}
/**
 * @param {?} state
 * @param {?} zoneId
 * @return {?}
 */
function getNgrxJsonApiZone(state, zoneId) {
    return (state['NgrxJsonApi']['zones'][zoneId]);
}
/**
 * @param {?} queryId
 * @return {?}
 */
function selectStoreQuery(queryId) {
    return function (state$) {
        return state$
            .map(function (state) { return state.queries[queryId]; });
    };
}
/**
 * @param {?} type
 * @return {?}
 */
function selectStoreResourcesOfType(type) {
    return function (state$) {
        return state$
            .map(function (state) { return state.data; })
            .map(function (data) { return (data ? data[type] : undefined); });
    };
}
/**
 * @param {?} identifier
 * @return {?}
 */
function selectStoreResource(identifier) {
    return function (state$) {
        return state$
            .let(selectStoreResourcesOfType(identifier.type))
            .map(function (resources) { /** @type {?} */ return ((resources ? resources[identifier.id] : undefined)); });
    };
}
/**
 * @param {?} queryId
 * @param {?=} denormalize
 * @return {?}
 */
function selectManyQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            var /** @type {?} */ storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (isEmpty(storeQuery.resultIds)) {
                var /** @type {?} */ queryResult = __assign$1({}, storeQuery, { data: isUndefined(storeQuery.resultIds) ? undefined : [] });
                return queryResult;
            }
            else {
                var /** @type {?} */ results = storeQuery.resultIds.map(function (id) { return (state.data[id.type] ? state.data[id.type][id.id] : undefined); });
                if (denormalize) {
                    results = denormaliseStoreResources(results, state.data);
                }
                return __assign$1({}, storeQuery, { data: /** @type {?} */ (results) });
            }
        });
    };
}
/**
 * @param {?} queryId
 * @param {?=} denormalize
 * @return {?}
 */
function selectOneQueryResult(queryId, denormalize) {
    return function (state$) {
        return state$.map(function (state) {
            var /** @type {?} */ storeQuery = state.queries[queryId];
            if (!storeQuery) {
                return undefined;
            }
            if (isEmpty(storeQuery.resultIds)) {
                var /** @type {?} */ queryResult = __assign$1({}, storeQuery, { data: isUndefined(storeQuery.resultIds) ? undefined : null });
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
                var /** @type {?} */ queryResult = __assign$1({}, storeQuery, { data: result });
                return queryResult;
            }
        });
    };
}
/**
 * deprecated, to not use any longer
 * @param {?} state$
 * @return {?}
 */
function getNgrxJsonApiStore(state$) {
    return state$.let(selectNgrxJsonApiDefaultZone());
}
/**
 * deprecated, to not use any longer
 */
var NgrxJsonApiSelectors = (function () {
    function NgrxJsonApiSelectors() {
    }
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getNgrxJsonApiStore$ = function () {
        return function (state$) {
            return state$.let(selectNgrxJsonApiDefaultZone());
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
        return selectStoreQuery(queryId);
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResource$ = function (identifier) {
        return selectStoreResource(identifier);
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getManyResults$ = function (queryId, denormalize) {
        return selectManyQueryResult(queryId, denormalize);
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getOneResult$ = function (queryId, denormalize) {
        return selectOneQueryResult(queryId, denormalize);
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getPersistedResource$ = function (identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResource$(identifier))
                .map(function (it) { return (it ? it.persistedResource : undefined); });
        };
    };
    return NgrxJsonApiSelectors;
}());
var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/**
 * @abstract
 */
var NgrxJsonApiAction = (function () {
    function NgrxJsonApiAction() {
    }
    return NgrxJsonApiAction;
}());
var ApiApplyInitAction = (function (_super) {
    __extends$1(ApiApplyInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiApplyInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
        return _this;
    }
    return ApiApplyInitAction;
}(NgrxJsonApiAction));
var ApiApplySuccessAction = (function (_super) {
    __extends$1(ApiApplySuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiApplySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
        return _this;
    }
    return ApiApplySuccessAction;
}(NgrxJsonApiAction));
var ApiApplyFailAction = (function (_super) {
    __extends$1(ApiApplyFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiApplyFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
        return _this;
    }
    return ApiApplyFailAction;
}(NgrxJsonApiAction));
var ApiPostInitAction = (function (_super) {
    __extends$1(ApiPostInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPostInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_INIT;
        return _this;
    }
    return ApiPostInitAction;
}(NgrxJsonApiAction));
var ApiPostSuccessAction = (function (_super) {
    __extends$1(ApiPostSuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPostSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
        return _this;
    }
    return ApiPostSuccessAction;
}(NgrxJsonApiAction));
var ApiPostFailAction = (function (_super) {
    __extends$1(ApiPostFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPostFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
        return _this;
    }
    return ApiPostFailAction;
}(NgrxJsonApiAction));
var ApiDeleteInitAction = (function (_super) {
    __extends$1(ApiDeleteInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiDeleteInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
        return _this;
    }
    return ApiDeleteInitAction;
}(NgrxJsonApiAction));
var ApiDeleteSuccessAction = (function (_super) {
    __extends$1(ApiDeleteSuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiDeleteSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
        return _this;
    }
    return ApiDeleteSuccessAction;
}(NgrxJsonApiAction));
var ApiDeleteFailAction = (function (_super) {
    __extends$1(ApiDeleteFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiDeleteFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
        return _this;
    }
    return ApiDeleteFailAction;
}(NgrxJsonApiAction));
var ApiGetInitAction = (function (_super) {
    __extends$1(ApiGetInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiGetInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_INIT;
        return _this;
    }
    return ApiGetInitAction;
}(NgrxJsonApiAction));
var ApiGetSuccessAction = (function (_super) {
    __extends$1(ApiGetSuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiGetSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
        return _this;
    }
    return ApiGetSuccessAction;
}(NgrxJsonApiAction));
var ApiGetFailAction = (function (_super) {
    __extends$1(ApiGetFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiGetFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
        return _this;
    }
    return ApiGetFailAction;
}(NgrxJsonApiAction));
var ApiRollbackAction = (function (_super) {
    __extends$1(ApiRollbackAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiRollbackAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
        return _this;
    }
    return ApiRollbackAction;
}(NgrxJsonApiAction));
var ApiPatchInitAction = (function (_super) {
    __extends$1(ApiPatchInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPatchInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
        return _this;
    }
    return ApiPatchInitAction;
}(NgrxJsonApiAction));
var ApiPatchSuccessAction = (function (_super) {
    __extends$1(ApiPatchSuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPatchSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
        return _this;
    }
    return ApiPatchSuccessAction;
}(NgrxJsonApiAction));
var ApiPatchFailAction = (function (_super) {
    __extends$1(ApiPatchFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiPatchFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
        return _this;
    }
    return ApiPatchFailAction;
}(NgrxJsonApiAction));
var DeleteStoreResourceAction = (function (_super) {
    __extends$1(DeleteStoreResourceAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function DeleteStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
        return _this;
    }
    return DeleteStoreResourceAction;
}(NgrxJsonApiAction));
var PatchStoreResourceAction = (function (_super) {
    __extends$1(PatchStoreResourceAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function PatchStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
        return _this;
    }
    return PatchStoreResourceAction;
}(NgrxJsonApiAction));
var NewStoreResourceAction = (function (_super) {
    __extends$1(NewStoreResourceAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function NewStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
        return _this;
    }
    return NewStoreResourceAction;
}(NgrxJsonApiAction));
var PostStoreResourceAction = (function (_super) {
    __extends$1(PostStoreResourceAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function PostStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
        return _this;
    }
    return PostStoreResourceAction;
}(NgrxJsonApiAction));
var RemoveQueryAction = (function (_super) {
    __extends$1(RemoveQueryAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function RemoveQueryAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
        return _this;
    }
    return RemoveQueryAction;
}(NgrxJsonApiAction));
var LocalQueryInitAction = (function (_super) {
    __extends$1(LocalQueryInitAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function LocalQueryInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
        return _this;
    }
    return LocalQueryInitAction;
}(NgrxJsonApiAction));
var LocalQuerySuccessAction = (function (_super) {
    __extends$1(LocalQuerySuccessAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function LocalQuerySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
        return _this;
    }
    return LocalQuerySuccessAction;
}(NgrxJsonApiAction));
var LocalQueryFailAction = (function (_super) {
    __extends$1(LocalQueryFailAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function LocalQueryFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
        return _this;
    }
    return LocalQueryFailAction;
}(NgrxJsonApiAction));
var CompactStoreAction = (function (_super) {
    __extends$1(CompactStoreAction, _super);
    /**
     * @param {?} zoneId
     */
    function CompactStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
        return _this;
    }
    return CompactStoreAction;
}(NgrxJsonApiAction));
var ClearStoreAction = (function (_super) {
    __extends$1(ClearStoreAction, _super);
    /**
     * @param {?} zoneId
     */
    function ClearStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
        return _this;
    }
    return ClearStoreAction;
}(NgrxJsonApiAction));
var ApiQueryRefreshAction = (function (_super) {
    __extends$1(ApiQueryRefreshAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ApiQueryRefreshAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
        return _this;
    }
    return ApiQueryRefreshAction;
}(NgrxJsonApiAction));
var ModifyStoreResourceErrorsAction = (function (_super) {
    __extends$1(ModifyStoreResourceErrorsAction, _super);
    /**
     * @param {?} payload
     * @param {?} zoneId
     */
    function ModifyStoreResourceErrorsAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
        return _this;
    }
    return ModifyStoreResourceErrorsAction;
}(NgrxJsonApiAction));
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
/**
 * Represents an isolated area in the store with its own set of resources and queries.
 * 'api' is the default zone that already historically has been put beneath NgrxJsonApi within the store.
 */
var NgrxJsonApiZoneService = (function () {
    /**
     * @param {?} zoneId
     * @param {?} store
     */
    function NgrxJsonApiZoneService(zoneId, store) {
        this.zoneId = zoneId;
        this.store = store;
    }
    /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.putQuery = function (options) {
        var /** @type {?} */ query = options.query;
        var /** @type {?} */ fromServer = isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        if (!query.queryId) {
            throw new Error('to query must have a queryId');
        }
        if (fromServer) {
            this.store.dispatch(new ApiGetInitAction(query, this.zoneId));
        }
        else {
            this.store.dispatch(new LocalQueryInitAction(query, this.zoneId));
        }
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.refreshQuery = function (queryId) {
        this.store.dispatch(new ApiQueryRefreshAction(queryId, this.zoneId));
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.removeQuery = function (queryId) {
        this.store.dispatch(new RemoveQueryAction(queryId, this.zoneId));
    };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiZoneService.prototype.selectManyResults = function (queryId, denormalize) {
        if (denormalize === void 0) {
            denormalize = false;
        }
        return this.store.let(selectNgrxJsonApiZone(this.zoneId)).let(selectManyQueryResult(queryId, denormalize));
    };
    /**
     * Selects the data of the given query.
     *
     * @param {?} queryId
     * @param {?=} denormalize
     * @return {?} observable holding the data as array of resources.
     */
    NgrxJsonApiZoneService.prototype.selectOneResults = function (queryId, denormalize) {
        if (denormalize === void 0) {
            denormalize = false;
        }
        return this.store.let(selectNgrxJsonApiZone(this.zoneId)).let(selectOneQueryResult(queryId, denormalize));
    };
    /**
     * @param {?} identifier of the resource
     * @return {?} observable of the resource
     */
    NgrxJsonApiZoneService.prototype.selectStoreResource = function (identifier) {
        return this.store.let(selectNgrxJsonApiZone(this.zoneId)).let(selectStoreResource(identifier));
    };
    /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.patchResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        var /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPatchInitAction(resource, this.zoneId));
        }
        else {
            this.store.dispatch(new PatchStoreResourceAction(resource, this.zoneId));
        }
    };
    /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.newResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        this.store.dispatch(new NewStoreResourceAction(resource, this.zoneId));
    };
    /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.postResource = function (options) {
        var /** @type {?} */ resource = options.resource;
        var /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiPostInitAction(resource, this.zoneId));
        }
        else {
            this.store.dispatch(new PostStoreResourceAction(resource, this.zoneId));
        }
    };
    /**
     * Marks the given resource for deletion.
     *
     * @param {?} options
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.deleteResource = function (options) {
        var /** @type {?} */ resourceId = options.resourceId;
        var /** @type {?} */ toRemote = isUndefined(options.toRemote) ? false : options.toRemote;
        if (toRemote) {
            this.store.dispatch(new ApiDeleteInitAction(resourceId, this.zoneId));
        }
        else {
            this.store.dispatch(new DeleteStoreResourceAction(resourceId, this.zoneId));
        }
    };
    /**
     * Applies all pending changes to the remote JSON API endpoint.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.apply = function () {
        this.store.dispatch(new ApiApplyInitAction({}, this.zoneId));
    };
    /**
     * Clear all the contents from the store.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.clear = function () {
        this.store.dispatch(new ClearStoreAction(this.zoneId));
    };
    /**
     * Compacts the store by removing unreferences and unchanges resources.
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.compact = function () {
        this.store.dispatch(new CompactStoreAction(this.zoneId));
    };
    /**
     * Adds the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.addResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'ADD',
        }, this.zoneId));
    };
    /**
     * Removes the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.removeResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'REMOVE',
        }, this.zoneId));
    };
    /**
     * Sets the given errors to the resource with the given id.
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    NgrxJsonApiZoneService.prototype.setResourceErrors = function (id, errors) {
        this.store.dispatch(new ModifyStoreResourceErrorsAction({
            resourceId: id,
            errors: errors,
            modificationType: 'SET',
        }, this.zoneId));
    };
    return NgrxJsonApiZoneService;
}());
var NgrxJsonApiService = (function (_super) {
    __extends(NgrxJsonApiService, _super);
    /**
     * @param {?} store
     * @param {?} config
     */
    function NgrxJsonApiService(store, config) {
        var _this = _super.call(this, NGRX_JSON_API_DEFAULT_ZONE, store) || this;
        _this.config = config;
        _this.test = true;
        return _this;
    }
    /**
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDefaultZone = function () {
        return this;
    };
    /**
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiService.prototype.getZone = function (zoneId) {
        return new NgrxJsonApiZoneService(zoneId, this.store);
    };
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
                    .let(selectNgrxJsonApiDefaultZone())
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
     * @param {?} options
     * @param {?} multi
     * @return {?}
     */
    NgrxJsonApiService.prototype.findInternal = function (options, multi) {
        var _this = this;
        var /** @type {?} */ query = options.query;
        var /** @type {?} */ fromServer = isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        var /** @type {?} */ denormalise = isUndefined(options.denormalise)
            ? false
            : options.denormalise;
        var /** @type {?} */ newQuery;
        if (!query.queryId) {
            newQuery = __assign({}, query, { queryId: this.uuid() });
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
        return (queryResult$.finally(function () {
            return _this.removeQuery(newQuery.queryId);
        }));
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
     * @param {?} storeResource$
     * @return {?}
     */
    NgrxJsonApiService.prototype.denormaliseResource = function (storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(selectNgrxJsonApiZone(this.zoneId))
            .map(function (state) { return state.data; }), function (storeResource, storeData) {
            if (isArray(storeResource)) {
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
        var /** @type {?} */ pathSeparator = (get(this.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.config.resourceDefinitions, pathSeparator);
    };
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedValue = function (path, storeResource) {
        var /** @type {?} */ pathSeparator = (get(this.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedValue(path, storeResource, this.config.resourceDefinitions, pathSeparator);
    };
    return NgrxJsonApiService;
}(NgrxJsonApiZoneService));
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
    SelectStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
    ];
    /**
     * @nocollapse
     */
    SelectStoreResourcePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService, },
        ];
    };
    return SelectStoreResourcePipe;
}());
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
    DenormaliseStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
    ];
    /**
     * @nocollapse
     */
    DenormaliseStoreResourcePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService, },
        ];
    };
    return DenormaliseStoreResourcePipe;
}());
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
    GetDenormalisedValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
    ];
    /**
     * @nocollapse
     */
    GetDenormalisedValuePipe.ctorParameters = function () {
        return [
            { type: NgrxJsonApiService, },
        ];
    };
    return GetDenormalisedValuePipe;
}());
var __assign$3 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
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
        this.headers = new HttpHeaders({
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
        });
        this.definitions = this.config.resourceDefinitions;
        if (this.config.requestHeaders) {
            for (var _i = 0, _a = keys(this.config.requestHeaders); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                var value = this.config.requestHeaders[name_1];
                this.headers = this.headers.set(name_1, value);
            }
        }
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
        var /** @type {?} */ definition = find(this.definitions, { type: type });
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
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
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
            return Observable.throw('Query not found');
        }
        if (typeof document === undefined) {
            return Observable.throw('Data not found');
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
            return Observable.throw('Query not found');
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
        var /** @type {?} */ newRequestOptions = __assign$3({}, requestOptions, { headers: this.headers, observe: 'response' });
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var NgrxJsonApiEffects = (function () {
    /**
     * @param {?} actions$
     * @param {?} jsonApi
     * @param {?} store
     */
    function NgrxJsonApiEffects(actions$, jsonApi, store) {
        var _this = this;
        this.actions$ = actions$;
        this.jsonApi = jsonApi;
        this.store = store;
        this.createResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_POST_INIT)
            .mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'POST');
            return _this.jsonApi
                .create(payload.query, payload.jsonApiData)
                .map(function (response) {
                return new ApiPostSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            })
                .catch(function (error) {
                return Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            });
        });
        this.updateResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_PATCH_INIT)
            .mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'PATCH');
            return _this.jsonApi
                .update(payload.query, payload.jsonApiData)
                .map(function (response) {
                return new ApiPatchSuccessAction({
                    jsonApiData: response.body,
                    query: payload.query,
                }, action.zoneId);
            })
                .catch(function (error) {
                return Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            });
        });
        this.readResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_GET_INIT)
            .mergeMap(function (action) {
            var /** @type {?} */ query = action.payload;
            return _this.jsonApi
                .find(query)
                .map(function (response) { return response.body; })
                .map(function (data) {
                return new ApiGetSuccessAction({
                    jsonApiData: data,
                    query: query,
                }, action.zoneId);
            })
                .catch(function (error) {
                return Observable.of(new ApiGetFailAction(_this.toErrorPayload(query, error), action.zoneId));
            });
        });
        this.queryStore$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.LOCAL_QUERY_INIT)
            .mergeMap(function (action) {
            var /** @type {?} */ query = action.payload;
            return _this.store
                .let(selectNgrxJsonApiZone(action.zoneId))
                .let(_this.executeLocalQuery(query))
                .map(function (results) {
                return new LocalQuerySuccessAction({
                    jsonApiData: { data: results },
                    query: query,
                }, action.zoneId);
            })
                .catch(function (error) {
                return Observable.of(new LocalQueryFailAction(_this.toErrorPayload(query, error), action.zoneId));
            })
                .takeUntil(_this.localQueryInitEventFor(query))
                .takeUntil(_this.removeQueryEventFor(query));
        });
        this.deleteResource$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_INIT)
            .mergeMap(function (action) {
            var /** @type {?} */ payload = _this.generatePayload(action.payload, 'DELETE');
            return _this.jsonApi
                .delete(payload.query)
                .map(function (response) { return response.body; })
                .map(function (data) {
                return new ApiDeleteSuccessAction({
                    jsonApiData: data,
                    query: payload.query,
                }, action.zoneId);
            })
                .catch(function (error) {
                return Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), action.zoneId));
            });
        });
        this.triggerReadOnQueryRefresh$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_QUERY_REFRESH)
            .withLatestFrom(this.store, function (action, store) {
            var /** @type {?} */ queryId = action.payload;
            var /** @type {?} */ state = getNgrxJsonApiZone(store, action.zoneId);
            var /** @type {?} */ query = state.queries[queryId].query;
            return new ApiGetInitAction(query, action.zoneId);
        });
        this.refreshQueriesOnDelete$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS)
            .withLatestFrom(this.store, function (action, store) {
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
                        var /** @type {?} */ needsRefresh = findIndex(query.resultIds, function (o) {
                            return isEqual(id, o);
                        }) !== -1;
                        var /** @type {?} */ sameIdRequested = query.query.id === id.id && query.query.type === id.type;
                        if (sameIdRequested && (needsRefresh || isEmpty(query.errors))) {
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
        })
            .flatMap(function (actions) { return Observable.of.apply(Observable, actions); });
        this.applyResources$ = this.actions$
            .ofType(NgrxJsonApiActionTypes.API_APPLY_INIT)
            .filter(function () { return _this.jsonApi.config.applyEnabled !== false; })
            .withLatestFrom(this.store, function (action, storeState) {
            var /** @type {?} */ ngrxstore = getNgrxJsonApiZone(storeState, action.zoneId);
            var /** @type {?} */ payload = ((action)).payload;
            var /** @type {?} */ pending = getPendingChanges(ngrxstore.data, payload.ids, payload.include);
            if (pending.length === 0) {
                return Observable.of(new ApiApplySuccessAction([], action.zoneId));
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
            return Observable.of.apply(Observable, actions).concatAll()
                .toArray()
                .map(function (actions) { return _this.toApplyAction(actions, action.zoneId); });
        })
            .flatMap(function (actions) { return actions; });
        this.config = this.jsonApi.config;
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
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.executeLocalQuery = function (query) {
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
                    .combineLatest(state$.map(function (it) { return it.data; }), function (resources, storeData) {
                    return filterResources(resources, storeData, query, _this.config.resourceDefinitions, _this.config.filteringConfig);
                });
            }
            return selected$.distinctUntilChanged();
        };
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingCreate = function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'POST');
        return this.jsonApi
            .create(payload.query, payload.jsonApiData)
            .map(function (response) {
            return new ApiPostSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        })
            .catch(function (error) {
            return Observable.of(new ApiPostFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        });
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingUpdate = function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'PATCH');
        return (this.jsonApi
            .update(payload.query, payload.jsonApiData)
            .map(function (response) {
            return new ApiPatchSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        })
            .catch(function (error) {
            return Observable.of(new ApiPatchFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        }));
    };
    /**
     * @param {?} pendingChange
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.handlePendingDelete = function (pendingChange, zoneId) {
        var _this = this;
        var /** @type {?} */ payload = this.generatePayload(pendingChange, 'DELETE');
        return (this.jsonApi
            .delete(payload.query)
            .map(function (response) {
            return new ApiDeleteSuccessAction({
                jsonApiData: response.body,
                query: payload.query,
            }, zoneId);
        })
            .catch(function (error) {
            return Observable.of(new ApiDeleteFailAction(_this.toErrorPayload(payload.query, error), zoneId));
        }));
    };
    /**
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.ngOnDestroy = function () { };
    /**
     * @param {?} actions
     * @param {?} zoneId
     * @return {?}
     */
    NgrxJsonApiEffects.prototype.toApplyAction = function (actions, zoneId) {
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
    NgrxJsonApiEffects.ctorParameters = function () {
        return [
            { type: Actions, },
            { type: NgrxJsonApi, },
            { type: Store, },
        ];
    };
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], NgrxJsonApiEffects.prototype, "createResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "updateResource$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
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
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "refreshQueriesOnDelete$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], NgrxJsonApiEffects.prototype, "applyResources$", void 0);
    return NgrxJsonApiEffects;
}());
var __assign$4 = (undefined && undefined.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
var initialNgrxJsonApiZone = {
    isCreating: 0,
    isReading: 0,
    isUpdating: 0,
    isDeleting: 0,
    isApplying: 0,
    data: {},
    queries: {},
};
var initialNgrxJsonApiState = {
    zones: {}
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function NgrxJsonApiStoreReducer(state, action) {
    if (state === void 0) {
        state = initialNgrxJsonApiState;
    }
    var /** @type {?} */ zoneId = action['zoneId'];
    if (!zoneId) {
        return state;
    }
    var /** @type {?} */ zone = state.zones[zoneId];
    if (!zone) {
        zone = initialNgrxJsonApiZone;
    }
    var /** @type {?} */ newZone = NgrxJsonApiZoneReducer(zone, action);
    if (zone != newZone) {
        return __assign$4({}, state, { zones: __assign$4({}, state.zones, (_a = {}, _a[zoneId] = newZone, _a)) });
    }
    else {
        return state;
    }
    var _a;
}
/**
 * @param {?} zone
 * @param {?} action
 * @return {?}
 */
function NgrxJsonApiZoneReducer(zone, action) {
    var /** @type {?} */ newZone;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            newZone = __assign$4({}, zone, { data: updatedData, isCreating: zone.isCreating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            var /** @type {?} */ query = (action.payload);
            newZone = __assign$4({}, zone, { queries: updateQueryParams(zone.queries, query), isReading: zone.isReading + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            newZone = __assign$4({}, zone, { data: updatedData, isUpdating: zone.isUpdating + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newZone = __assign$4({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED'), isDeleting: zone.isDeleting + 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), queries: updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newZone = __assign$4({}, zone, { data: updateStoreDataFromPayload(zone.data, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newZone = __assign$4({}, zone, { data: deleteStoreResources(zone.data, action.payload.query), queries: updateQueriesForDeletedResource(zone.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newZone = __assign$4({}, zone, { queries: clearQueryResult(zone.queries, action.payload) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isCreating: zone.isCreating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newZone = __assign$4({}, zone, { queries: updateQueryErrors(zone.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: zone.isReading - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isUpdating: zone.isUpdating - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newZone = __assign$4({}, zone, { data: updateResourceErrorsForQuery(zone.data, action.payload.query, action.payload.jsonApiData), isDeleting: zone.isDeleting - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            var /** @type {?} */ queryId = (action.payload);
            newZone = __assign$4({}, zone, { queries: removeQuery(zone.queries, queryId) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            var /** @type {?} */ query = (action.payload);
            newZone = __assign$4({}, zone, { queries: updateQueryParams(zone.queries, query) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            var /** @type {?} */ payload = (action.payload);
            newZone = __assign$4({}, zone, { data: updateResourceErrors(zone.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            return setIn(zone, 'queries', updateQueryResults(zone.queries, action.payload.query.queryId, action.payload.jsonApiData));
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(zone.data, action.payload, false, false);
            if (updatedData !== zone.data) {
                newZone = __assign$4({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            if (updatedData !== zone.data) {
                newZone = __assign$4({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(zone.data, action.payload, false, true);
            updatedData = updateResourceState(updatedData, action.payload, 'NEW');
            if (updatedData !== zone.data) {
                newZone = __assign$4({}, zone, { data: updatedData });
                return newZone;
            }
            else {
                return zone;
            }
        }
        case NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE: {
            var /** @type {?} */ resourceId = (action.payload);
            if (zone.data[resourceId.type] &&
                zone.data[resourceId.type][resourceId.id]) {
                var /** @type {?} */ resource = zone.data[resourceId.type][resourceId.id];
                if (resource.state === 'NEW' || resource.state === 'CREATED') {
                    // not yet stored on server-side, just delete
                    newZone = __assign$4({}, zone, { data: removeStoreResource(zone.data, resourceId) });
                    return newZone;
                }
                else {
                    // stored on server, mark for deletion
                    newZone = __assign$4({}, zone, { data: updateResourceState(zone.data, action.payload, 'DELETED') });
                    return newZone;
                }
            }
            return zone;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            var /** @type {?} */ payload = ((action)).payload;
            var /** @type {?} */ pending_1 = getPendingChanges(zone.data, payload.ids, payload.include);
            newZone = __assign$4({}, zone, { isApplying: zone.isApplying + 1 });
            for (var _i = 0, pending_2 = pending_1; _i < pending_2.length; _i++) {
                var pendingChange = pending_2[_i];
                if (pendingChange.state === 'CREATED') {
                    newZone.isCreating++;
                }
                else if (pendingChange.state === 'UPDATED') {
                    newZone.isUpdating++;
                }
                else if (pendingChange.state === 'DELETED') {
                    newZone.isDeleting++;
                }
                else {
                    throw new Error('unknown state ' + pendingChange.state);
                }
            }
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_APPLY_SUCCESS:
        case NgrxJsonApiActionTypes.API_APPLY_FAIL: {
            // apply all the committed or failed changes
            var /** @type {?} */ actions = (action.payload);
            newZone = zone;
            for (var _a = 0, actions_1 = actions; _a < actions_1.length; _a++) {
                var commitAction = actions_1[_a];
                newZone = NgrxJsonApiZoneReducer(newZone, commitAction);
            }
            newZone = __assign$4({}, newZone, { isApplying: zone['isApplying'] - 1 });
            return newZone;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            var /** @type {?} */ payload = ((action)).payload;
            newZone = __assign$4({}, zone, { data: rollbackStoreResources(zone.data, payload.ids, payload.include) });
            return newZone;
        }
        case NgrxJsonApiActionTypes.CLEAR_STORE: {
            return initialNgrxJsonApiZone;
        }
        case NgrxJsonApiActionTypes.COMPACT_STORE: {
            return compactStore(zone);
        }
        default:
            return zone;
    }
}
var reducer = NgrxJsonApiStoreReducer;
var NGRX_JSON_API_CONFIG = new InjectionToken('NGRX_JSON_API_CONFIG');
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function apiFactory(http, config) {
    return new NgrxJsonApi(http, config);
}
/**
 * Deprecated, do not use any longer
 * @return {?}
 */
function selectorsFactory() {
    return new NgrxJsonApiSelectors();
}
/**
 * @param {?} store
 * @param {?} config
 * @return {?}
 */
function serviceFactory(store, config) {
    return new NgrxJsonApiService(store, config);
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
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [Store, NGRX_JSON_API_CONFIG],
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
    NgrxJsonApiModule.ctorParameters = function () { return []; };
    return NgrxJsonApiModule;
}());
/**
 * Generated bundle index. Do not edit.
 */
export { SelectStoreResourcePipe, DenormaliseStoreResourcePipe, GetDenormalisedValuePipe, NgrxJsonApiService, NgrxJsonApiZoneService, NgrxJsonApiModule, NGRX_JSON_API_CONFIG, uuid, NGRX_JSON_API_DEFAULT_ZONE, Direction, NgrxJsonApiActionTypes, NgrxJsonApiAction, ApiApplyInitAction, ApiApplySuccessAction, ApiApplyFailAction, ApiPostInitAction, ApiPostSuccessAction, ApiPostFailAction, ApiDeleteInitAction, ApiDeleteSuccessAction, ApiDeleteFailAction, ApiGetInitAction, ApiGetSuccessAction, ApiGetFailAction, ApiRollbackAction, ApiPatchInitAction, ApiPatchSuccessAction, ApiPatchFailAction, DeleteStoreResourceAction, PatchStoreResourceAction, NewStoreResourceAction, PostStoreResourceAction, RemoveQueryAction, LocalQueryInitAction, LocalQuerySuccessAction, LocalQueryFailAction, CompactStoreAction, ClearStoreAction, ApiQueryRefreshAction, ModifyStoreResourceErrorsAction, selectNgrxJson, selectNgrxJsonApiDefaultZone, selectNgrxJsonApiZone, getNgrxJsonApiZone, selectStoreQuery, selectStoreResourcesOfType, selectStoreResource, selectManyQueryResult, selectOneQueryResult, getNgrxJsonApiStore, NgrxJsonApiSelectors, NgrxJsonApi as ɵf, NgrxJsonApiEffects as ɵe, apiFactory as ɵa, configure as ɵd, selectorsFactory as ɵb, serviceFactory as ɵc, NgrxJsonApiStoreReducer as ɵg, reducer as ɵh };
//# sourceMappingURL=ngrx-json-api.es5.js.map
