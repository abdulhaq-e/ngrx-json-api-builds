var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash/index';
import { Direction, } from './interfaces';
export var /** @type {?} */ denormaliseObject = function (resource, storeData, bag) {
    // this function MUST MUTATE resource
    var /** @type {?} */ denormalised = resource;
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(function (relation) {
            resource.relationships[relation]['reference'] = ({});
            var /** @type {?} */ data = resource.relationships[relation].data;
            // denormalised relation
            var /** @type {?} */ relationDenorm;
            if (data === null || _.isEqual(data, [])) {
                relationDenorm = data;
            }
            else if (_.isPlainObject(data)) {
                // hasOne relation
                var /** @type {?} */ relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = denormaliseStoreResource(relatedRS, storeData, bag);
            }
            else if (_.isArray(data)) {
                // hasMany relation
                var /** @type {?} */ relatedRSs = getMultipleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = relatedRSs.map(function (r) {
                    return denormaliseStoreResource(r, storeData, bag);
                });
            }
            var /** @type {?} */ relationDenormPath = 'relationships.' + relation + '.reference';
            denormalised = (_.set(denormalised, relationDenormPath, relationDenorm));
        });
    }
    return denormalised;
};
export var /** @type {?} */ denormaliseStoreResources = function (items, storeData, bag) {
    if (bag === void 0) { bag = {}; }
    var /** @type {?} */ results = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        results.push(denormaliseStoreResource(item, storeData, bag));
    }
    return results;
};
export var /** @type {?} */ denormaliseStoreResource = function (item, storeData, bag) {
    if (bag === void 0) { bag = {}; }
    if (!item) {
        return null;
    }
    var /** @type {?} */ storeResource = _.cloneDeep(/** @type {?} */ (item));
    if (_.isUndefined(bag[storeResource.type])) {
        bag[storeResource.type] = {};
    }
    if (_.isUndefined(bag[storeResource.type][storeResource.id])) {
        bag[storeResource.type][storeResource.id] = storeResource;
        storeResource = denormaliseObject(storeResource, storeData, bag);
        if (storeResource.persistedResource) {
            storeResource.persistedResource = denormaliseObject(storeResource.persistedResource, storeData, bag);
        }
    }
    return bag[storeResource.type][storeResource.id];
};
export var /** @type {?} */ getSingleStoreResource = function (resourceId, storeData) {
    return _.get(storeData, [resourceId.type, resourceId.id], null);
};
export var /** @type {?} */ getMultipleStoreResource = function (resourceIds, resources) {
    return resourceIds.map(function (id) { return getSingleStoreResource(id, resources); });
};
export var /** @type {?} */ getDenormalisedPath = function (path, baseResourceType, resourceDefinitions, pathSeparator) {
    var /** @type {?} */ denormPath = [];
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var /** @type {?} */ fields = path.split(pathSeparator);
    var /** @type {?} */ currentResourceType = baseResourceType;
    for (var /** @type {?} */ i = 0; i < fields.length; i++) {
        var /** @type {?} */ definition = _.find(resourceDefinitions, { type: currentResourceType });
        if (_.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (_.isUndefined(definition.attributes) &&
            _.isUndefined(definition.relationships)) {
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
export var /** @type {?} */ getDenormalisedValue = function (path, storeResource, resourceDefinitions, pathSeparator) {
    var /** @type {?} */ denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return _.get(storeResource, denormalisedPath);
};
/**
 * Given two objects, it will merge the second in the first.
 *
 */
export var updateResourceObject = function (original, source) {
    // by default arrays would make use of concat.
    function customizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return srcValue;
        }
    }
    return _.mergeWith({}, original, source, customizer);
};
/**
 * Insert a StoreResource given the Resource and the StoreResources
 *
 */
export var insertStoreResource = function (storeResources, resource, fromServer) {
    var newStoreResources = __assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = __assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false });
    }
    else {
        newStoreResources[resource.id] = __assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false });
    }
    return _.isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
export var removeStoreResource = function (storeData, resourceId) {
    if (storeData[resourceId.type][resourceId.id]) {
        var newState = __assign({}, storeData);
        newState[resourceId.type] = __assign({}, newState[resourceId.type]);
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
export var updateResourceState = function (storeData, resourceId, resourceState, loading) {
    if (_.isUndefined(storeData[resourceId.type]) ||
        _.isUndefined(storeData[resourceId.type][resourceId.id])) {
        if (resourceState === 'DELETED') {
            var newState_1 = __assign({}, storeData);
            newState_1[resourceId.type] = __assign({}, newState_1[resourceId.type]);
            newState_1[resourceId.type][resourceId.id] = __assign({}, newState_1[resourceId.type][resourceId.id]);
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
    var newState = __assign({}, storeData);
    newState[resourceId.type] = __assign({}, newState[resourceId.type]);
    newState[resourceId.type][resourceId.id] = __assign({}, newState[resourceId.type][resourceId.id]);
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
export var isEqualResource = function (resource0, resource1) {
    if (resource0 === resource1) {
        return true;
    }
    if (resource0 !== null !== (resource1 !== null)) {
        return false;
    }
    return (_.isEqual(resource0.id, resource1.id) &&
        _.isEqual(resource0.type, resource1.type) &&
        _.isEqual(resource0.attributes, resource1.attributes) &&
        _.isEqual(resource0.meta, resource1.meta) &&
        _.isEqual(resource0.links, resource1.links) &&
        _.isEqual(resource0.relationships, resource1.relationships));
};
export var /** @type {?} */ updateStoreResource = function (state, resource, fromServer) {
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
    var /** @type {?} */ newState = __assign({}, state);
    newState[resource.id] = (__assign({}, newResource, { persistedResource: persistedResource, state: newResourceState, errors: [], loading: false }));
    return _.isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
export var /** @type {?} */ updateQueriesForDeletedResource = function (state, deletedId) {
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
export var /** @type {?} */ updateResourceErrorsForQuery = function (storeData, query, document) {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
export var /** @type {?} */ updateResourceErrors = function (storeData, id, errors, modificationType) {
    if (!storeData[id.type] || !storeData[id.type][id.id]) {
        return storeData;
    }
    var /** @type {?} */ newState = __assign({}, storeData);
    newState[id.type] = __assign({}, newState[id.type]);
    var /** @type {?} */ storeResource = __assign({}, newState[id.type][id.id]);
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
                var /** @type {?} */ remove = errors && errors.filter(function (it) { return _.isEqual(it, currentError); }).length > 0;
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
        newState[type][id] = (__assign({}, newState[type][id], { state: 'IN_SYNC', resource: newState[type][id].persistedResource }));
    }
}
export var /** @type {?} */ rollbackStoreResources = function (storeData, ids, include) {
    var /** @type {?} */ newState = __assign({}, storeData);
    if (_.isUndefined(ids)) {
        Object.keys(newState).forEach(function (type) {
            newState[type] = __assign({}, newState[type]);
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
export var /** @type {?} */ deleteStoreResources = function (storeData, query) {
    var /** @type {?} */ newState = __assign({}, storeData);
    // if an id is not provided, all resources of the provided type will be deleted
    if (typeof query.id === 'undefined') {
        newState[query.type] = {};
    }
    else {
        newState[query.type] = (_.omit(newState[query.type], [
            query.id,
        ]));
    }
    return newState;
};
export var /** @type {?} */ clearQueryResult = function (storeData, queryId) {
    var /** @type {?} */ newQuery = __assign({}, storeData[queryId]);
    delete newQuery.resultIds;
    delete newQuery.errors;
    delete newQuery.meta;
    delete newQuery.links;
    var /** @type {?} */ newState = __assign({}, storeData);
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
export var updateStoreDataFromResource = function (storeData, resource, fromServer, override) {
    if (_.isUndefined(storeData[resource.type])) {
        var newStoreData = __assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (_.isUndefined(storeData[resource.type][resource.id]) || override) {
        var updatedStoreResources = insertStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = __assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
    else {
        var updatedStoreResources = updateStoreResource(storeData[resource.type], resource, fromServer);
        // check if nothing has changed
        if (updatedStoreResources !== storeData[resource.type]) {
            var newStoreData = __assign({}, storeData);
            newStoreData[resource.type] = updatedStoreResources;
            return newStoreData;
        }
        return storeData;
    }
};
export var /** @type {?} */ updateStoreDataFromPayload = function (storeData, payload) {
    var /** @type {?} */ data = (_.get(payload, 'data'));
    if (_.isUndefined(data)) {
        return storeData;
    }
    data = _.isArray(data) ? (data) : ([data]);
    var /** @type {?} */ included = (_.get(payload, 'included'));
    if (!_.isUndefined(included)) {
        data = data.concat(included);
    }
    return (_.reduce(data, function (result, resource) {
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
export var updateQueryParams = function (storeQueries, query) {
    if (!query.queryId) {
        return storeQueries;
    }
    var newStoreQuery = __assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = _.cloneDeep(query);
    if (_.isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    var newStoreQueries = __assign({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/**
 * Updates the query results for given a queryId and the results.
 */
export var updateQueryResults = function (storeQueries, queryId, document) {
    var storeQuery = storeQueries[queryId];
    if (storeQuery) {
        var data = _.isArray(document.data) ? document.data : [document.data];
        var newQueryStore = __assign({}, storeQuery, { resultIds: data.map(function (it) { return (it ? toResourceIdentifier(it) : []); }), meta: document.meta, links: document.links, loading: false });
        var newState = __assign({}, storeQueries);
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
export var updateQueryErrors = function (storeQueries, queryId, document) {
    if (!queryId || !storeQueries[queryId]) {
        return storeQueries;
    }
    var newState = __assign({}, storeQueries);
    var newStoreQuery = __assign({}, newState[queryId]);
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
export var removeQuery = function (storeQueries, queryId) {
    var newState = __assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/**
 * Given a resource, it will return an object containing the resource id and type.
 */
export var toResourceIdentifier = function (resource) {
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
export var getResourceFieldValueFromPath = function (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) {
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    var fields = path.split(pathSeparator);
    var currentStoreResource = baseStoreResource;
    for (var i = 0; i < fields.length; i++) {
        var definition = _.find(resourceDefinitions, {
            type: currentStoreResource.type,
        });
        if (_.isUndefined(definition)) {
            throw new Error('Definition not found');
        }
        // if both attributes and relationships are missing, raise an error
        if (_.isUndefined(definition.attributes) &&
            _.isUndefined(definition.relationships)) {
            throw new Error('Attributes or Relationships must be provided');
        }
        if (definition.attributes.hasOwnProperty(fields[i])) {
            return _.get(currentStoreResource, 'attributes.' + fields[i], null);
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
                var relation = _.get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    var relatedPath = [resourceRelation.type, relation.data.id];
                    currentStoreResource = _.get(storeData, relatedPath);
                }
            }
        }
        else {
            throw new Error('Cannot find field in attributes or relationships');
        }
        if (_.isUndefined(currentStoreResource)) {
            return null;
        }
    }
};
export var /** @type {?} */ filterResources = function (resources, storeData, query, resourceDefinitions, filteringConfig) {
    return _.filter(resources, function (resource) {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(function (element) {
                var /** @type {?} */ pathSeparator;
                var /** @type {?} */ filteringOperators;
                if (!_.isUndefined(filteringConfig)) {
                    pathSeparator = (_.get(filteringConfig, 'pathSeparator'));
                    filteringOperators = (_.get(filteringConfig, 'filteringOperators'));
                }
                // resource type and attribute
                var /** @type {?} */ resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                var /** @type {?} */ operator = (_.find(filteringOperators, {
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
                        if (_.isString(element.value) && _.isString(resourceFieldValue)) {
                            return (element.value.toLowerCase() === resourceFieldValue.toLowerCase());
                        }
                        else {
                            return element.value === resourceFieldValue;
                        }
                    case 'exact':
                        return element.value === resourceFieldValue;
                    case 'contains':
                        return _.includes(resourceFieldValue, element.value);
                    case 'icontains':
                        return _.includes(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'in':
                        if (_.isArray(element.value)) {
                            return _.includes(element.value, resourceFieldValue);
                        }
                        else {
                            return _.includes([element.value], resourceFieldValue);
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
                        return _.startsWith(resourceFieldValue, element.value);
                    case 'istartswith':
                        return _.startsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
                    case 'endswith':
                        return _.endsWith(resourceFieldValue, element.value);
                    case 'iendswith':
                        return _.endsWith(resourceFieldValue.toLowerCase(), element.value.toLowerCase());
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
export var /** @type {?} */ generateIncludedQueryParams = function (included) {
    if (_.isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
export var /** @type {?} */ generateFieldsQueryParams = function (fields) {
    if (_.isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
export var /** @type {?} */ generateFilteringQueryParams = function (filtering) {
    if (_.isEmpty(filtering)) {
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
export var /** @type {?} */ generateSortingQueryParams = function (sorting) {
    if (_.isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(function (f) { return (f.direction === Direction.ASC ? '' : '-') + f.api; })
            .join(','));
};
export var /** @type {?} */ generateQueryParams = function () {
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
export var /** @type {?} */ generatePayload = function (resource, operation) {
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
export var /** @type {?} */ uuid = function () {
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
var /** @type {?} */ toKey = function (id) {
    return id.id + '@' + id.type;
};
var /** @type {?} */ collectQueryResults = function (state, usedResources) {
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
var /** @type {?} */ collectPendingChanges = function (state, usedResources) {
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
var /** @type {?} */ collectReferencesForResource = function (state, usedResources, resource) {
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
var /** @type {?} */ collectReferences = function (state, usedResources) {
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
var /** @type {?} */ sweepUnusedResources = function (state, usedResources) {
    var /** @type {?} */ hasDeletions = false;
    var /** @type {?} */ newState = _.cloneDeep(state);
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
            if (_.isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
export var /** @type {?} */ compactStore = function (state) {
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
export var /** @type {?} */ sortPendingChanges = function (pendingResources) {
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
var /** @type {?} */ visitPending = function (pendingResource, i, predecessors, context) {
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
                    if (_.isArray(data)) {
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
export function getPendingChanges(state, ids, include, includeNew) {
    var /** @type {?} */ pending = [];
    if (_.isUndefined(ids)) {
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
        pending = _.uniqBy(pending, function (e) {
            return e.type + '####' + e.id;
        });
    }
    return pending;
}
//# sourceMappingURL=utils.js.map