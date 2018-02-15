import { OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatAll';
import { ApiDeleteFailAction, ApiDeleteSuccessAction, ApiGetInitAction, LocalQueryFailAction, LocalQuerySuccessAction } from './actions';
import { NgrxJsonApi } from './api';
export declare class NgrxJsonApiEffects implements OnDestroy {
    private actions$;
    private jsonApi;
    private store;
    createResource$: Observable<Action>;
    updateResource$: Observable<Action>;
    readResource$: Observable<Action>;
    private localQueryInitEventFor(query);
    private removeQueryEventFor(query);
    queryStore$: Observable<LocalQuerySuccessAction | LocalQueryFailAction>;
    private executeLocalQuery(query);
    deleteResource$: Observable<ApiDeleteSuccessAction | ApiDeleteFailAction>;
    triggerReadOnQueryRefresh$: Observable<ApiGetInitAction>;
    refreshQueriesOnDelete$: Observable<Action>;
    private handlePendingCreate(pendingChange, zoneId);
    private handlePendingUpdate(pendingChange, zoneId);
    private handlePendingDelete(pendingChange, zoneId);
    applyResources$: Observable<Action>;
    private config;
    constructor(actions$: Actions, jsonApi: NgrxJsonApi, store: Store<any>);
    ngOnDestroy(): void;
    private toApplyAction(actions, zoneId);
    private toErrorPayload(query, response);
    private generatePayload(resource, operation);
}
