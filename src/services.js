var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash/index';
import 'rxjs/add/operator/finally';
import { ApiApplyInitAction, ApiPostInitAction, ApiGetInitAction, ApiPatchInitAction, ApiDeleteInitAction, DeleteStoreResourceAction, PatchStoreResourceAction, PostStoreResourceAction, RemoveQueryAction, LocalQueryInitAction, ClearStoreAction, CompactStoreAction, ApiQueryRefreshAction, ModifyStoreResourceErrorsAction, NewStoreResourceAction, } from './actions';
import { denormaliseStoreResource, denormaliseStoreResources, getDenormalisedPath, getDenormalisedValue, uuid, } from './utils';
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
        var /** @type {?} */ fromServer = _.isUndefined(options.fromServer)
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
        var /** @type {?} */ fromServer = _.isUndefined(options.fromServer)
            ? true
            : options.fromServer;
        var /** @type {?} */ denormalise = _.isUndefined(options.denormalise)
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
        return this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreResource$(identifier));
    };
    /**
     * @param {?} storeResource$
     * @return {?}
     */
    NgrxJsonApiService.prototype.denormaliseResource = function (storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(this.selectors.getNgrxJsonApiStore$())
            .let(this.selectors.getStoreData$()), function (storeResource, storeData) {
            if (_.isArray(storeResource)) {
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
        var /** @type {?} */ pathSeparator = (_.get(this.selectors.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.selectors.config.resourceDefinitions, pathSeparator);
    };
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedValue = function (path, storeResource) {
        var /** @type {?} */ pathSeparator = (_.get(this.selectors.config, 'filteringConfig.pathSeparator'));
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        this.store.dispatch(new ApiApplyInitAction({}));
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
export { NgrxJsonApiService };
function NgrxJsonApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiService.prototype.test;
    /**
     * Keeps current snapshot of the store to allow fast access to resources.
     * @type {?}
     */
    NgrxJsonApiService.prototype._storeSnapshot;
    /** @type {?} */
    NgrxJsonApiService.prototype.store;
    /** @type {?} */
    NgrxJsonApiService.prototype.selectors;
}
//# sourceMappingURL=services.js.map