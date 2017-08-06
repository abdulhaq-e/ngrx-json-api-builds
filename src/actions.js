export const /** @type {?} */ NgrxJsonApiActionTypes = {
    API_POST_INIT: '[NgrxJsonApi] API_POST_INIT',
    API_POST_SUCCESS: '[NgrxJsonApi] API_POST_SUCCESS',
    API_POST_FAIL: '[NgrxJsonApi] API_POST_FAIL',
    API_GET_INIT: '[NgrxJsonApi] API_GET_INIT',
    API_GET_SUCCESS: '[NgrxJsonApi] API_GET_SUCCESS',
    API_GET_FAIL: '[NgrxJsonApi] API_GET_FAIL',
    API_PATCH_INIT: '[NgrxJsonApi] API_PATCH_INIT',
    API_PATCH_SUCCESS: '[NgrxJsonApi] API_PATCH_SUCCESS',
    API_PATCH_FAIL: '[NgrxJsonApi] API_PATCH_FAIL',
    API_DELETE_INIT: '[NgrxJsonApi] API_DELETE_INIT',
    API_DELETE_SUCCESS: '[NgrxJsonApi] API_DELETE_SUCCESS',
    API_DELETE_FAIL: '[NgrxJsonApi] API_DELETE_FAIL',
    API_APPLY_INIT: '[NgrxJsonApi] API_APPLY_INIT',
    API_APPLY_SUCCESS: '[NgrxJsonApi] API_APPLY_SUCCESS',
    API_APPLY_FAIL: '[NgrxJsonApi] API_APPLY_FAIL',
    API_ROLLBACK: '[NgrxJsonApi] API_ROLLBACK',
    API_QUERY_REFRESH: '[NgrxJsonApi] API_QUERY_REFRESH',
    LOCAL_QUERY_INIT: '[NgrxJsonApi] LOCAL_QUERY_INIT',
    LOCAL_QUERY_SUCCESS: '[NgrxJsonApi] LOCAL_QUERY_SUCCESS',
    LOCAL_QUERY_FAIL: '[NgrxJsonApi] LOCAL_QUERY_FAIL',
    DELETE_STORE_RESOURCE: '[NgrxJsonApi] DELETE_STORE_RESOURCE',
    PATCH_STORE_RESOURCE: '[NgrxJsonApi] PATCH_STORE_RESOURCE',
    NEW_STORE_RESOURCE: '[NgrxJsonApi] NEW_STORE_RESOURCE',
    POST_STORE_RESOURCE: '[NgrxJsonApi] POST_STORE_RESOURCE',
    MODIFY_STORE_RESOURCE_ERRORS: '[NgrxJsonApi] MODIFY_STORE_RESOURCE_ERRORS',
    REMOVE_QUERY: '[NgrxJsonApi] REMOVE_QUERY',
    COMPACT_STORE: '[NgrxJsonApi] COMPACT_STORE',
    CLEAR_STORE: '[NgrxJsonApi] CLEAR_STORE',
};
export class ApiApplyInitAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
    }
}
function ApiApplyInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyInitAction.prototype.type;
}
export class ApiApplySuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
    }
}
function ApiApplySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplySuccessAction.prototype.type;
    /** @type {?} */
    ApiApplySuccessAction.prototype.payload;
}
export class ApiApplyFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
    }
}
function ApiApplyFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyFailAction.prototype.type;
    /** @type {?} */
    ApiApplyFailAction.prototype.payload;
}
export class ApiPostInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_INIT;
    }
}
function ApiPostInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostInitAction.prototype.type;
    /** @type {?} */
    ApiPostInitAction.prototype.payload;
}
export class ApiPostSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
    }
}
function ApiPostSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostSuccessAction.prototype.type;
    /** @type {?} */
    ApiPostSuccessAction.prototype.payload;
}
export class ApiPostFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
    }
}
function ApiPostFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostFailAction.prototype.type;
    /** @type {?} */
    ApiPostFailAction.prototype.payload;
}
export class ApiDeleteInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
    }
}
function ApiDeleteInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteInitAction.prototype.type;
    /** @type {?} */
    ApiDeleteInitAction.prototype.payload;
}
export class ApiDeleteSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
    }
}
function ApiDeleteSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.type;
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.payload;
}
export class ApiDeleteFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
    }
}
function ApiDeleteFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteFailAction.prototype.type;
    /** @type {?} */
    ApiDeleteFailAction.prototype.payload;
}
export class ApiGetInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_INIT;
    }
}
function ApiGetInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetInitAction.prototype.type;
    /** @type {?} */
    ApiGetInitAction.prototype.payload;
}
export class ApiGetSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
    }
}
function ApiGetSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetSuccessAction.prototype.type;
    /** @type {?} */
    ApiGetSuccessAction.prototype.payload;
}
export class ApiGetFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
    }
}
function ApiGetFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetFailAction.prototype.type;
    /** @type {?} */
    ApiGetFailAction.prototype.payload;
}
export class ApiRollbackAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
    }
}
function ApiRollbackAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiRollbackAction.prototype.type;
}
export class ApiPatchInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
    }
}
function ApiPatchInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchInitAction.prototype.type;
    /** @type {?} */
    ApiPatchInitAction.prototype.payload;
}
export class ApiPatchSuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
    }
}
function ApiPatchSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchSuccessAction.prototype.type;
    /** @type {?} */
    ApiPatchSuccessAction.prototype.payload;
}
export class ApiPatchFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
    }
}
function ApiPatchFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchFailAction.prototype.type;
    /** @type {?} */
    ApiPatchFailAction.prototype.payload;
}
export class DeleteStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
    }
}
function DeleteStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    DeleteStoreResourceAction.prototype.type;
    /** @type {?} */
    DeleteStoreResourceAction.prototype.payload;
}
export class PatchStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
    }
}
function PatchStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PatchStoreResourceAction.prototype.type;
    /** @type {?} */
    PatchStoreResourceAction.prototype.payload;
}
export class NewStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
    }
}
function NewStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    NewStoreResourceAction.prototype.type;
    /** @type {?} */
    NewStoreResourceAction.prototype.payload;
}
export class PostStoreResourceAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
    }
}
function PostStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PostStoreResourceAction.prototype.type;
    /** @type {?} */
    PostStoreResourceAction.prototype.payload;
}
export class RemoveQueryAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
    }
}
function RemoveQueryAction_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveQueryAction.prototype.type;
    /** @type {?} */
    RemoveQueryAction.prototype.payload;
}
export class LocalQueryInitAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
    }
}
function LocalQueryInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryInitAction.prototype.type;
    /** @type {?} */
    LocalQueryInitAction.prototype.payload;
}
export class LocalQuerySuccessAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
    }
}
function LocalQuerySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQuerySuccessAction.prototype.type;
    /** @type {?} */
    LocalQuerySuccessAction.prototype.payload;
}
export class LocalQueryFailAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
    }
}
function LocalQueryFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryFailAction.prototype.type;
    /** @type {?} */
    LocalQueryFailAction.prototype.payload;
}
export class CompactStoreAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
    }
}
function CompactStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    CompactStoreAction.prototype.type;
}
export class ClearStoreAction {
    constructor() {
        this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
    }
}
function ClearStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ClearStoreAction.prototype.type;
}
export class ApiQueryRefreshAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
    }
}
function ApiQueryRefreshAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiQueryRefreshAction.prototype.type;
    /** @type {?} */
    ApiQueryRefreshAction.prototype.payload;
}
export class ModifyStoreResourceErrorsAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
    }
}
function ModifyStoreResourceErrorsAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.type;
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.payload;
}
//# sourceMappingURL=actions.js.map