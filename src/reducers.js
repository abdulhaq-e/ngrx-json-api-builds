import { NgrxJsonApiActionTypes, } from './actions';
import { clearQueryResult, compactStore, deleteStoreResources, getPendingChanges, removeQuery, removeStoreResource, rollbackStoreResources, updateQueriesForDeletedResource, updateQueryErrors, updateQueryParams, updateQueryResults, updateResourceErrors, updateResourceErrorsForQuery, updateResourceState, updateStoreDataFromPayload, updateStoreDataFromResource, } from './utils';
export const /** @type {?} */ initialNgrxJsonApiState = {
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
export function NgrxJsonApiStoreReducer(state = initialNgrxJsonApiState, action) {
    let /** @type {?} */ newState;
    switch (action.type) {
        case NgrxJsonApiActionTypes.API_POST_INIT: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            newState = Object.assign({}, state, { data: updatedData, isCreating: state.isCreating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_INIT: {
            let /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query), isReading: state.isReading + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_INIT: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            newState = Object.assign({}, state, { data: updatedData, isUpdating: state.isUpdating + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_INIT: {
            newState = Object.assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED'), isDeleting: state.isDeleting + 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_SUCCESS: {
            newState = Object.assign({}, state, { data: updateStoreDataFromPayload(state.data, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_SUCCESS: {
            newState = Object.assign({}, state, { data: deleteStoreResources(state.data, action.payload.query), queries: updateQueriesForDeletedResource(state.queries, {
                    id: action.payload.query.id,
                    type: action.payload.query.type,
                }), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_QUERY_REFRESH: {
            // clear result ids and wait until new data is fetched (triggered by effect)
            newState = Object.assign({}, state, { queries: clearQueryResult(state.queries, action.payload) });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_POST_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isCreating: state.isCreating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_GET_FAIL: {
            newState = Object.assign({}, state, { queries: updateQueryErrors(state.queries, action.payload.query.queryId, action.payload.jsonApiData), isReading: state.isReading - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_PATCH_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isUpdating: state.isUpdating - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_DELETE_FAIL: {
            newState = Object.assign({}, state, { data: updateResourceErrorsForQuery(state.data, action.payload.query, action.payload.jsonApiData), isDeleting: state.isDeleting - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.REMOVE_QUERY: {
            let /** @type {?} */ queryId = (action.payload);
            newState = Object.assign({}, state, { queries: removeQuery(state.queries, queryId) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_INIT: {
            let /** @type {?} */ query = (action.payload);
            newState = Object.assign({}, state, { queries: updateQueryParams(state.queries, query) });
            return newState;
        }
        case NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS: {
            let /** @type {?} */ payload = (action.payload);
            newState = Object.assign({}, state, { data: updateResourceErrors(state.data, payload.resourceId, payload.errors, payload.modificationType) });
            return newState;
        }
        case NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS: {
            newState = Object.assign({}, state, { queries: updateQueryResults(state.queries, action.payload.query.queryId, action.payload.jsonApiData) });
            return newState;
        }
        case NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, false);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.POST_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.NEW_STORE_RESOURCE: {
            let /** @type {?} */ updatedData = updateStoreDataFromResource(state.data, action.payload, false, true);
            updatedData = updateResourceState(updatedData, action.payload, 'NEW');
            if (updatedData !== state.data) {
                newState = Object.assign({}, state, { data: updatedData });
                return newState;
            }
            else {
                return state;
            }
        }
        case NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE: {
            let /** @type {?} */ resourceId = (action.payload);
            if (state.data[resourceId.type] &&
                state.data[resourceId.type][resourceId.id]) {
                let /** @type {?} */ resource = state.data[resourceId.type][resourceId.id];
                if (resource.state === 'NEW' || resource.state === 'CREATED') {
                    // not yet stored on server-side, just delete
                    newState = Object.assign({}, state, { data: removeStoreResource(state.data, resourceId) });
                    return newState;
                }
                else {
                    // stored on server, mark for deletion
                    newState = Object.assign({}, state, { data: updateResourceState(state.data, action.payload, 'DELETED') });
                    return newState;
                }
            }
            return state;
        }
        case NgrxJsonApiActionTypes.API_APPLY_INIT: {
            let /** @type {?} */ payload = ((action)).payload;
            let /** @type {?} */ pending = getPendingChanges(state.data, payload.ids, payload.include);
            newState = Object.assign({}, state, { isApplying: state.isApplying + 1 });
            for (let /** @type {?} */ pendingChange of pending) {
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
            let /** @type {?} */ actions = (action.payload);
            newState = state;
            for (let /** @type {?} */ commitAction of actions) {
                newState = NgrxJsonApiStoreReducer(newState, commitAction);
            }
            newState = Object.assign({}, newState, { isApplying: state['isApplying'] - 1 });
            return newState;
        }
        case NgrxJsonApiActionTypes.API_ROLLBACK: {
            let /** @type {?} */ payload = ((action)).payload;
            newState = Object.assign({}, state, { data: rollbackStoreResources(state.data, payload.ids, payload.include) });
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
export const /** @type {?} */ reducer = {
    api: NgrxJsonApiStoreReducer,
};
//# sourceMappingURL=reducers.js.map