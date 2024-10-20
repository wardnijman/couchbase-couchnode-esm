import * as bindingutilities_1 from "./bindingutilities.js";
import * as searchquery_1 from "./searchquery.js";
import * as searchtypes_1 from "./searchtypes.js";
import * as streamablepromises_1 from "./streamablepromises.js";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
class SearchExecutor {
    /**
     * @internal
     */
    constructor(cluster, bucketName, scopeName) {
        this._cluster = cluster;
        this._bucketName = bucketName;
        this._scopeName = scopeName;
    }
    /**
     * @internal
     */
    query(indexName, query, options) {
        const emitter = new streamablepromises_1.StreamableRowPromise((rows, meta) => {
            return new searchtypes_1.SearchResult({
                rows: rows,
                meta: meta,
            });
        });
        const searchQuery = query instanceof searchquery_1.SearchQuery
            ? JSON.stringify(query)
            : query.searchQuery
                ? JSON.stringify(query.searchQuery)
                : JSON.stringify(new searchquery_1.MatchNoneSearchQuery());
        const timeout = options.timeout || this._cluster.searchTimeout;
        const request = {
            timeout,
            index_name: indexName,
            query: searchQuery,
            limit: options.limit,
            skip: options.skip,
            explain: options.explain || false,
            disable_scoring: options.disableScoring || false,
            include_locations: options.includeLocations || false,
            highlight_style: options.highlight
                ? (0, bindingutilities_1.searchHighlightStyleToCpp)(options.highlight.style)
                : undefined,
            highlight_fields: options.highlight && options.highlight.fields
                ? options.highlight.fields
                : [],
            fields: options.fields || [],
            collections: options.collections || [],
            scan_consistency: (0, bindingutilities_1.searchScanConsistencyToCpp)(options.consistency),
            mutation_state: (0, bindingutilities_1.mutationStateToCpp)(options.consistentWith).tokens,
            sort_specs: options.sort
                ? options.sort.map((sort) => JSON.stringify(sort))
                : [],
            facets: options.facets
                ? Object.fromEntries(Object.entries(options.facets)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [k, JSON.stringify(v)]))
                : {},
            raw: options.raw
                ? Object.fromEntries(Object.entries(options.raw)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [k, JSON.stringify(v)]))
                : {},
            body_str: '',
            show_request: options.showRequest || false,
            log_request: options.logRequest || false,
            log_response: options.logResponse || false,
        };
        if (query instanceof searchtypes_1.SearchRequest) {
            if (query.vectorSearch) {
                request.vector_search = JSON.stringify(query.vectorSearch.queries);
                if (query.vectorSearch.options &&
                    query.vectorSearch.options.vectorQueryCombination) {
                    request.vector_query_combination = (0, bindingutilities_1.vectorQueryCombinationToCpp)(query.vectorSearch.options.vectorQueryCombination);
                }
            }
        }
        if (this._bucketName && this._scopeName) {
            request.bucket_name = this._bucketName;
            request.scope_name = this._scopeName;
        }
        this._cluster.conn.search(request, (cppErr, resp) => {
            const err = (0, bindingutilities_1.errorFromCpp)(cppErr);
            if (err) {
                emitter.emit('error', err);
                emitter.emit('end');
                return;
            }
            resp.rows.forEach((row) => {
                row.fields = row.fields ? JSON.parse(row.fields) : undefined;
                row.explanation = row.explanation
                    ? JSON.parse(row.explanation)
                    : undefined;
                emitter.emit('row', row);
            });
            {
                const metaData = resp.meta;
                emitter.emit('meta', {
                    facets: Object.fromEntries(Object.values(resp.facets).map((v) => [v.name, v])),
                    ...metaData,
                });
            }
            emitter.emit('end');
            return;
        });
        return emitter;
    }
}
const SearchExecutor$0 = void 0;
export { SearchExecutor };
export { SearchExecutor$0 as SearchExecutor };
export {  };
