import { Pipe } from '@angular/core';
import 'rxjs/add/operator/let';
import { NgrxJsonApiService } from './services';
export class SelectStoreResourcePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    transform(id) {
        return this.service.selectStoreResource(id);
    }
}
SelectStoreResourcePipe.decorators = [
    { type: Pipe, args: [{ name: 'jaSelectStoreResource' },] },
];
/**
 * @nocollapse
 */
SelectStoreResourcePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];
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
export class DenormaliseStoreResourcePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    transform(obs) {
        return this.service.denormaliseResource(obs);
    }
}
DenormaliseStoreResourcePipe.decorators = [
    { type: Pipe, args: [{ name: 'denormaliseStoreResource' },] },
];
/**
 * @nocollapse
 */
DenormaliseStoreResourcePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];
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
export class GetDenormalisedValuePipe {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @param {?} path
     * @param {?} storeResource
     * @return {?}
     */
    transform(path, storeResource) {
        return this.service.getDenormalisedValue(path, storeResource);
    }
}
GetDenormalisedValuePipe.decorators = [
    { type: Pipe, args: [{ name: 'getDenormalisedValue' },] },
];
/**
 * @nocollapse
 */
GetDenormalisedValuePipe.ctorParameters = () => [
    { type: NgrxJsonApiService, },
];
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