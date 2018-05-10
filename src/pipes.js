/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { NgrxJsonApiService } from './services';
var SelectStoreResourcePipe = /** @class */ (function () {
    function SelectStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    SelectStoreResourcePipe.prototype.transform = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.service.selectStoreResource(id);
    };
    SelectStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return SelectStoreResourcePipe;
}());
export { SelectStoreResourcePipe };
function SelectStoreResourcePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectStoreResourcePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectStoreResourcePipe.ctorParameters;
    /** @type {?} */
    SelectStoreResourcePipe.prototype.service;
}
var SelectStoreResourcesPipe = /** @class */ (function () {
    function SelectStoreResourcesPipe(service) {
        this.service = service;
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    SelectStoreResourcesPipe.prototype.transform = /**
     * @param {?} ids
     * @return {?}
     */
    function (ids) {
        return this.service.selectStoreResources(ids);
    };
    SelectStoreResourcesPipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResources' },] },
    ];
    /** @nocollapse */
    SelectStoreResourcesPipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return SelectStoreResourcesPipe;
}());
export { SelectStoreResourcesPipe };
function SelectStoreResourcesPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectStoreResourcesPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectStoreResourcesPipe.ctorParameters;
    /** @type {?} */
    SelectStoreResourcesPipe.prototype.service;
}
var DenormaliseStoreResourcePipe = /** @class */ (function () {
    function DenormaliseStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    DenormaliseStoreResourcePipe.prototype.transform = /**
     * @param {?} obs
     * @return {?}
     */
    function (obs) {
        return this.service.denormaliseResource(obs);
    };
    DenormaliseStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
    ];
    /** @nocollapse */
    DenormaliseStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return DenormaliseStoreResourcePipe;
}());
export { DenormaliseStoreResourcePipe };
function DenormaliseStoreResourcePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DenormaliseStoreResourcePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DenormaliseStoreResourcePipe.ctorParameters;
    /** @type {?} */
    DenormaliseStoreResourcePipe.prototype.service;
}
var GetDenormalisedValuePipe = /** @class */ (function () {
    function GetDenormalisedValuePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    GetDenormalisedValuePipe.prototype.transform = /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    function (path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    };
    GetDenormalisedValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
    ];
    /** @nocollapse */
    GetDenormalisedValuePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return GetDenormalisedValuePipe;
}());
export { GetDenormalisedValuePipe };
function GetDenormalisedValuePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GetDenormalisedValuePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GetDenormalisedValuePipe.ctorParameters;
    /** @type {?} */
    GetDenormalisedValuePipe.prototype.service;
}
//# sourceMappingURL=pipes.js.map