import * as _ from 'lodash/index';
import { Direction, } from './interfaces';
export const /** @type {?} */ denormaliseObject = (resource, storeData, bag) => {
    // this function MUST MUTATE resource
    let /** @type {?} */ denormalised = resource;
    if (resource.hasOwnProperty('relationships')) {
        Object.keys(resource.relationships).forEach(relation => {
            resource.relationships[relation]['reference'] = ({});
            let /** @type {?} */ data = resource.relationships[relation].data;
            // denormalised relation
            let /** @type {?} */ relationDenorm;
            if (data === null || _.isEqual(data, [])) {
                relationDenorm = data;
            }
            else if (_.isPlainObject(data)) {
                // hasOne relation
                let /** @type {?} */ relatedRS = getSingleStoreResource(/** @type {?} */ (data), storeData);
                relationDenorm = denormaliseStoreResource(relatedRS, storeData, bag);
            }
            else if (_.isArray(data)) {
                // hasMany relation
                let /** @type {?} */ relatedRSs = getMultipleStoreResource(data, storeData);
                relationDenorm = relatedRSs.map(r => denormaliseStoreResource(r, storeData, bag));
            }
            let /** @type {?} */ relationDenormPath = 'relationships.' + relation + '.reference';
            denormalised = (_.set(denormalised, relationDenormPath, relationDenorm));
        });
    }
    return denormalised;
};
export const /** @type {?} */ denormaliseStoreResources = (items, storeData, bag = {}) => {
    let /** @type {?} */ results = [];
    for (let /** @type {?} */ item of items) {
        results.push(denormaliseStoreResource(item, storeData, bag));
    }
    return results;
};
export const /** @type {?} */ denormaliseStoreResource = (item, storeData, bag = {}) => {
    if (!item) {
        return null;
    }
    let /** @type {?} */ storeResource = _.cloneDeep(/** @type {?} */ (item));
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
export const /** @type {?} */ getSingleStoreResource = (resourceId, storeData) => {
    return _.get(storeData, [resourceId.type, resourceId.id], null);
};
export const /** @type {?} */ getMultipleStoreResource = (resourceIds, resources) => {
    return resourceIds.map(id => getSingleStoreResource(id, resources));
};
export const /** @type {?} */ getDenormalisedPath = (path, baseResourceType, resourceDefinitions, pathSeparator) => {
    let /** @type {?} */ denormPath = [];
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    let /** @type {?} */ fields = path.split(pathSeparator);
    let /** @type {?} */ currentResourceType = baseResourceType;
    for (let /** @type {?} */ i = 0; i < fields.length; i++) {
        let /** @type {?} */ definition = _.find(resourceDefinitions, { type: currentResourceType });
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
export const /** @type {?} */ getDenormalisedValue = (path, storeResource, resourceDefinitions, pathSeparator) => {
    let /** @type {?} */ denormalisedPath = getDenormalisedPath(path, storeResource.type, resourceDefinitions, pathSeparator);
    return _.get(storeResource, denormalisedPath);
};
/**
 * Given two objects, it will merge the second in the first.
 *
 */
export const updateResourceObject = (original, source) => {
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
export const insertStoreResource = (storeResources, resource, fromServer) => {
    let newStoreResources = Object.assign({}, storeResources);
    if (fromServer) {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: resource, state: 'IN_SYNC', errors: [], loading: false });
    }
    else {
        newStoreResources[resource.id] = Object.assign({}, resource, { persistedResource: null, state: 'CREATED', errors: [], loading: false });
    }
    return _.isEqual(storeResources, newStoreResources)
        ? storeResources
        : newStoreResources;
};
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
export const removeStoreResource = (storeData, resourceId) => {
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
export const updateResourceState = (storeData, resourceId, resourceState, loading) => {
    if (_.isUndefined(storeData[resourceId.type]) ||
        _.isUndefined(storeData[resourceId.type][resourceId.id])) {
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
export const isEqualResource = (resource0, resource1) => {
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
export const /** @type {?} */ updateStoreResource = (state, resource, fromServer) => {
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
    return _.isEqual(newState[resource.id], state[resource.id])
        ? state
        : newState;
};
export const /** @type {?} */ updateQueriesForDeletedResource = (state, deletedId) => {
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
export const /** @type {?} */ updateResourceErrorsForQuery = (storeData, query, document) => {
    if (!query.type || !query.id || document.data instanceof Array) {
        throw new Error('invalid parameters');
    }
    return updateResourceErrors(storeData, { id: query.id, type: query.type }, document.errors, 'SET');
};
export const /** @type {?} */ updateResourceErrors = (storeData, id, errors, modificationType) => {
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
                let /** @type {?} */ remove = errors && errors.filter(it => _.isEqual(it, currentError)).length > 0;
                if (!remove) {
                    storeResource.errors.push(currentError);
                }
            }
        }
    }
    newState[id.type][id.id] = storeResource;
    return newState;
};
export const /** @type {?} */ rollbackStoreResources = (storeData) => {
    let /** @type {?} */ newState = Object.assign({}, storeData);
    Object.keys(newState).forEach(type => {
        newState[type] = Object.assign({}, newState[type]);
        Object.keys(newState[type]).forEach(id => {
            let /** @type {?} */ storeResource = newState[type][id];
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
export const /** @type {?} */ deleteStoreResources = (storeData, query) => {
    let /** @type {?} */ newState = Object.assign({}, storeData);
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
export const /** @type {?} */ clearQueryResult = (storeData, queryId) => {
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
export const updateStoreDataFromResource = (storeData, resource, fromServer, override) => {
    if (_.isUndefined(storeData[resource.type])) {
        let newStoreData = Object.assign({}, storeData);
        newStoreData[resource.type] = {};
        newStoreData[resource.type] = insertStoreResource(newStoreData[resource.type], resource, fromServer);
        return newStoreData;
    }
    else if (_.isUndefined(storeData[resource.type][resource.id]) || override) {
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
export const /** @type {?} */ updateStoreDataFromPayload = (storeData, payload) => {
    let /** @type {?} */ data = (_.get(payload, 'data'));
    if (_.isUndefined(data)) {
        return storeData;
    }
    data = _.isArray(data) ? data : [data];
    let /** @type {?} */ included = (_.get(payload, 'included'));
    if (!_.isUndefined(included)) {
        data = [...data, ...included];
    }
    return (_.reduce(data, (result, resource) => {
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
export const updateQueryParams = (storeQueries, query) => {
    if (!query.queryId) {
        return storeQueries;
    }
    let newStoreQuery = Object.assign({}, storeQueries[query.queryId]);
    newStoreQuery.loading = true;
    newStoreQuery.query = _.cloneDeep(query);
    if (_.isUndefined(newStoreQuery.errors)) {
        newStoreQuery.errors = [];
    }
    let newStoreQueries = Object.assign({}, storeQueries);
    newStoreQueries[newStoreQuery.query.queryId] = newStoreQuery;
    return newStoreQueries;
};
/**
 * Updates the query results for given a queryId and the results.
 */
export const updateQueryResults = (storeQueries, queryId, document) => {
    let storeQuery = storeQueries[queryId];
    if (storeQuery) {
        let data = _.isArray(document.data) ? document.data : [document.data];
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
export const updateQueryErrors = (storeQueries, queryId, document) => {
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
export const removeQuery = (storeQueries, queryId) => {
    let newState = Object.assign({}, storeQueries);
    delete newState[queryId];
    return newState;
};
/**
 * Given a resource, it will return an object containing the resource id and type.
 */
export const toResourceIdentifier = (resource) => {
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
export const getResourceFieldValueFromPath = (path, baseStoreResource, storeData, resourceDefinitions, pathSeparator) => {
    if (_.isUndefined(pathSeparator)) {
        pathSeparator = '.';
    }
    let fields = path.split(pathSeparator);
    let currentStoreResource = baseStoreResource;
    for (let i = 0; i < fields.length; i++) {
        let definition = _.find(resourceDefinitions, {
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
            let resourceRelation = definition.relationships[fields[i]];
            if (resourceRelation.relationType === 'hasMany') {
                throw new Error('Cannot filter past a hasMany relation');
            }
            else {
                let relation = _.get(currentStoreResource, 'relationships.' + fields[i], null);
                if (!relation || !relation.data) {
                    return null;
                }
                else {
                    let relatedPath = [resourceRelation.type, relation.data.id];
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
export const /** @type {?} */ filterResources = (resources, storeData, query, resourceDefinitions, filteringConfig) => {
    return _.filter(resources, resource => {
        if (query.hasOwnProperty('params') &&
            query.params.hasOwnProperty('filtering')) {
            return query.params.filtering.every(element => {
                let /** @type {?} */ pathSeparator;
                let /** @type {?} */ filteringOperators;
                if (!_.isUndefined(filteringConfig)) {
                    pathSeparator = (_.get(filteringConfig, 'pathSeparator'));
                    filteringOperators = (_.get(filteringConfig, 'filteringOperators'));
                }
                // resource type and attribute
                let /** @type {?} */ resourceFieldValue = getResourceFieldValueFromPath(element.path, resource, storeData, resourceDefinitions, pathSeparator);
                if (!resourceFieldValue) {
                    return false;
                }
                let /** @type {?} */ operator = (_.find(filteringOperators, {
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
export const /** @type {?} */ generateIncludedQueryParams = (included) => {
    if (_.isEmpty(included)) {
        return '';
    }
    return 'include=' + included.join();
};
export const /** @type {?} */ generateFieldsQueryParams = (fields) => {
    if (_.isEmpty(fields)) {
        return '';
    }
    return 'fields=' + fields.join();
};
export const /** @type {?} */ generateFilteringQueryParams = (filtering) => {
    if (_.isEmpty(filtering)) {
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
export const /** @type {?} */ generateSortingQueryParams = (sorting) => {
    if (_.isEmpty(sorting)) {
        return '';
    }
    return ('sort=' +
        sorting
            .map(f => (f.direction === Direction.ASC ? '' : '-') + f.api)
            .join(','));
};
export const /** @type {?} */ generateQueryParams = (...params) => {
    let /** @type {?} */ newParams = params.filter(p => p !== '');
    if (newParams.length !== 0) {
        return '?' + newParams.join('&');
    }
    else {
        return '';
    }
};
export const /** @type {?} */ generatePayload = (resource, operation) => {
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
export const /** @type {?} */ uuid = () => {
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
const /** @type {?} */ toKey = (id) => {
    return id.id + '@' + id.type;
};
const /** @type {?} */ collectQueryResults = (state, usedResources) => {
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
const /** @type {?} */ collectPendingChanges = (state, usedResources) => {
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
const /** @type {?} */ collectReferencesForResource = (state, usedResources, resource) => {
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
const /** @type {?} */ collectReferences = (state, usedResources) => {
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
const /** @type {?} */ sweepUnusedResources = (state, usedResources) => {
    let /** @type {?} */ hasDeletions = false;
    let /** @type {?} */ newState = _.cloneDeep(state);
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
            if (_.isEmpty(resources)) {
                delete newState.data[type];
            }
        }
    }
    return hasDeletions ? newState : state;
};
export const /** @type {?} */ compactStore = (state) => {
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
export const /** @type {?} */ sortPendingChanges = (pendingResources) => {
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
const /** @type {?} */ visitPending = (pendingResource, i, predecessors, context) => {
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
 * @return {?}
 */
export function getPendingChanges(state) {
    let /** @type {?} */ pending = [];
    Object.keys(state.data).forEach(type => {
        Object.keys(state.data[type]).forEach(id => {
            let /** @type {?} */ storeResource = state.data[type][id];
            if (storeResource.state !== 'IN_SYNC' && storeResource.state !== 'NEW') {
                pending.push(storeResource);
            }
        });
    });
    return pending;
}
//# sourceMappingURL=utils.js.map