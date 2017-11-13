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
import { ManyQueryResult, NgrxJsonApiState, NgrxJsonApiStore, NgrxJsonApiStoreResources, NgrxJsonApiZone, OneQueryResult, Resource, ResourceIdentifier, NgrxJsonApiStoreQueries, StoreResource, NgrxJsonApiStoreData, StoreQuery } from './interfaces';
export declare function selectNgrxJson(): (state$: Store<any>) => Observable<NgrxJsonApiState>;
export declare function selectNgrxJsonApiDefaultZone(): (state$: Store<any>) => Observable<NgrxJsonApiZone>;
export declare function selectNgrxJsonApiZone(zoneId: string): (state$: Store<any>) => Observable<NgrxJsonApiZone>;
export declare function getNgrxJsonApiZone(state: any, zoneId: string): NgrxJsonApiZone;
export declare function selectStoreQuery(queryId: string): (state: Observable<NgrxJsonApiStore>) => Observable<StoreQuery>;
export declare function selectStoreResourcesOfType(type: string): (state: Observable<NgrxJsonApiStore>) => Observable<NgrxJsonApiStoreResources>;
export declare function selectStoreResource(identifier: ResourceIdentifier): (state$: Observable<NgrxJsonApiStore>) => Observable<StoreResource>;
export declare function selectManyQueryResult(queryId: string, denormalize?: boolean): (state: Observable<NgrxJsonApiStore>) => Observable<ManyQueryResult>;
export declare function selectOneQueryResult(queryId: string, denormalize?: boolean): (state: Observable<NgrxJsonApiStore>) => Observable<OneQueryResult>;
/**
 * deprecated, to not use any longer
 */
export declare function getNgrxJsonApiStore(state$: Store<any>): Observable<NgrxJsonApiStore>;
/**
 * deprecated, to not use any longer
 */
export declare class NgrxJsonApiSelectors {
    constructor();
    getNgrxJsonApiStore$(): (state$: Store<any>) => Observable<NgrxJsonApiStore>;
    getStoreData$(): (state$: Store<NgrxJsonApiStore>) => Observable<NgrxJsonApiStoreData>;
    getStoreResourceOfType$(type: string): (state$: Observable<NgrxJsonApiStore>) => Observable<NgrxJsonApiStoreResources>;
    getStoreQueries$(): (state$: Store<NgrxJsonApiStore>) => Store<NgrxJsonApiStoreQueries>;
    getResourceQuery$(queryId: string): (state: Observable<NgrxJsonApiStore>) => Observable<StoreQuery>;
    getStoreResource$(identifier: ResourceIdentifier): (state$: Observable<NgrxJsonApiStore>) => Observable<StoreResource>;
    getManyResults$(queryId: string, denormalize: boolean): (state: Observable<NgrxJsonApiStore>) => Observable<ManyQueryResult>;
    getOneResult$(queryId: string, denormalize: boolean): (state: Observable<NgrxJsonApiStore>) => Observable<OneQueryResult>;
    getPersistedResource$(identifier: ResourceIdentifier): (state$: Observable<NgrxJsonApiStore>) => Observable<Resource>;
}
