import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import { ApiGetInitAction, ApiPostFailAction, ApiPostSuccessAction, ApiDeleteFailAction, ApiDeleteSuccessAction, ApiGetFailAction, ApiGetSuccessAction, ApiPatchFailAction, ApiPatchSuccessAction, LocalQuerySuccessAction, LocalQueryFailAction, ApiQueryRefreshAction } from './actions';
import { NgrxJsonApi } from './api';
import { NgrxJsonApiSelectors } from './selectors';
export declare class NgrxJsonApiEffects implements OnDestroy {
    private actions$;
    private jsonApi;
    private store;
    private selectors;
    createResource$: Observable<ApiPostSuccessAction | ApiPostFailAction>;
    updateResource$: Observable<ApiPatchSuccessAction | ApiPatchFailAction>;
    readResource$: Observable<ApiGetSuccessAction | ApiGetFailAction>;
    queryStore$: Observable<LocalQuerySuccessAction | LocalQueryFailAction>;
    deleteResource$: Observable<ApiDeleteSuccessAction | ApiDeleteFailAction>;
    triggerReadOnQueryRefresh$: Observable<ApiGetInitAction>;
    refreshQueriesOnDelete$: Observable<ApiQueryRefreshAction>;
    applyResources$: Observable<any>;
    constructor(actions$: Actions, jsonApi: NgrxJsonApi, store: Store<any>, selectors: NgrxJsonApiSelectors<any>);
    ngOnDestroy(): void;
    private toApplyAction(actions);
    private toErrorPayload(query, response);
    private generatePayload(resource, operation);
}
