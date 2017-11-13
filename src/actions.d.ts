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
export interface ApiApplyInitPayload {
    /**
     * optional list of resource identifiers to perform apply. If not specified all change will be applied
     * to the backend.
     */
    ids?: Array<ResourceIdentifier>;
    /**
     * if the apply action is restricted to a set of resources with the ids parameter. The include flag allows to
     * specify which relationships to apply as well. Nested relationships are separated by a dot.
     */
    include?: Array<string>;
}
export interface ApiApplyRollbackPayload extends ApiApplyInitPayload {
}
export declare abstract class NgrxJsonApiAction implements Action {
    abstract zoneId?: string;
    abstract type: string;
    constructor();
}
export declare class ApiApplyInitAction extends NgrxJsonApiAction {
    payload: ApiApplyInitPayload;
    zoneId: string;
    readonly type: string;
    constructor(payload: ApiApplyInitPayload, zoneId: string);
}
export declare class ApiApplySuccessAction extends NgrxJsonApiAction {
    payload: Array<Action>;
    zoneId: string;
    readonly type: string;
    constructor(payload: Array<Action>, zoneId: string);
}
export declare class ApiApplyFailAction extends NgrxJsonApiAction {
    payload: Array<Action>;
    zoneId: string;
    readonly type: string;
    constructor(payload: Array<Action>, zoneId: string);
}
export declare class ApiPostInitAction extends NgrxJsonApiAction {
    payload: Resource;
    zoneId: string;
    readonly type: string;
    constructor(payload: Resource, zoneId: string);
}
export declare class ApiPostSuccessAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiPostFailAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiDeleteInitAction extends NgrxJsonApiAction {
    payload: ResourceIdentifier;
    zoneId: string;
    readonly type: string;
    constructor(payload: ResourceIdentifier, zoneId: string);
}
export declare class ApiDeleteSuccessAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiDeleteFailAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiGetInitAction extends NgrxJsonApiAction {
    payload: Query;
    zoneId: string;
    readonly type: string;
    constructor(payload: Query, zoneId: string);
}
export declare class ApiGetSuccessAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiGetFailAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiRollbackAction extends NgrxJsonApiAction {
    payload: ApiApplyRollbackPayload;
    zoneId: string;
    readonly type: string;
    constructor(payload: ApiApplyRollbackPayload, zoneId: string);
}
export declare class ApiPatchInitAction extends NgrxJsonApiAction {
    payload: Resource;
    zoneId: string;
    readonly type: string;
    constructor(payload: Resource, zoneId: string);
}
export declare class ApiPatchSuccessAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class ApiPatchFailAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class DeleteStoreResourceAction extends NgrxJsonApiAction {
    payload: ResourceIdentifier;
    zoneId: string;
    readonly type: string;
    constructor(payload: ResourceIdentifier, zoneId: string);
}
export declare class PatchStoreResourceAction extends NgrxJsonApiAction {
    payload: Resource;
    zoneId: string;
    readonly type: string;
    constructor(payload: Resource, zoneId: string);
}
export declare class NewStoreResourceAction extends NgrxJsonApiAction {
    payload: Resource;
    zoneId: string;
    readonly type: string;
    constructor(payload: Resource, zoneId: string);
}
export declare class PostStoreResourceAction extends NgrxJsonApiAction {
    payload: Resource;
    zoneId: string;
    readonly type: string;
    constructor(payload: Resource, zoneId: string);
}
export declare class RemoveQueryAction extends NgrxJsonApiAction {
    payload: string;
    zoneId: string;
    readonly type: string;
    constructor(payload: string, zoneId: string);
}
export declare class LocalQueryInitAction extends NgrxJsonApiAction {
    payload: Query;
    zoneId: string;
    readonly type: string;
    constructor(payload: Query, zoneId: string);
}
export declare class LocalQuerySuccessAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class LocalQueryFailAction extends NgrxJsonApiAction {
    payload: Payload;
    zoneId: string;
    readonly type: string;
    constructor(payload: Payload, zoneId: string);
}
export declare class CompactStoreAction extends NgrxJsonApiAction {
    zoneId: string;
    readonly type: string;
    constructor(zoneId: string);
}
export declare class ClearStoreAction extends NgrxJsonApiAction {
    zoneId: string;
    readonly type: string;
    constructor(zoneId: string);
}
export declare class ApiQueryRefreshAction extends NgrxJsonApiAction {
    payload: string;
    zoneId: string;
    readonly type: string;
    constructor(payload: string, zoneId: string);
}
export declare class ModifyStoreResourceErrorsAction extends NgrxJsonApiAction {
    payload: ModifyStoreResourceErrorsPayload;
    zoneId: string;
    readonly type: string;
    constructor(payload: ModifyStoreResourceErrorsPayload, zoneId: string);
}
export declare type NgrxJsonApiActions = ApiApplyInitAction | ApiApplySuccessAction | ApiApplyFailAction | ApiPostInitAction | ApiPostSuccessAction | ApiPostFailAction | ApiDeleteInitAction | ApiDeleteSuccessAction | ApiDeleteFailAction | ApiGetInitAction | ApiGetSuccessAction | ApiGetFailAction | ApiRollbackAction | ApiPatchInitAction | ApiPatchSuccessAction | ApiPatchFailAction | DeleteStoreResourceAction | PatchStoreResourceAction | PostStoreResourceAction | NewStoreResourceAction | RemoveQueryAction | ApiQueryRefreshAction | LocalQueryInitAction | LocalQuerySuccessAction | LocalQueryFailAction | ModifyStoreResourceErrorsAction | CompactStoreAction | ClearStoreAction;
