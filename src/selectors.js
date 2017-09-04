import * as _ from 'lodash/index';
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
import { filterResources, denormaliseStoreResource, denormaliseStoreResources, } from './utils';
export class NgrxJsonApiSelectors {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * @return {?}
     */
    getNgrxJsonApiStore$() {
        return (state$) => {
            // note that upon setup the store may not yet be initialized
            return state$.select('NgrxJsonApi').map(it => it ? it['api'] : undefined);
        };
    }
    /**
     * @return {?}
     */
    getStoreData$() {
        return (state$) => {
            return state$.select('data');
        };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getStoreResourceOfType$(type) {
        return (state$) => {
            return state$
                .let(this.getStoreData$())
                .map(resources => (resources ? resources[type] : undefined));
        };
    }
    /**
     * @param {?} query
     * @return {?}
     */
    queryStore$(query) {
        return (state$) => {
            let /** @type {?} */ selected$;
            if (!query.type) {
                return state$.map(() => Observable.throw('Unknown query'));
            }
            else if (query.type && query.id) {
                selected$ = state$.let(this.getStoreResource$({ type: query.type, id: query.id }));
            }
            else {
                selected$ = state$
                    .let(this.getStoreResourceOfType$(query.type))
                    .combineLatest(state$.let(this.getStoreData$()), (resources, storeData) => filterResources(resources, storeData, query, this.config.resourceDefinitions, this.config.filteringConfig));
            }
            return selected$.distinctUntilChanged();
        };
    }
    /**
     * @return {?}
     */
    getStoreQueries$() {
        return (state$) => {
            return state$.select('queries');
        };
    }
    /**
     * @param {?} queryId
     * @return {?}
     */
    getResourceQuery$(queryId) {
        return (state$) => {
            return state$
                .let(this.getStoreQueries$())
                .map(it => (it ? it[queryId] : undefined));
        };
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    getStoreResource$(identifier) {
        return (state$) => {
            return state$
                .let(this.getStoreResourceOfType$(identifier.type))
                .map(resources => ((resources ? resources[identifier.id] : undefined)));
        };
    }
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    getManyResults$(queryId, denormalize) {
        return (state$) => {
            return state$.map(state => {
                let /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (_.isEmpty(storeQuery.resultIds)) {
                    let /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : [] });
                    return queryResult;
                }
                else {
                    let /** @type {?} */ results = storeQuery.resultIds.map(id => (state.data[id.type] ? state.data[id.type][id.id] : undefined));
                    if (denormalize) {
                        results = denormaliseStoreResources(results, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: /** @type {?} */ (results) });
                }
            });
        };
    }
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    getOneResult$(queryId, denormalize) {
        return (state$) => {
            return state$.map(state => {
                let /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (_.isEmpty(storeQuery.resultIds)) {
                    let /** @type {?} */ queryResult = Object.assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : null });
                    return queryResult;
                }
                else {
                    if (storeQuery.resultIds.length >= 2) {
                        throw new Error('expected single result for query ' + storeQuery.query.queryId);
                    }
                    let /** @type {?} */ resultId = storeQuery.resultIds[0];
                    let /** @type {?} */ result = state.data[resultId.type]
                        ? state.data[resultId.type][resultId.id]
                        : undefined;
                    if (denormalize) {
                        result = denormaliseStoreResource(result, state.data);
                    }
                    return Object.assign({}, storeQuery, { data: result });
                }
            });
        };
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    getPersistedResource$(identifier) {
        return (state$) => {
            return state$
                .let(this.getStoreResource$(identifier))
                .map(it => (it ? it.persistedResource : undefined));
        };
    }
}
function NgrxJsonApiSelectors_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiSelectors.prototype.config;
}
//# sourceMappingURL=selectors.js.map