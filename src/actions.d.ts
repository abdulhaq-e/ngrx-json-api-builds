import { Action } from '@ngrx/store';
import { Payload, Resource, ResourceIdentifier, Query, ModifyStoreResourceErrorsPayload } from './interfaces';
export declare const NgrxJsonApiActionTypes: {
    API_POST_INIT: string;
    API_POST_SUCCESS: string;
    API_POST_FAIL: string;
    API_GET_INIT: string;
    API_GET_SUCCESS: string;
    API_GET_FAIL: string;
    API_PATCH_INIT: string;
    API_PATCH_SUCCESS: string;
    API_PATCH_FAIL: string;
    API_DELETE_INIT: string;
    API_DELETE_SUCCESS: string;
    API_DELETE_FAIL: string;
    API_APPLY_INIT: string;
    API_APPLY_SUCCESS: string;
    API_APPLY_FAIL: string;
    API_ROLLBACK: string;
    API_QUERY_REFRESH: string;
    LOCAL_QUERY_INIT: string;
    LOCAL_QUERY_SUCCESS: string;
    LOCAL_QUERY_FAIL: string;
    DELETE_STORE_RESOURCE: string;
    PATCH_STORE_RESOURCE: string;
    NEW_STORE_RESOURCE: string;
    POST_STORE_RESOURCE: string;
    MODIFY_STORE_RESOURCE_ERRORS: string;
    REMOVE_QUERY: string;
    COMPACT_STORE: string;
    CLEAR_STORE: string;
};
export declare class ApiApplyInitAction implements Action {
    readonly type: string;
}
export declare class ApiApplySuccessAction implements Action {
    payload: Array<Action>;
    readonly type: string;
    constructor(payload: Array<Action>);
}
export declare class ApiApplyFailAction implements Action {
    payload: Array<Action>;
    readonly type: string;
    constructor(payload: Array<Action>);
}
export declare class ApiPostInitAction implements Action {
    payload: Resource;
    readonly type: string;
    constructor(payload: Resource);
}
export declare class ApiPostSuccessAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiPostFailAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiDeleteInitAction implements Action {
    payload: ResourceIdentifier;
    readonly type: string;
    constructor(payload: ResourceIdentifier);
}
export declare class ApiDeleteSuccessAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiDeleteFailAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiGetInitAction implements Action {
    payload: Query;
    readonly type: string;
    constructor(payload: Query);
}
export declare class ApiGetSuccessAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiGetFailAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiRollbackAction implements Action {
    readonly type: string;
    constructor();
}
export declare class ApiPatchInitAction implements Action {
    payload: Resource;
    readonly type: string;
    constructor(payload: Resource);
}
export declare class ApiPatchSuccessAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class ApiPatchFailAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class DeleteStoreResourceAction implements Action {
    payload: ResourceIdentifier;
    readonly type: string;
    constructor(payload: ResourceIdentifier);
}
export declare class PatchStoreResourceAction implements Action {
    payload: Resource;
    readonly type: string;
    constructor(payload: Resource);
}
export declare class NewStoreResourceAction implements Action {
    payload: Resource;
    readonly type: string;
    constructor(payload: Resource);
}
export declare class PostStoreResourceAction implements Action {
    payload: Resource;
    readonly type: string;
    constructor(payload: Resource);
}
export declare class RemoveQueryAction implements Action {
    payload: string;
    readonly type: string;
    constructor(payload: string);
}
export declare class LocalQueryInitAction implements Action {
    payload: Query;
    readonly type: string;
    constructor(payload: Query);
}
export declare class LocalQuerySuccessAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class LocalQueryFailAction implements Action {
    payload: Payload;
    readonly type: string;
    constructor(payload: Payload);
}
export declare class CompactStoreAction implements Action {
    readonly type: string;
    constructor();
}
export declare class ClearStoreAction implements Action {
    readonly type: string;
    constructor();
}
export declare class ApiQueryRefreshAction implements Action {
    payload: string;
    readonly type: string;
    constructor(payload: string);
}
export declare class ModifyStoreResourceErrorsAction implements Action {
    payload: ModifyStoreResourceErrorsPayload;
    readonly type: string;
    constructor(payload: ModifyStoreResourceErrorsPayload);
}
export declare type NgrxJsonApiActions = ApiApplyInitAction | ApiApplySuccessAction | ApiApplyFailAction | ApiPostInitAction | ApiPostSuccessAction | ApiPostFailAction | ApiDeleteInitAction | ApiDeleteSuccessAction | ApiDeleteFailAction | ApiGetInitAction | ApiGetSuccessAction | ApiGetFailAction | ApiRollbackAction | ApiPatchInitAction | ApiPatchSuccessAction | ApiPatchFailAction | DeleteStoreResourceAction | PatchStoreResourceAction | PostStoreResourceAction | NewStoreResourceAction | RemoveQueryAction | ApiQueryRefreshAction | LocalQueryInitAction | LocalQuerySuccessAction | LocalQueryFailAction | ModifyStoreResourceErrorsAction | CompactStoreAction | ClearStoreAction;
