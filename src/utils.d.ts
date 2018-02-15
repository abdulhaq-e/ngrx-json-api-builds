import { Document, FilteringParam, NgrxJsonApiFilteringConfig, NgrxJsonApiStore, NgrxJsonApiStoreData, NgrxJsonApiStoreResources, NgrxJsonApiStoreQueries, OperationType, Payload, Query, Resource, ResourceDefinition, ResourceIdentifier, ResourceError, ResourceState, StoreQuery, SortingParam, StoreResource, ErrorModificationType } from './interfaces';
export declare function setIn(state: any, path: string, value: any): any;
export declare const denormaliseObject: (resource: Resource, storeData: NgrxJsonApiStoreData, bag: NgrxJsonApiStoreData, denormalizePersisted?: boolean) => any;
export declare const denormaliseStoreResources: (items: StoreResource[], storeData: NgrxJsonApiStoreData, bag?: any, denormalizePersisted?: boolean) => StoreResource[];
export declare const denormaliseStoreResource: (item: StoreResource, storeData: NgrxJsonApiStoreData, bag?: any, denormalizePersisted?: boolean) => any;
export declare const getSingleStoreResource: (resourceId: ResourceIdentifier, storeData: NgrxJsonApiStoreData) => StoreResource;
export declare const getMultipleStoreResource: (resourceIds: ResourceIdentifier[], resources: NgrxJsonApiStoreData) => StoreResource[];
export declare const getDenormalisedPath: (path: string, baseResourceType: string, resourceDefinitions: ResourceDefinition[], pathSeparator?: string) => string;
export declare const getDenormalisedValue: (path: string, storeResource: StoreResource, resourceDefinitions: ResourceDefinition[], pathSeparator?: string) => any;
/**
 * Given two objects, it will merge the second in the first.
 *
 */
export declare const updateResourceObject: (original: Resource, source: Resource) => Resource;
/**
 * Insert a StoreResource given the Resource and the StoreResources
 *
 */
export declare const insertStoreResource: (storeResources: NgrxJsonApiStoreResources, resource: Resource, fromServer: boolean) => NgrxJsonApiStoreResources;
/**
 * Removes a StoreResource given the Resource and the StoreResources
 *
 */
export declare const removeStoreResource: (storeData: NgrxJsonApiStoreData, resourceId: ResourceIdentifier) => NgrxJsonApiStoreData;
/**
 * Updates the state of a StoreResource in the store.
 *
 * @param storeData
 * @param resourceId
 * @param resourceState
 * @param loading
 * @returns
 */
export declare const updateResourceState: (storeData: NgrxJsonApiStoreData, resourceId: ResourceIdentifier, resourceState?: ResourceState, loading?: OperationType) => NgrxJsonApiStoreData;
/**
 * Check equality of resource and ignore additional contents used by the
 * store (state, persistedResource, etc.)
 * @param resource0
 * @param resource1
 * @returns
 */
export declare const isEqualResource: (resource0: Resource, resource1: Resource) => boolean;
export declare const updateStoreResource: (state: NgrxJsonApiStoreResources, resource: Resource, fromServer: boolean) => NgrxJsonApiStoreResources;
export declare const updateQueriesForDeletedResource: (state: NgrxJsonApiStoreQueries, deletedId: ResourceIdentifier) => NgrxJsonApiStoreQueries;
export declare const updateResourceErrorsForQuery: (storeData: NgrxJsonApiStoreData, query: Query, document: Document) => NgrxJsonApiStoreData;
export declare const updateResourceErrors: (storeData: NgrxJsonApiStoreData, id: ResourceIdentifier, errors: ResourceError[], modificationType: ErrorModificationType) => NgrxJsonApiStoreData;
export declare const rollbackStoreResources: (storeData: NgrxJsonApiStoreData, ids: ResourceIdentifier[], include: string[]) => NgrxJsonApiStoreData;
export declare const deleteStoreResources: (storeData: NgrxJsonApiStoreData, query: Query) => {
    [x: string]: NgrxJsonApiStoreResources;
};
export declare const clearQueryResult: (storeData: NgrxJsonApiStoreQueries, queryId: string) => {
    [x: string]: StoreQuery;
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
 * @returns a new NgrxJsonApiStoreData with an inserted/updated resource.
 */
export declare const updateStoreDataFromResource: (storeData: NgrxJsonApiStoreData, resource: Resource, fromServer: boolean, override: boolean) => NgrxJsonApiStoreData;
export declare const updateStoreDataFromPayload: (storeData: NgrxJsonApiStoreData, payload: Document) => NgrxJsonApiStoreData;
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
export declare const updateQueryParams: (storeQueries: NgrxJsonApiStoreQueries, query: Query) => NgrxJsonApiStoreQueries;
/**
 * Updates the query results for given a queryId and the results.
 */
export declare const updateQueryResults: (storeQueries: NgrxJsonApiStoreQueries, queryId: string, document: Document) => NgrxJsonApiStoreQueries;
/**
 * Update the query errors given the queryId and a storeQueries and the
 * document containing the error
 *
 *
 */
export declare const updateQueryErrors: (storeQueries: NgrxJsonApiStoreQueries, queryId: string, document: Document) => NgrxJsonApiStoreQueries;
/**
 * Removes a query given its queryId from the NgrxJsonApiStoreQueries.
 */
export declare const removeQuery: (storeQueries: NgrxJsonApiStoreQueries, queryId: string) => NgrxJsonApiStoreQueries;
/**
 * Given a resource, it will return an object containing the resource id and type.
 */
export declare const toResourceIdentifier: (resource: Resource) => ResourceIdentifier;
/**
 * Get the value for the last field in a given fitering path.
 *
 * @param path
 * @param baseStoreResource
 * @param storeData
 * @param resourceDefinitions
 * @param pathSepartor
 * @returns the value of the last field in the path.
 */
export declare const getResourceFieldValueFromPath: (path: string, baseStoreResource: StoreResource, storeData: NgrxJsonApiStoreData, resourceDefinitions: ResourceDefinition[], pathSeparator?: string) => any;
export declare const filterResources: (resources: NgrxJsonApiStoreResources, storeData: NgrxJsonApiStoreData, query: Query, resourceDefinitions: ResourceDefinition[], filteringConfig?: NgrxJsonApiFilteringConfig) => StoreResource[];
export declare const generateIncludedQueryParams: (included: string[]) => string;
export declare const generateFieldsQueryParams: (fields: string[]) => string;
export declare const generateFilteringQueryParams: (filtering: FilteringParam[]) => string;
export declare const generateSortingQueryParams: (sorting: SortingParam[]) => string;
export declare const generateQueryParams: (...params: string[]) => string;
export declare const generatePayload: (resource: StoreResource, operation: OperationType) => Payload;
export declare const uuid: () => string;
export declare const compactStore: (state: NgrxJsonApiStore) => NgrxJsonApiStore;
export declare const sortPendingChanges: (pendingResources: StoreResource[]) => StoreResource[];
export declare function getPendingChanges(state: NgrxJsonApiStoreData, ids: Array<ResourceIdentifier>, include: Array<string>, includeNew?: boolean): Array<StoreResource>;
