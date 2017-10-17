export var /** @type {?} */ NgrxJsonApiActionTypes = {
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
var ApiApplyInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiApplyInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
    }
    return ApiApplyInitAction;
}());
export { ApiApplyInitAction };
function ApiApplyInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyInitAction.prototype.type;
    /** @type {?} */
    ApiApplyInitAction.prototype.payload;
}
var ApiApplySuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiApplySuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
    }
    return ApiApplySuccessAction;
}());
export { ApiApplySuccessAction };
function ApiApplySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplySuccessAction.prototype.type;
    /** @type {?} */
    ApiApplySuccessAction.prototype.payload;
}
var ApiApplyFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiApplyFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
    }
    return ApiApplyFailAction;
}());
export { ApiApplyFailAction };
function ApiApplyFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyFailAction.prototype.type;
    /** @type {?} */
    ApiApplyFailAction.prototype.payload;
}
var ApiPostInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_INIT;
    }
    return ApiPostInitAction;
}());
export { ApiPostInitAction };
function ApiPostInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostInitAction.prototype.type;
    /** @type {?} */
    ApiPostInitAction.prototype.payload;
}
var ApiPostSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
    }
    return ApiPostSuccessAction;
}());
export { ApiPostSuccessAction };
function ApiPostSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostSuccessAction.prototype.type;
    /** @type {?} */
    ApiPostSuccessAction.prototype.payload;
}
var ApiPostFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPostFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
    }
    return ApiPostFailAction;
}());
export { ApiPostFailAction };
function ApiPostFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostFailAction.prototype.type;
    /** @type {?} */
    ApiPostFailAction.prototype.payload;
}
var ApiDeleteInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
    }
    return ApiDeleteInitAction;
}());
export { ApiDeleteInitAction };
function ApiDeleteInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteInitAction.prototype.type;
    /** @type {?} */
    ApiDeleteInitAction.prototype.payload;
}
var ApiDeleteSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
    }
    return ApiDeleteSuccessAction;
}());
export { ApiDeleteSuccessAction };
function ApiDeleteSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.type;
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.payload;
}
var ApiDeleteFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiDeleteFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
    }
    return ApiDeleteFailAction;
}());
export { ApiDeleteFailAction };
function ApiDeleteFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteFailAction.prototype.type;
    /** @type {?} */
    ApiDeleteFailAction.prototype.payload;
}
var ApiGetInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_INIT;
    }
    return ApiGetInitAction;
}());
export { ApiGetInitAction };
function ApiGetInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetInitAction.prototype.type;
    /** @type {?} */
    ApiGetInitAction.prototype.payload;
}
var ApiGetSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
    }
    return ApiGetSuccessAction;
}());
export { ApiGetSuccessAction };
function ApiGetSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetSuccessAction.prototype.type;
    /** @type {?} */
    ApiGetSuccessAction.prototype.payload;
}
var ApiGetFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiGetFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
    }
    return ApiGetFailAction;
}());
export { ApiGetFailAction };
function ApiGetFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetFailAction.prototype.type;
    /** @type {?} */
    ApiGetFailAction.prototype.payload;
}
var ApiRollbackAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiRollbackAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
    }
    return ApiRollbackAction;
}());
export { ApiRollbackAction };
function ApiRollbackAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiRollbackAction.prototype.type;
    /** @type {?} */
    ApiRollbackAction.prototype.payload;
}
var ApiPatchInitAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
    }
    return ApiPatchInitAction;
}());
export { ApiPatchInitAction };
function ApiPatchInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchInitAction.prototype.type;
    /** @type {?} */
    ApiPatchInitAction.prototype.payload;
}
var ApiPatchSuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchSuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
    }
    return ApiPatchSuccessAction;
}());
export { ApiPatchSuccessAction };
function ApiPatchSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchSuccessAction.prototype.type;
    /** @type {?} */
    ApiPatchSuccessAction.prototype.payload;
}
var ApiPatchFailAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiPatchFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
    }
    return ApiPatchFailAction;
}());
export { ApiPatchFailAction };
function ApiPatchFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchFailAction.prototype.type;
    /** @type {?} */
    ApiPatchFailAction.prototype.payload;
}
var DeleteStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function DeleteStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
    }
    return DeleteStoreResourceAction;
}());
export { DeleteStoreResourceAction };
function DeleteStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    DeleteStoreResourceAction.prototype.type;
    /** @type {?} */
    DeleteStoreResourceAction.prototype.payload;
}
var PatchStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function PatchStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
    }
    return PatchStoreResourceAction;
}());
export { PatchStoreResourceAction };
function PatchStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PatchStoreResourceAction.prototype.type;
    /** @type {?} */
    PatchStoreResourceAction.prototype.payload;
}
var NewStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function NewStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
    }
    return NewStoreResourceAction;
}());
export { NewStoreResourceAction };
function NewStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    NewStoreResourceAction.prototype.type;
    /** @type {?} */
    NewStoreResourceAction.prototype.payload;
}
var PostStoreResourceAction = (function () {
    /**
     * @param {?} payload
     */
    function PostStoreResourceAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
    }
    return PostStoreResourceAction;
}());
export { PostStoreResourceAction };
function PostStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PostStoreResourceAction.prototype.type;
    /** @type {?} */
    PostStoreResourceAction.prototype.payload;
}
var RemoveQueryAction = (function () {
    /**
     * @param {?} payload
     */
    function RemoveQueryAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
    }
    return RemoveQueryAction;
}());
export { RemoveQueryAction };
function RemoveQueryAction_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveQueryAction.prototype.type;
    /** @type {?} */
    RemoveQueryAction.prototype.payload;
}
var LocalQueryInitAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQueryInitAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
    }
    return LocalQueryInitAction;
}());
export { LocalQueryInitAction };
function LocalQueryInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryInitAction.prototype.type;
    /** @type {?} */
    LocalQueryInitAction.prototype.payload;
}
var LocalQuerySuccessAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQuerySuccessAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
    }
    return LocalQuerySuccessAction;
}());
export { LocalQuerySuccessAction };
function LocalQuerySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQuerySuccessAction.prototype.type;
    /** @type {?} */
    LocalQuerySuccessAction.prototype.payload;
}
var LocalQueryFailAction = (function () {
    /**
     * @param {?} payload
     */
    function LocalQueryFailAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
    }
    return LocalQueryFailAction;
}());
export { LocalQueryFailAction };
function LocalQueryFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryFailAction.prototype.type;
    /** @type {?} */
    LocalQueryFailAction.prototype.payload;
}
var CompactStoreAction = (function () {
    function CompactStoreAction() {
        this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
    }
    return CompactStoreAction;
}());
export { CompactStoreAction };
function CompactStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    CompactStoreAction.prototype.type;
}
var ClearStoreAction = (function () {
    function ClearStoreAction() {
        this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
    }
    return ClearStoreAction;
}());
export { ClearStoreAction };
function ClearStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ClearStoreAction.prototype.type;
}
var ApiQueryRefreshAction = (function () {
    /**
     * @param {?} payload
     */
    function ApiQueryRefreshAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
    }
    return ApiQueryRefreshAction;
}());
export { ApiQueryRefreshAction };
function ApiQueryRefreshAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiQueryRefreshAction.prototype.type;
    /** @type {?} */
    ApiQueryRefreshAction.prototype.payload;
}
var ModifyStoreResourceErrorsAction = (function () {
    /**
     * @param {?} payload
     */
    function ModifyStoreResourceErrorsAction(payload) {
        this.payload = payload;
        this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
    }
    return ModifyStoreResourceErrorsAction;
}());
export { ModifyStoreResourceErrorsAction };
function ModifyStoreResourceErrorsAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.type;
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.payload;
}
//# sourceMappingURL=actions.js.map