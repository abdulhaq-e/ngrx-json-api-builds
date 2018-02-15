/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export var /** @type {?} */ NGRX_JSON_API_DEFAULT_ZONE = 'default';
/** @enum {number} */
var Direction = {
    ASC: 0,
    DESC: 1,
};
export { Direction };
Direction[Direction.ASC] = "ASC";
Direction[Direction.DESC] = "DESC";
/**
 * @record
 */
export function Document() { }
function Document_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Document.prototype.data;
    /** @type {?|undefined} */
    Document.prototype.included;
    /** @type {?|undefined} */
    Document.prototype.meta;
    /** @type {?|undefined} */
    Document.prototype.links;
    /** @type {?|undefined} */
    Document.prototype.errors;
}
/**
 * @record
 */
export function FilteringParam() { }
function FilteringParam_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    FilteringParam.prototype.path;
    /** @type {?|undefined} */
    FilteringParam.prototype.operator;
    /** @type {?|undefined} */
    FilteringParam.prototype.value;
}
/**
 * @record
 */
export function FilteringOperator() { }
function FilteringOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    FilteringOperator.prototype.name;
    /** @type {?|undefined} */
    FilteringOperator.prototype.apiName;
    /** @type {?} */
    FilteringOperator.prototype.comparison;
}
/**
 * @record
 */
export function ManyResourceRelationship() { }
function ManyResourceRelationship_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ManyResourceRelationship.prototype.data;
    /** @type {?|undefined} */
    ManyResourceRelationship.prototype.reference;
}
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 */
export function TypedManyResourceRelationship() { }
function TypedManyResourceRelationship_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    TypedManyResourceRelationship.prototype.reference;
}
/**
 * Used by code generators to navigate relationships in a type-safe manner.
 * See crnk.io for a first such generator.
 * @record
 */
export function TypedOneResourceRelationship() { }
function TypedOneResourceRelationship_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    TypedOneResourceRelationship.prototype.reference;
}
/**
 * @record
 */
export function NgrxJsonApiConfig() { }
function NgrxJsonApiConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiConfig.prototype.apiUrl;
    /** @type {?|undefined} */
    NgrxJsonApiConfig.prototype.initialState;
    /** @type {?|undefined} */
    NgrxJsonApiConfig.prototype.resourceDefinitions;
    /** @type {?|undefined} */
    NgrxJsonApiConfig.prototype.urlBuilder;
    /** @type {?|undefined} */
    NgrxJsonApiConfig.prototype.filteringConfig;
    /**
     * Custom request headers.
     * @type {?|undefined}
     */
    NgrxJsonApiConfig.prototype.requestHeaders;
    /**
     * Allows to disable the apply action and replace it with a custom one. For example
     * have a look at www.crnk.io that makes use of JSON PATCH to perform bulk updates.
     * @type {?|undefined}
     */
    NgrxJsonApiConfig.prototype.applyEnabled;
}
/**
 * @record
 */
export function NgrxJsonApiState() { }
function NgrxJsonApiState_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiState.prototype.zones;
}
/**
 * @record
 */
export function NgrxJsonApiZones() { }
function NgrxJsonApiZones_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [id: string]: NgrxJsonApiZone;
    */
}
/**
 * deprecated, mae use of NgrxJsonApiZone instead
 * @record
 */
export function NgrxJsonApiStore() { }
function NgrxJsonApiStore_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiStore.prototype.data;
    /** @type {?} */
    NgrxJsonApiStore.prototype.queries;
    /** @type {?} */
    NgrxJsonApiStore.prototype.isCreating;
    /** @type {?} */
    NgrxJsonApiStore.prototype.isReading;
    /** @type {?} */
    NgrxJsonApiStore.prototype.isUpdating;
    /** @type {?} */
    NgrxJsonApiStore.prototype.isDeleting;
    /** @type {?} */
    NgrxJsonApiStore.prototype.isApplying;
}
/**
 * @record
 */
export function NgrxJsonApiZone() { }
function NgrxJsonApiZone_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function NgrxJsonApiStoreData() { }
function NgrxJsonApiStoreData_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [id: string]: NgrxJsonApiStoreResources;
    */
}
/**
 * @record
 */
export function NgrxJsonApiStoreQueries() { }
function NgrxJsonApiStoreQueries_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [id: string]: StoreQuery;
    */
}
/**
 * @record
 */
export function NgrxJsonApiStoreResources() { }
function NgrxJsonApiStoreResources_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [id: string]: StoreResource;
    */
}
/**
 * @record
 */
export function NgrxJsonApiFilteringConfig() { }
function NgrxJsonApiFilteringConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    NgrxJsonApiFilteringConfig.prototype.pathSeparator;
    /** @type {?|undefined} */
    NgrxJsonApiFilteringConfig.prototype.filteringOperators;
}
/**
 * @record
 */
export function NgrxJsonApiUrlBuilder() { }
function NgrxJsonApiUrlBuilder_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    NgrxJsonApiUrlBuilder.prototype.generateFilteringQueryParams;
    /** @type {?|undefined} */
    NgrxJsonApiUrlBuilder.prototype.generateFieldsQueryParams;
    /** @type {?|undefined} */
    NgrxJsonApiUrlBuilder.prototype.generateIncludedQueryParams;
    /** @type {?|undefined} */
    NgrxJsonApiUrlBuilder.prototype.generateSortingQueryParams;
    /** @type {?|undefined} */
    NgrxJsonApiUrlBuilder.prototype.generateQueryParams;
}
/**
 * @record
 */
export function OneResourceRelationship() { }
function OneResourceRelationship_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    OneResourceRelationship.prototype.data;
    /** @type {?|undefined} */
    OneResourceRelationship.prototype.reference;
}
/**
 * @record
 */
export function ModifyStoreResourceErrorsPayload() { }
function ModifyStoreResourceErrorsPayload_tsickle_Closure_declarations() {
    /** @type {?} */
    ModifyStoreResourceErrorsPayload.prototype.resourceId;
    /** @type {?} */
    ModifyStoreResourceErrorsPayload.prototype.errors;
    /** @type {?} */
    ModifyStoreResourceErrorsPayload.prototype.modificationType;
}
/**
 * @record
 */
export function Payload() { }
function Payload_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Payload.prototype.jsonApiData;
    /** @type {?|undefined} */
    Payload.prototype.query;
}
/**
 * @record
 */
export function Query() { }
function Query_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Query.prototype.queryId;
    /** @type {?|undefined} */
    Query.prototype.type;
    /** @type {?|undefined} */
    Query.prototype.id;
    /** @type {?|undefined} */
    Query.prototype.params;
}
/**
 * @record
 */
export function QueryParams() { }
function QueryParams_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    QueryParams.prototype.filtering;
    /** @type {?|undefined} */
    QueryParams.prototype.sorting;
    /** @type {?|undefined} */
    QueryParams.prototype.include;
    /** @type {?|undefined} */
    QueryParams.prototype.fields;
    /** @type {?|undefined} */
    QueryParams.prototype.offset;
    /** @type {?|undefined} */
    QueryParams.prototype.limit;
}
/**
 * @record
 */
export function Resource() { }
function Resource_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Resource.prototype.attributes;
    /** @type {?|undefined} */
    Resource.prototype.relationships;
    /** @type {?|undefined} */
    Resource.prototype.meta;
    /** @type {?|undefined} */
    Resource.prototype.links;
}
/**
 * @record
 */
export function ResourceAttributeDefinition() { }
function ResourceAttributeDefinition_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ResourceAttributeDefinition.prototype.apiName;
}
/**
 * @record
 */
export function ResourceDefinition() { }
function ResourceDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceDefinition.prototype.type;
    /** @type {?} */
    ResourceDefinition.prototype.collectionPath;
    /** @type {?|undefined} */
    ResourceDefinition.prototype.attributes;
    /** @type {?|undefined} */
    ResourceDefinition.prototype.relationships;
}
/**
 * @record
 */
export function ResourceError() { }
function ResourceError_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ResourceError.prototype.id;
    /** @type {?|undefined} */
    ResourceError.prototype.links;
    /** @type {?|undefined} */
    ResourceError.prototype.status;
    /** @type {?|undefined} */
    ResourceError.prototype.code;
    /** @type {?|undefined} */
    ResourceError.prototype.title;
    /** @type {?|undefined} */
    ResourceError.prototype.detail;
    /** @type {?|undefined} */
    ResourceError.prototype.source;
    /** @type {?|undefined} */
    ResourceError.prototype.meta;
}
/**
 * @record
 */
export function ResourceErrorSource() { }
function ResourceErrorSource_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ResourceErrorSource.prototype.pointer;
    /** @type {?|undefined} */
    ResourceErrorSource.prototype.parameter;
}
/**
 * @record
 */
export function ResourceIdentifier() { }
function ResourceIdentifier_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceIdentifier.prototype.type;
    /** @type {?} */
    ResourceIdentifier.prototype.id;
}
/**
 * @record
 */
export function ResourceRelationship() { }
function ResourceRelationship_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ResourceRelationship.prototype.data;
    /** @type {?|undefined} */
    ResourceRelationship.prototype.links;
    /** @type {?|undefined} */
    ResourceRelationship.prototype.reference;
}
/**
 * @record
 */
export function ResourceRelationDefinition() { }
function ResourceRelationDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceRelationDefinition.prototype.type;
    /** @type {?} */
    ResourceRelationDefinition.prototype.relationType;
}
/**
 * @record
 */
export function SortingParam() { }
function SortingParam_tsickle_Closure_declarations() {
    /** @type {?} */
    SortingParam.prototype.api;
    /** @type {?} */
    SortingParam.prototype.direction;
}
/**
 * @record
 */
export function QueryResult() { }
function QueryResult_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    QueryResult.prototype.data;
}
/**
 * @record
 */
export function ManyQueryResult() { }
function ManyQueryResult_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ManyQueryResult.prototype.data;
}
/**
 * @record
 */
export function OneQueryResult() { }
function OneQueryResult_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    OneQueryResult.prototype.data;
}
/**
 * @record
 */
export function StoreQuery() { }
function StoreQuery_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreQuery.prototype.query;
    /** @type {?} */
    StoreQuery.prototype.loading;
    /** @type {?|undefined} */
    StoreQuery.prototype.resultIds;
    /** @type {?|undefined} */
    StoreQuery.prototype.meta;
    /** @type {?|undefined} */
    StoreQuery.prototype.links;
    /**
     * Errors received from the server after attempting to perform a GET request.
     * @type {?}
     */
    StoreQuery.prototype.errors;
}
/**
 * Container to hold a Resource in the store with state information.
 * @record
 */
export function StoreResource() { }
function StoreResource_tsickle_Closure_declarations() {
    /**
     * State of the resource to track local changes not yet
     * published to the json api endpoint.
     * @type {?|undefined}
     */
    StoreResource.prototype.state;
    /**
     * The original resource obtained from the server.
     * @type {?|undefined}
     */
    StoreResource.prototype.persistedResource;
    /**
     * One of the operation types: reading, creating, updating or deleting.
     * @type {?|undefined}
     */
    StoreResource.prototype.loading;
    /**
     * Errors received from the server after attempting to store the resource.
     * @type {?|undefined}
     */
    StoreResource.prototype.errors;
    /**
     * new resources may only obtain an id when posted to the server. Till that point
     * a StoreResource can assign make use of a temporary id and signal this by setting
     * this flag to true. The id will not be transmitted to the server and the resource
     * is removed from its temporary location (given by its id) as soon as it is posted
     * to the server.
     * @type {?|undefined}
     */
    StoreResource.prototype.hasTemporaryId;
}
//# sourceMappingURL=interfaces.js.map