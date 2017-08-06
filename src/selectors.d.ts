import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/zip';
import { Store } from '@ngrx/store';
import { NgrxJsonApiConfig, NgrxJsonApiStore, NgrxJsonApiStoreData, NgrxJsonApiStoreResources, NgrxJsonApiStoreQueries, Resource, ResourceIdentifier, ResourceError, Query, StoreResource, ManyQueryResult, StoreQuery } from './interfaces';
export declare class NgrxJsonApiSelectors<T> {
    config: NgrxJsonApiConfig;
    constructor(config: NgrxJsonApiConfig);
    getNgrxJsonApiStore$(): (state$: Store<any>) => Store<any>;
    getStoreData$(): (state$: Store<NgrxJsonApiStore>) => Store<NgrxJsonApiStoreData>;
    getStoreResourceOfType$(type: string): (state$: Observable<NgrxJsonApiStore>) => Observable<NgrxJsonApiStoreResources>;
    queryStore$(query: Query): (state$: Observable<NgrxJsonApiStore>) => Observable<any>;
    getStoreQueries$(): (state$: Store<NgrxJsonApiStore>) => Store<NgrxJsonApiStoreQueries>;
    getResourceQuery$(queryId: string): (state$: Observable<NgrxJsonApiStore>) => Observable<StoreQuery>;
    getStoreResource$(identifier: ResourceIdentifier): (state$: Observable<NgrxJsonApiStore>) => Observable<StoreResource>;
    getManyResults$(queryId: string, denormalize: boolean): (state$: Observable<NgrxJsonApiStore>) => Observable<ManyQueryResult>;
    getOneResult$(queryId: string, denormalize: boolean): (state$: Observable<NgrxJsonApiStore>) => Observable<ManyQueryResult | {
        data: StoreResource;
        query: Query;
        loading: Boolean;
        resultIds?: ResourceIdentifier[];
        meta?: any;
        links?: any;
        errors: ResourceError[];
    }>;
    getPersistedResource$(store: Store<T>, identifier: ResourceIdentifier): (state$: Observable<NgrxJsonApiStore>) => Observable<Resource>;
}
