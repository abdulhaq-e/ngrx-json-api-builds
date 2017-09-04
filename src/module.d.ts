import { ModuleWithProviders, OpaqueToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiSelectors } from './selectors';
import { NgrxJsonApiService } from './services';
import { NgrxJsonApiConfig } from './interfaces';
export declare const NGRX_JSON_API_CONFIG: OpaqueToken;
export declare function apiFactory(http: HttpClient, config: NgrxJsonApiConfig): NgrxJsonApi;
export declare function selectorsFactory(config: NgrxJsonApiConfig): NgrxJsonApiSelectors;
export declare function serviceFactory(store: Store<any>, selectors: NgrxJsonApiSelectors): NgrxJsonApiService;
export declare function configure(config: NgrxJsonApiConfig): Array<any>;
export declare class NgrxJsonApiModule {
    static configure(config: NgrxJsonApiConfig): ModuleWithProviders;
}
