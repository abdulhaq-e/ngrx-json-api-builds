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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/**
 * @record
 */
export function ApiApplyInitPayload() { }
function ApiApplyInitPayload_tsickle_Closure_declarations() {
    /**
     * optional list of resource identifiers to perform apply. If not specified all change will be applied
     * to the backend.
     * @type {?|undefined}
     */
    ApiApplyInitPayload.prototype.ids;
    /**
     * if the apply action is restricted to a set of resources with the ids parameter. The include flag allows to
     * specify which relationships to apply as well. Nested relationships are separated by a dot.
     * @type {?|undefined}
     */
    ApiApplyInitPayload.prototype.include;
}
/**
 * @record
 */
export function ApiApplyRollbackPayload() { }
function ApiApplyRollbackPayload_tsickle_Closure_declarations() {
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
NgrxJsonApiAction = /** @class */ (function () {
    function NgrxJsonApiAction() {
    }
    return NgrxJsonApiAction;
}());
/**
 * @abstract
 */
export { NgrxJsonApiAction };
function NgrxJsonApiAction_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiAction.prototype.zoneId;
    /** @type {?} */
    NgrxJsonApiAction.prototype.type;
}
var ApiApplyInitAction = /** @class */ (function (_super) {
    __extends(ApiApplyInitAction, _super);
    function ApiApplyInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_INIT;
        return _this;
    }
    return ApiApplyInitAction;
}(NgrxJsonApiAction));
export { ApiApplyInitAction };
function ApiApplyInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyInitAction.prototype.type;
    /** @type {?} */
    ApiApplyInitAction.prototype.payload;
    /** @type {?} */
    ApiApplyInitAction.prototype.zoneId;
}
var ApiApplySuccessAction = /** @class */ (function (_super) {
    __extends(ApiApplySuccessAction, _super);
    function ApiApplySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_SUCCESS;
        return _this;
    }
    return ApiApplySuccessAction;
}(NgrxJsonApiAction));
export { ApiApplySuccessAction };
function ApiApplySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplySuccessAction.prototype.type;
    /** @type {?} */
    ApiApplySuccessAction.prototype.payload;
    /** @type {?} */
    ApiApplySuccessAction.prototype.zoneId;
}
var ApiApplyFailAction = /** @class */ (function (_super) {
    __extends(ApiApplyFailAction, _super);
    function ApiApplyFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_APPLY_FAIL;
        return _this;
    }
    return ApiApplyFailAction;
}(NgrxJsonApiAction));
export { ApiApplyFailAction };
function ApiApplyFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiApplyFailAction.prototype.type;
    /** @type {?} */
    ApiApplyFailAction.prototype.payload;
    /** @type {?} */
    ApiApplyFailAction.prototype.zoneId;
}
var ApiPostInitAction = /** @class */ (function (_super) {
    __extends(ApiPostInitAction, _super);
    function ApiPostInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_INIT;
        return _this;
    }
    return ApiPostInitAction;
}(NgrxJsonApiAction));
export { ApiPostInitAction };
function ApiPostInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostInitAction.prototype.type;
    /** @type {?} */
    ApiPostInitAction.prototype.payload;
    /** @type {?} */
    ApiPostInitAction.prototype.zoneId;
}
var ApiPostSuccessAction = /** @class */ (function (_super) {
    __extends(ApiPostSuccessAction, _super);
    function ApiPostSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_SUCCESS;
        return _this;
    }
    return ApiPostSuccessAction;
}(NgrxJsonApiAction));
export { ApiPostSuccessAction };
function ApiPostSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostSuccessAction.prototype.type;
    /** @type {?} */
    ApiPostSuccessAction.prototype.payload;
    /** @type {?} */
    ApiPostSuccessAction.prototype.zoneId;
}
var ApiPostFailAction = /** @class */ (function (_super) {
    __extends(ApiPostFailAction, _super);
    function ApiPostFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_POST_FAIL;
        return _this;
    }
    return ApiPostFailAction;
}(NgrxJsonApiAction));
export { ApiPostFailAction };
function ApiPostFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPostFailAction.prototype.type;
    /** @type {?} */
    ApiPostFailAction.prototype.payload;
    /** @type {?} */
    ApiPostFailAction.prototype.zoneId;
}
var ApiDeleteInitAction = /** @class */ (function (_super) {
    __extends(ApiDeleteInitAction, _super);
    function ApiDeleteInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_INIT;
        return _this;
    }
    return ApiDeleteInitAction;
}(NgrxJsonApiAction));
export { ApiDeleteInitAction };
function ApiDeleteInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteInitAction.prototype.type;
    /** @type {?} */
    ApiDeleteInitAction.prototype.payload;
    /** @type {?} */
    ApiDeleteInitAction.prototype.zoneId;
}
var ApiDeleteSuccessAction = /** @class */ (function (_super) {
    __extends(ApiDeleteSuccessAction, _super);
    function ApiDeleteSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_SUCCESS;
        return _this;
    }
    return ApiDeleteSuccessAction;
}(NgrxJsonApiAction));
export { ApiDeleteSuccessAction };
function ApiDeleteSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.type;
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.payload;
    /** @type {?} */
    ApiDeleteSuccessAction.prototype.zoneId;
}
var ApiDeleteFailAction = /** @class */ (function (_super) {
    __extends(ApiDeleteFailAction, _super);
    function ApiDeleteFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_DELETE_FAIL;
        return _this;
    }
    return ApiDeleteFailAction;
}(NgrxJsonApiAction));
export { ApiDeleteFailAction };
function ApiDeleteFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiDeleteFailAction.prototype.type;
    /** @type {?} */
    ApiDeleteFailAction.prototype.payload;
    /** @type {?} */
    ApiDeleteFailAction.prototype.zoneId;
}
var ApiGetInitAction = /** @class */ (function (_super) {
    __extends(ApiGetInitAction, _super);
    function ApiGetInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_INIT;
        return _this;
    }
    return ApiGetInitAction;
}(NgrxJsonApiAction));
export { ApiGetInitAction };
function ApiGetInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetInitAction.prototype.type;
    /** @type {?} */
    ApiGetInitAction.prototype.payload;
    /** @type {?} */
    ApiGetInitAction.prototype.zoneId;
}
var ApiGetSuccessAction = /** @class */ (function (_super) {
    __extends(ApiGetSuccessAction, _super);
    function ApiGetSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_SUCCESS;
        return _this;
    }
    return ApiGetSuccessAction;
}(NgrxJsonApiAction));
export { ApiGetSuccessAction };
function ApiGetSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetSuccessAction.prototype.type;
    /** @type {?} */
    ApiGetSuccessAction.prototype.payload;
    /** @type {?} */
    ApiGetSuccessAction.prototype.zoneId;
}
var ApiGetFailAction = /** @class */ (function (_super) {
    __extends(ApiGetFailAction, _super);
    function ApiGetFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_GET_FAIL;
        return _this;
    }
    return ApiGetFailAction;
}(NgrxJsonApiAction));
export { ApiGetFailAction };
function ApiGetFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiGetFailAction.prototype.type;
    /** @type {?} */
    ApiGetFailAction.prototype.payload;
    /** @type {?} */
    ApiGetFailAction.prototype.zoneId;
}
var ApiRollbackAction = /** @class */ (function (_super) {
    __extends(ApiRollbackAction, _super);
    function ApiRollbackAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_ROLLBACK;
        return _this;
    }
    return ApiRollbackAction;
}(NgrxJsonApiAction));
export { ApiRollbackAction };
function ApiRollbackAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiRollbackAction.prototype.type;
    /** @type {?} */
    ApiRollbackAction.prototype.payload;
    /** @type {?} */
    ApiRollbackAction.prototype.zoneId;
}
var ApiPatchInitAction = /** @class */ (function (_super) {
    __extends(ApiPatchInitAction, _super);
    function ApiPatchInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_INIT;
        return _this;
    }
    return ApiPatchInitAction;
}(NgrxJsonApiAction));
export { ApiPatchInitAction };
function ApiPatchInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchInitAction.prototype.type;
    /** @type {?} */
    ApiPatchInitAction.prototype.payload;
    /** @type {?} */
    ApiPatchInitAction.prototype.zoneId;
}
var ApiPatchSuccessAction = /** @class */ (function (_super) {
    __extends(ApiPatchSuccessAction, _super);
    function ApiPatchSuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_SUCCESS;
        return _this;
    }
    return ApiPatchSuccessAction;
}(NgrxJsonApiAction));
export { ApiPatchSuccessAction };
function ApiPatchSuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchSuccessAction.prototype.type;
    /** @type {?} */
    ApiPatchSuccessAction.prototype.payload;
    /** @type {?} */
    ApiPatchSuccessAction.prototype.zoneId;
}
var ApiPatchFailAction = /** @class */ (function (_super) {
    __extends(ApiPatchFailAction, _super);
    function ApiPatchFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_PATCH_FAIL;
        return _this;
    }
    return ApiPatchFailAction;
}(NgrxJsonApiAction));
export { ApiPatchFailAction };
function ApiPatchFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiPatchFailAction.prototype.type;
    /** @type {?} */
    ApiPatchFailAction.prototype.payload;
    /** @type {?} */
    ApiPatchFailAction.prototype.zoneId;
}
var DeleteStoreResourceAction = /** @class */ (function (_super) {
    __extends(DeleteStoreResourceAction, _super);
    function DeleteStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.DELETE_STORE_RESOURCE;
        return _this;
    }
    return DeleteStoreResourceAction;
}(NgrxJsonApiAction));
export { DeleteStoreResourceAction };
function DeleteStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    DeleteStoreResourceAction.prototype.type;
    /** @type {?} */
    DeleteStoreResourceAction.prototype.payload;
    /** @type {?} */
    DeleteStoreResourceAction.prototype.zoneId;
}
var PatchStoreResourceAction = /** @class */ (function (_super) {
    __extends(PatchStoreResourceAction, _super);
    function PatchStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.PATCH_STORE_RESOURCE;
        return _this;
    }
    return PatchStoreResourceAction;
}(NgrxJsonApiAction));
export { PatchStoreResourceAction };
function PatchStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PatchStoreResourceAction.prototype.type;
    /** @type {?} */
    PatchStoreResourceAction.prototype.payload;
    /** @type {?} */
    PatchStoreResourceAction.prototype.zoneId;
}
var NewStoreResourceAction = /** @class */ (function (_super) {
    __extends(NewStoreResourceAction, _super);
    function NewStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.NEW_STORE_RESOURCE;
        return _this;
    }
    return NewStoreResourceAction;
}(NgrxJsonApiAction));
export { NewStoreResourceAction };
function NewStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    NewStoreResourceAction.prototype.type;
    /** @type {?} */
    NewStoreResourceAction.prototype.payload;
    /** @type {?} */
    NewStoreResourceAction.prototype.zoneId;
}
var PostStoreResourceAction = /** @class */ (function (_super) {
    __extends(PostStoreResourceAction, _super);
    function PostStoreResourceAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.POST_STORE_RESOURCE;
        return _this;
    }
    return PostStoreResourceAction;
}(NgrxJsonApiAction));
export { PostStoreResourceAction };
function PostStoreResourceAction_tsickle_Closure_declarations() {
    /** @type {?} */
    PostStoreResourceAction.prototype.type;
    /** @type {?} */
    PostStoreResourceAction.prototype.payload;
    /** @type {?} */
    PostStoreResourceAction.prototype.zoneId;
}
var RemoveQueryAction = /** @class */ (function (_super) {
    __extends(RemoveQueryAction, _super);
    function RemoveQueryAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.REMOVE_QUERY;
        return _this;
    }
    return RemoveQueryAction;
}(NgrxJsonApiAction));
export { RemoveQueryAction };
function RemoveQueryAction_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveQueryAction.prototype.type;
    /** @type {?} */
    RemoveQueryAction.prototype.payload;
    /** @type {?} */
    RemoveQueryAction.prototype.zoneId;
}
var LocalQueryInitAction = /** @class */ (function (_super) {
    __extends(LocalQueryInitAction, _super);
    function LocalQueryInitAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_INIT;
        return _this;
    }
    return LocalQueryInitAction;
}(NgrxJsonApiAction));
export { LocalQueryInitAction };
function LocalQueryInitAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryInitAction.prototype.type;
    /** @type {?} */
    LocalQueryInitAction.prototype.payload;
    /** @type {?} */
    LocalQueryInitAction.prototype.zoneId;
}
var LocalQuerySuccessAction = /** @class */ (function (_super) {
    __extends(LocalQuerySuccessAction, _super);
    function LocalQuerySuccessAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_SUCCESS;
        return _this;
    }
    return LocalQuerySuccessAction;
}(NgrxJsonApiAction));
export { LocalQuerySuccessAction };
function LocalQuerySuccessAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQuerySuccessAction.prototype.type;
    /** @type {?} */
    LocalQuerySuccessAction.prototype.payload;
    /** @type {?} */
    LocalQuerySuccessAction.prototype.zoneId;
}
var LocalQueryFailAction = /** @class */ (function (_super) {
    __extends(LocalQueryFailAction, _super);
    function LocalQueryFailAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.LOCAL_QUERY_FAIL;
        return _this;
    }
    return LocalQueryFailAction;
}(NgrxJsonApiAction));
export { LocalQueryFailAction };
function LocalQueryFailAction_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalQueryFailAction.prototype.type;
    /** @type {?} */
    LocalQueryFailAction.prototype.payload;
    /** @type {?} */
    LocalQueryFailAction.prototype.zoneId;
}
var CompactStoreAction = /** @class */ (function (_super) {
    __extends(CompactStoreAction, _super);
    function CompactStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.COMPACT_STORE;
        return _this;
    }
    return CompactStoreAction;
}(NgrxJsonApiAction));
export { CompactStoreAction };
function CompactStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    CompactStoreAction.prototype.type;
    /** @type {?} */
    CompactStoreAction.prototype.zoneId;
}
var ClearStoreAction = /** @class */ (function (_super) {
    __extends(ClearStoreAction, _super);
    function ClearStoreAction(zoneId) {
        var _this = _super.call(this) || this;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.CLEAR_STORE;
        return _this;
    }
    return ClearStoreAction;
}(NgrxJsonApiAction));
export { ClearStoreAction };
function ClearStoreAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ClearStoreAction.prototype.type;
    /** @type {?} */
    ClearStoreAction.prototype.zoneId;
}
var ApiQueryRefreshAction = /** @class */ (function (_super) {
    __extends(ApiQueryRefreshAction, _super);
    function ApiQueryRefreshAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.API_QUERY_REFRESH;
        if (!payload) {
            throw new Error('no query id provided for ApiQueryRefreshAction');
        }
        return _this;
    }
    return ApiQueryRefreshAction;
}(NgrxJsonApiAction));
export { ApiQueryRefreshAction };
function ApiQueryRefreshAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiQueryRefreshAction.prototype.type;
    /** @type {?} */
    ApiQueryRefreshAction.prototype.payload;
    /** @type {?} */
    ApiQueryRefreshAction.prototype.zoneId;
}
var ModifyStoreResourceErrorsAction = /** @class */ (function (_super) {
    __extends(ModifyStoreResourceErrorsAction, _super);
    function ModifyStoreResourceErrorsAction(payload, zoneId) {
        var _this = _super.call(this) || this;
        _this.payload = payload;
        _this.zoneId = zoneId;
        _this.type = NgrxJsonApiActionTypes.MODIFY_STORE_RESOURCE_ERRORS;
        return _this;
    }
    return ModifyStoreResourceErrorsAction;
}(NgrxJsonApiAction));
export { ModifyStoreResourceErrorsAction };
function ModifyStoreResourceErrorsAction_tsickle_Closure_declarations() {
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.type;
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.payload;
    /** @type {?} */
    ModifyStoreResourceErrorsAction.prototype.zoneId;
}
//# sourceMappingURL=actions.js.map