var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
/**
 * @param {?} state$
 * @return {?}
 */
export function getNgrxJsonApiStore(state$) {
    return state$.select('NgrxJsonApi').filter(function (it) { return !_.isUndefined(it); }).map(function (it) { return it.api; });
}
var NgrxJsonApiSelectors = (function () {
    /**
     * @param {?} config
     */
    function NgrxJsonApiSelectors(config) {
        this.config = config;
    }
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getNgrxJsonApiStore$ = function () {
        return function (state$) {
            // note that upon setup the store may not yet be initialized
            return state$.select('NgrxJsonApi').filter(function (it) { return !_.isUndefined(it); }).map(function (it) { return it.api; });
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreData$ = function () {
        return function (state$) {
            return state$.select('data');
        };
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResourceOfType$ = function (type) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreData$())
                .map(function (resources) { return (resources ? resources[type] : undefined); });
        };
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.queryStore$ = function (query) {
        var _this = this;
        return function (state$) {
            var /** @type {?} */ selected$;
            if (!query.type) {
                return state$.map(function () { return Observable.throw('Unknown query'); });
            }
            else if (query.type && query.id) {
                selected$ = state$.let(_this.getStoreResource$({ type: query.type, id: query.id }));
            }
            else {
                selected$ = state$
                    .let(_this.getStoreResourceOfType$(query.type))
                    .combineLatest(state$.let(_this.getStoreData$()), function (resources, storeData) {
                    return filterResources(resources, storeData, query, _this.config.resourceDefinitions, _this.config.filteringConfig);
                });
            }
            return selected$.distinctUntilChanged();
        };
    };
    /**
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreQueries$ = function () {
        return function (state$) {
            return state$.select('queries');
        };
    };
    /**
     * @param {?} queryId
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getResourceQuery$ = function (queryId) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreQueries$())
                .map(function (it) { return (it ? it[queryId] : undefined); });
        };
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getStoreResource$ = function (identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResourceOfType$(identifier.type))
                .map(function (resources) { /** @type {?} */ return ((resources ? resources[identifier.id] : undefined)); });
        };
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getManyResults$ = function (queryId, denormalize) {
        return function (state$) {
            return state$.map(function (state) {
                var /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (_.isEmpty(storeQuery.resultIds)) {
                    var /** @type {?} */ queryResult = __assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : [] });
                    return queryResult;
                }
                else {
                    var /** @type {?} */ results = storeQuery.resultIds.map(function (id) { return (state.data[id.type] ? state.data[id.type][id.id] : undefined); });
                    if (denormalize) {
                        results = denormaliseStoreResources(results, state.data);
                    }
                    return __assign({}, storeQuery, { data: /** @type {?} */ (results) });
                }
            });
        };
    };
    /**
     * @param {?} queryId
     * @param {?} denormalize
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getOneResult$ = function (queryId, denormalize) {
        return function (state$) {
            return state$.map(function (state) {
                var /** @type {?} */ storeQuery = state.queries[queryId];
                if (!storeQuery) {
                    return undefined;
                }
                if (_.isEmpty(storeQuery.resultIds)) {
                    var /** @type {?} */ queryResult = __assign({}, storeQuery, { data: _.isUndefined(storeQuery.resultIds) ? undefined : null });
                    return queryResult;
                }
                else {
                    if (storeQuery.resultIds.length >= 2) {
                        throw new Error('expected single result for query ' + storeQuery.query.queryId);
                    }
                    var /** @type {?} */ resultId = storeQuery.resultIds[0];
                    var /** @type {?} */ result = state.data[resultId.type]
                        ? state.data[resultId.type][resultId.id]
                        : undefined;
                    if (denormalize) {
                        result = denormaliseStoreResource(result, state.data);
                    }
                    return __assign({}, storeQuery, { data: result });
                }
            });
        };
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    NgrxJsonApiSelectors.prototype.getPersistedResource$ = function (identifier) {
        var _this = this;
        return function (state$) {
            return state$
                .let(_this.getStoreResource$(identifier))
                .map(function (it) { return (it ? it.persistedResource : undefined); });
        };
    };
    return NgrxJsonApiSelectors;
}());
export { NgrxJsonApiSelectors };
function NgrxJsonApiSelectors_tsickle_Closure_declarations() {
    /** @type {?} */
    NgrxJsonApiSelectors.prototype.config;
}
//# sourceMappingURL=selectors.js.map