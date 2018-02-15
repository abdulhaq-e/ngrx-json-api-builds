import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiService } from './services';
import { NgrxJsonApiConfig } from './interfaces';
import { NgrxJsonApiSelectors } from './selectors';
export declare const NGRX_JSON_API_CONFIG: InjectionToken<NgrxJsonApiConfig>;
export declare function apiFactory(http: HttpClient, config: NgrxJsonApiConfig): NgrxJsonApi;
/**
 * Deprecated, do not use any longer
 */
export declare function selectorsFactory(): NgrxJsonApiSelectors;
export declare function serviceFactory(store: Store<any>, config: NgrxJsonApiConfig): NgrxJsonApiService;
export declare function configure(config: NgrxJsonApiConfig): Array<any>;
export declare class NgrxJsonApiModule {
    static configure(config: NgrxJsonApiConfig): ModuleWithProviders;
}
