var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { selectManyQueryResult, selectNgrxJsonApiDefaultZone, selectNgrxJsonApiZone, selectOneQueryResult, selectStoreResource } from './selectors';
import { ApiApplyInitAction, ApiDeleteInitAction, ApiGetInitAction, ApiPatchInitAction, ApiPostInitAction, ApiQueryRefreshAction, ClearStoreAction, CompactStoreAction, DeleteStoreResourceAction, LocalQueryInitAction, ModifyStoreResourceErrorsAction, NewStoreResourceAction, PatchStoreResourceAction, PostStoreResourceAction, RemoveQueryAction, } from './actions';
import { NGRX_JSON_API_DEFAULT_ZONE, } from './interfaces';
import { denormaliseStoreResource, denormaliseStoreResources, getDenormalisedPath, getDenormalisedValue, uuid, } from './utils';
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
        var /** @type {?} */ fromServer = _.isUndefined(options.fromServer)
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
        if (denormalize === void 0) { denormalize = false; }
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
        if (denormalize === void 0) { denormalize = false; }
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
        var /** @type {?} */ toRemote = _.isUndefined(options.toRemote) ? false : options.toRemote;
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
export { NgrxJsonApiZoneService };
function NgrxJsonApiZoneService_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiZoneService.prototype.zoneId;
    /** @type {?} */
    NgrxJsonApiZoneService.prototype.store;
}
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
     * @param {?} storeResource$
     * @return {?}
     */
    NgrxJsonApiService.prototype.denormaliseResource = function (storeResource$) {
        return (storeResource$.combineLatest(this.store
            .let(selectNgrxJsonApiZone(this.zoneId))
            .map(function (state) { return state.data; }), function (storeResource, storeData) {
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
        var /** @type {?} */ pathSeparator = (_.get(this.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedPath(path, resourceType, this.config.resourceDefinitions, pathSeparator);
    };
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    NgrxJsonApiService.prototype.getDenormalisedValue = function (path, storeResource) {
        var /** @type {?} */ pathSeparator = (_.get(this.config, 'filteringConfig.pathSeparator'));
        return getDenormalisedValue(path, storeResource, this.config.resourceDefinitions, pathSeparator);
    };
    return NgrxJsonApiService;
}(NgrxJsonApiZoneService));
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
    NgrxJsonApiService.prototype.config;
}
//# sourceMappingURL=services.js.map