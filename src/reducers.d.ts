import { ActionReducerMap } from '@ngrx/store';
import { NgrxJsonApiStore } from './interfaces';
export declare const initialNgrxJsonApiState: NgrxJsonApiStore;
export declare function NgrxJsonApiStoreReducer(state: NgrxJsonApiStore, action: any): NgrxJsonApiStore;
export declare const reducer: ActionReducerMap<any>;
