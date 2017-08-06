import { NgModule, OpaqueToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiEffects } from './effects';
import { NgrxJsonApiSelectors } from './selectors';
import { NgrxJsonApiService } from './services';
import { reducer } from './reducers';
import { DenormaliseStoreResourcePipe, GetDenormalisedValuePipe, SelectStoreResourcePipe, } from './pipes';
export const /** @type {?} */ NGRX_JSON_API_CONFIG = new OpaqueToken('NGRX_JSON_API_CONFIG');
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
export function apiFactory(http, config) {
    return new NgrxJsonApi(http, config);
}
/**
 * @param {?} config
 * @return {?}
 */
export function selectorsFactory(config) {
    return new NgrxJsonApiSelectors(config);
}
/**
 * @param {?} store
 * @param {?} selectors
 * @return {?}
 */
export function serviceFactory(store, selectors) {
    return new NgrxJsonApiService(store, selectors);
}
/**
 * @param {?} config
 * @return {?}
 */
export function configure(config) {
    return [
        {
            provide: NgrxJsonApi,
            useFactory: apiFactory,
            deps: [HttpClient, NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
            deps: [NGRX_JSON_API_CONFIG],
        },
        {
            provide: NgrxJsonApiService,
            useFactory: serviceFactory,
            deps: [Store, NgrxJsonApiSelectors],
        },
        {
            provide: NGRX_JSON_API_CONFIG,
            useValue: config,
        },
    ];
}
export class NgrxJsonApiModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static configure(config) {
        return {
            ngModule: NgrxJsonApiModule,
            providers: configure(config),
        };
    }
}
NgrxJsonApiModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DenormaliseStoreResourcePipe,
                    GetDenormalisedValuePipe,
                    SelectStoreResourcePipe,
                ],
                imports: [
                    EffectsModule.forFeature([NgrxJsonApiEffects]),
                    StoreModule.forFeature('NgrxJsonApi', reducer, {}),
                ],
                exports: [
                    DenormaliseStoreResourcePipe,
                    GetDenormalisedValuePipe,
                    SelectStoreResourcePipe,
                ],
            },] },
];
/**
 * @nocollapse
 */
NgrxJsonApiModule.ctorParameters = () => [];
function NgrxJsonApiModule_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgrxJsonApiModule.ctorParameters;
}
//# sourceMappingURL=module.js.map