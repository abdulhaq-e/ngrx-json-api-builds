import { Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { NgrxJsonApiService } from './services';
var SelectStoreResourcePipe = (function () {
    /**
     * @param {?} service
     */
    function SelectStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    SelectStoreResourcePipe.prototype.transform = function (id) {
        return this.service.selectStoreResource(id);
    };
    SelectStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
    ];
    /**
     * @nocollapse
     */
    SelectStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return SelectStoreResourcePipe;
}());
export { SelectStoreResourcePipe };
function SelectStoreResourcePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectStoreResourcePipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SelectStoreResourcePipe.ctorParameters;
    /** @type {?} */
    SelectStoreResourcePipe.prototype.service;
}
var DenormaliseStoreResourcePipe = (function () {
    /**
     * @param {?} service
     */
    function DenormaliseStoreResourcePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    DenormaliseStoreResourcePipe.prototype.transform = function (obs) {
        return this.service.denormaliseResource(obs);
    };
    DenormaliseStoreResourcePipe.decorators = [
        { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
    ];
    /**
     * @nocollapse
     */
    DenormaliseStoreResourcePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return DenormaliseStoreResourcePipe;
}());
export { DenormaliseStoreResourcePipe };
function DenormaliseStoreResourcePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    DenormaliseStoreResourcePipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DenormaliseStoreResourcePipe.ctorParameters;
    /** @type {?} */
    DenormaliseStoreResourcePipe.prototype.service;
}
var GetDenormalisedValuePipe = (function () {
    /**
     * @param {?} service
     */
    function GetDenormalisedValuePipe(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    GetDenormalisedValuePipe.prototype.transform = function (path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    };
    GetDenormalisedValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
    ];
    /**
     * @nocollapse
     */
    GetDenormalisedValuePipe.ctorParameters = function () { return [
        { type: NgrxJsonApiService, },
    ]; };
    return GetDenormalisedValuePipe;
}());
export { GetDenormalisedValuePipe };
function GetDenormalisedValuePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    GetDenormalisedValuePipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GetDenormalisedValuePipe.ctorParameters;
    /** @type {?} */
    GetDenormalisedValuePipe.prototype.service;
}
//# sourceMappingURL=pipes.js.map