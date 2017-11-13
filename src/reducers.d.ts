import { NgrxJsonApiState, NgrxJsonApiZone } from './interfaces';
export declare const initialNgrxJsonApiZone: NgrxJsonApiZone;
export declare const initialNgrxJsonApiState: NgrxJsonApiState;
export declare function NgrxJsonApiStoreReducer(state: NgrxJsonApiState, action: any): NgrxJsonApiState;
export declare function NgrxJsonApiZoneReducer(zone: NgrxJsonApiZone, action: any): NgrxJsonApiZone;
export declare const reducer: typeof NgrxJsonApiStoreReducer;
