import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Store } from '@ngrx/store';
import { NgrxJsonApiSelectors } from './selectors';
import { NgrxJsonApiStore, Resource, ResourceIdentifier, Query, OneQueryResult, ManyQueryResult, StoreResource, ResourceError } from './interfaces';
export interface FindOptions {
    query: Query;
    fromServer?: boolean;
    denormalise?: boolean;
}
export interface PutQueryOptions {
    query: Query;
    fromServer?: boolean;
}
export interface PostResourceOptions {
    resource: Resource;
    toRemote?: boolean;
}
export interface PatchResourceOptions {
    resource: Resource;
    toRemote?: boolean;
}
export interface NewResourceOptions {
    resource: Resource;
}
export interface DeleteResourceOptions {
    resourceId: ResourceIdentifier;
    toRemote?: boolean;
}
/**
 * This internface is deprecated, do no longer use.
 */
export interface Options {
    query?: Query;
    denormalise?: boolean;
    fromServer?: boolean;
    resource?: Resource;
    toRemote?: boolean;
    resourceId?: ResourceIdentifier;
}
export declare class NgrxJsonApiService {
    private store;
    private selectors;
    private test;
    /**
     * Keeps current snapshot of the store to allow fast access to resources.
     */
    private _storeSnapshot;
    constructor(store: Store<any>, selectors: NgrxJsonApiSelectors<any>);
    findOne(options: FindOptions): Observable<OneQueryResult>;
    findMany(options: FindOptions): Observable<ManyQueryResult>;
    readonly storeSnapshot: NgrxJsonApiStore;
    /**
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
  
     * @param query
     * @param fromServer
     */
    putQuery(options: PutQueryOptions): void;
    refreshQuery(queryId: string): void;
    removeQuery(queryId: string): void;
    private findInternal(options, multi);
    private uuid();
    /**
     * Gets the current persisted state of the given resources.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param identifier
     */
    getPersistedResourceSnapshot(identifier: ResourceIdentifier): Resource;
    /**
     * Gets the current state of the given resources in the store.
     * Consider the use of selectResource(...) to get an observable of the resource.
     *
     * @param identifier
     */
    getResourceSnapshot(identifier: ResourceIdentifier): StoreResource;
    /**
     * Selects the data of the given query.
     *
     * @param queryId
     * @returns observable holding the data as array of resources.
     */
    selectManyResults(queryId: string, denormalize?: boolean): Observable<ManyQueryResult>;
    /**
     * Selects the data of the given query.
     *
     * @param queryId
     * @returns observable holding the data as array of resources.
     */
    selectOneResults(queryId: string, denormalize?: boolean): Observable<OneQueryResult>;
    /**
     * @param identifier of the resource
     * @returns observable of the resource
     */
    selectStoreResource(identifier: ResourceIdentifier): Observable<StoreResource>;
    denormaliseResource(storeResource$: Observable<StoreResource> | Observable<StoreResource[]>): Observable<StoreResource> | Observable<StoreResource[]>;
    getDenormalisedPath(path: string, resourceType: string): string;
    getDenormalisedValue(path: string, storeResource: StoreResource): any;
    /**
     * Updates the given resource in the store with the provided data.
     * Use commit() to send the changes to the remote JSON API endpoint.
     *
     * @param resource
     */
    patchResource(options: PatchResourceOptions): void;
    /**
     * Creates a new resources that is hold locally in the store
     * and my later be posted.
     *
     * @param resource
     */
    newResource(options: NewResourceOptions): void;
    /**
     * Adds the given resource to the store. Any already existing
     * resource with the same id gets replaced. Use commit() to send
     * the changes to the remote JSON API endpoint.
     *
     * @param resource
     */
    postResource(options: PostResourceOptions): void;
    /**
     * Marks the given resource for deletion.
     *
     * @param resourceId
     */
    deleteResource(options: DeleteResourceOptions): void;
    /**
     * Applies all pending changes to the remote JSON API endpoint.
     */
    apply(): void;
    /**
     * Clear all the contents from the store.
     */
    clear(): void;
    /**
     * Compacts the store by removing unreferences and unchanges resources.
     */
    compact(): void;
    /**
     * Adds the given errors to the resource with the given id.
     * @param id
     * @param errors
     */
    addResourceErrors(id: ResourceIdentifier, errors: Array<ResourceError>): void;
    /**
     * Removes the given errors to the resource with the given id.
     * @param id
     * @param errors
     */
    removeResourceErrors(id: ResourceIdentifier, errors: Array<ResourceError>): void;
    /**
     * Sets the given errors to the resource with the given id.
     * @param id
     * @param errors
     */
    setResourceErrors(id: ResourceIdentifier, errors: Array<ResourceError>): void;
}
