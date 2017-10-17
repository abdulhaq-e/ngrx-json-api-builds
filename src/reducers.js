var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { NgrxJsonApiActionTypes, } from './actions';
import { clearQueryResult, compactStore, deleteStoreResources, getPendingChanges, removeQuery, removeStoreResource, rollbackStoreResources, updateQueriesForDeletedResource, updateQueryErrors, updateQueryParams, updateQueryResults, updateResourceErrors, updateResourceErrorsForQuery, updateResourceState, updateStoreDataFromPayload, updateStoreDataFromResource, } from './utils';
export var /** @type {?} */ initialNgrxJsonApiState = {
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
export function NgrxJsonApiStoreReducer(state, action) {
    if (state === void 0) { state = initialNgrxJsonApiState; }
    var /** @type {?} */ newState;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            newState = __assign({}, state, { data: updatedData, isCreating: state.isCreating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            var /** @type {?} */ query = (action.payload);
            newState = __assign({}, state, { queries: updateQueryParams(state.queries, query), isReading: state.isReading + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            newState = __assign({}, state, { data: updatedData, isUpdating: state.isUpdating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newState = __assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED'), isDeleting: state.isDeleting + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newState = __assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newState = __assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newState = __assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newState = __assign({}, state, { data: deleteStoreResources(state.data, action.payload.query), queries: updateQueriesForDeletedResource(state.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newState = __assign({}, state, { queries: clearQueryResult(state.queries, action.payload) });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newState = __assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newState = __assign({}, state, { queries: updateQueryErrors(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newState = __assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newState = __assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            var /** @type {?} */ queryId = (action.payload);
            newState = __assign({}, state, { queries: removeQuery(state.queries, queryId) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            var /** @type {?} */ query = (action.payload);
            newState = __assign({}, state, { queries: updateQueryParams(state.queries, query) });
            return newState;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            var /** @type {?} */ payload = (action.payload);
            newState = __assign({}, state, { data: updateResourceErrors(state.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            newState = __assign({}, state, { queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData) });
            return newState;
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            if (updatedData !== state.data) {
                newState = __assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            if (updatedData !== state.data) {
                newState = __assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            var /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            updatedData = updateResourceState(updatedData, action.payload, 'NEW');
            if (updatedData !== state.data) {
                newState = __assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE: {
            var /** @type {?} */ resourceId = (action.payload);
            if (state.data[resourceId.type] &&
                state.data[resourceId.type][resourceId.id]) {
                var /** @type {?} */ resource = state.data[resourceId.type][resourceId.id];
                if (resource.state === 'NEW' || resource.state === 'CREATED') {
                    // not yet stored on server-side, just delete
                    newState = __assign({}, state, { data: removeStoreResource(state.data, resourceId) });
                    return newState;
                }
                else {
                    // stored on server, mark for deletion
                    newState = __assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED') });
                    return newState;
                }
            }
            return state;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            var /** @type {?} */ payload = ((action)).payload;
            var /** @type {?} */ pending_1 = getPendingChanges(state.data, payload.ids, payload.include);
            newState = __assign({}, state, { isApplying: state.isApplying + 1 });
            for (var _i = 0, pending_2 = pending_1; _i < pending_2.length; _i++) {
                var pendingChange = pending_2[_i];
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
            var /** @type {?} */ actions = (action.payload);
            newState = state;
            for (var _a = 0, actions_1 = actions; _a < actions_1.length; _a++) {
                var commitAction = actions_1[_a];
                newState = NgrxJsonApiStoreReducer(newState, commitAction);
            }
            newState = __assign({}, newState, { isApplying: state['isApplying'] - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            var /** @type {?} */ payload = ((action)).payload;
            newState = __assign({}, state, { data: rollbackStoreResources(state.data, payload.ids, payload.include) });
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
export var /** @type {?} */ reducer = {
    api: NgrxJsonApiStoreReducer,
};
//# sourceMappingURL=reducers.js.map