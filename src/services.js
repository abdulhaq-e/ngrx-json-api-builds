import * as _ from 'lodash/index';
import 'rxjs/add/operator/finally';
import { ApiApplyInitAction, ApiPostInitAction, ApiGetInitAction, ApiPatchInitAction, ApiDeleteInitAction, DeleteStoreResourceAction, PatchStoreResourceAction, PostStoreResourceAction, RemoveQueryAction, LocalQueryInitAction, ClearStoreAction, CompactStoreAction, ApiQueryRefreshAction, ModifyStoreResourceErrorsAction, NewStoreResourceAction, } from './actions';
import { denormaliseStoreResource, denormaliseStoreResources, getDenormalisedPath, getDenormalisedValue, uuid, } from './utils';
export class NgrxJsonApiService {
    /**
     * @param {?} store
     * @param {?} selectors
     */
    constructor(store, selectors) {
        this.store = store;
        this.selectors = selectors;
        this.test = true;
        this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .subscribe(it => (this.storeSnapshot = it));
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
     * Adds the given query to the store. Any existing query with the same queryId is replaced.
     * Make use of selectResults(...) to fetch the data.
     * @param {?} options
     * @return {?}
     */
    putQuery(options) {
        let /** @type {?} */ query = options.query;
        let /** @type {?} */ fromServer = _.isUndefined(options.fromServer)
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
        let /** @type {?} */ fromServer = _.isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        let /** @type {?} */ denormalise = _.isUndefined(options.denormalise)
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
        return this.store.let(this.selectors.getStoreResource$(identifier));
    }
    /**
     * @param {?} storeResource$
     * @return {?}
     */
    denormaliseResource(storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreData$()), (storeResource, storeData) => {
            if (_.isArray(storeResource)) {
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
        let /** @type {?} */ pathSeparator = (_.get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.selectors.config.resourceDefinitions, pathSeparator);
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    getDenormalisedValue(path, storeResource) {
        let /** @type {?} */ pathSeparator = (_.get(this.selectors.config, 'filteringConfig.pathSeparator'));
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
        let /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        let /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        let /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        this.store.dispatch(new ApiApplyInitAction());
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
function NgrxJsonApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiService.prototype.test;
    /**
     * Keeps current snapshot of the store to allow fast access to resources.
     * @type {?}
     */
    NgrxJsonApiService.prototype.storeSnapshot;
    /** @type {?} */
    NgrxJsonApiService.prototype.store;
    /** @type {?} */
    NgrxJsonApiService.prototype.selectors;
}
//# sourceMappingURL=services.js.map