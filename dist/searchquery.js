"use strict";
/* eslint jsdoc/require-jsdoc: off */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Specifies how the individual match terms should be logically concatenated.
 *
 * @experimental This API is subject to change without notice.
 * @category Full Text Search
 */
var MatchOperator;
export { MatchOperator; };
export { MatchOperator; };
(function (MatchOperator) {
    /**
     * Specifies that individual match terms are concatenated with a logical OR - this is the default if not provided.
     */
    MatchOperator["Or"] = "or";
    /**
     * Specifies that individual match terms are concatenated with a logical AND.
     */
    MatchOperator["And"] = "and";
})(MatchOperator || (exports.MatchOperator = MatchOperator = {}));
function _parseGeoPoint(v) {
    if (Array.isArray(v)) {
        return v;
    }
    else if (v instanceof Object) {
        const latLonObj = v;
        if (latLonObj.lon || latLonObj.lat) {
            return [latLonObj.lon, latLonObj.lat];
        }
        else if (latLonObj.longitude || latLonObj.latitude) {
            return [latLonObj.longitude, latLonObj.latitude];
        }
    }
    throw new Error('invalid geopoint specified');
}
/**
 * @internal
 */
function _unpackListArgs(args) {
    if (Array.isArray(args[0])) {
        return args[0];
    }
    return args;
}
/**
 * Provides the ability to specify the query for a search query.
 *
 * @category Full Text Search
 */
class SearchQuery {
    constructor(data) {
        if (!data) {
            data = {};
        }
        this._data = data;
    }
    toJSON() {
        return this._data;
    }
    /**
     * @internal
     */
    static toJSON(query) {
        if (query.toJSON) {
            return query.toJSON();
        }
        return query;
    }
    /**
     * @internal
     */
    static hasProp(query, prop) {
        const json = this.toJSON(query);
        return json[prop] !== undefined;
    }
    static match(match) {
        return new MatchSearchQuery(match);
    }
    static matchPhrase(phrase) {
        return new MatchPhraseSearchQuery(phrase);
    }
    static regexp(regexp) {
        return new RegexpSearchQuery(regexp);
    }
    static queryString(query) {
        return new QueryStringSearchQuery(query);
    }
    static numericRange() {
        return new NumericRangeSearchQuery();
    }
    static dateRange() {
        return new DateRangeSearchQuery();
    }
    /**
     * @internal
     */
    static conjuncts(...args) {
        const queries = _unpackListArgs(args);
        return new ConjunctionSearchQuery(...queries);
    }
    /**
     * @internal
     */
    static disjuncts(...args) {
        const queries = _unpackListArgs(args);
        return new DisjunctionSearchQuery(...queries);
    }
    static boolean() {
        return new BooleanSearchQuery();
    }
    static wildcard(wildcard) {
        return new WildcardSearchQuery(wildcard);
    }
    /**
     * @internal
     */
    static docIds(...args) {
        const queries = _unpackListArgs(args);
        return new DocIdSearchQuery(...queries);
    }
    static booleanField(val) {
        return new BooleanFieldSearchQuery(val);
    }
    static term(term) {
        return new TermSearchQuery(term);
    }
    static phrase(terms) {
        return new PhraseSearchQuery(terms);
    }
    static prefix(prefix) {
        return new PrefixSearchQuery(prefix);
    }
    static matchAll() {
        return new MatchAllSearchQuery();
    }
    static matchNone() {
        return new MatchNoneSearchQuery();
    }
    static geoDistance(lon, lat, distance) {
        return new GeoDistanceSearchQuery(lon, lat, distance);
    }
    static geoBoundingBox(tl_lon, tl_lat, br_lon, br_lat) {
        return new GeoBoundingBoxSearchQuery(tl_lon, tl_lat, br_lon, br_lat);
    }
    static geoPolygon(points) {
        return new GeoPolygonSearchQuery(points);
    }
}
/**
 * Represents a match search query.
 *
 * @category Full Text Search
 */
class MatchSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(match) {
        super({
            match: match,
        });
    }
    operator(op) {
        this._data.operator = op;
        return this;
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    analyzer(analyzer) {
        this._data.analyzer = analyzer;
        return this;
    }
    prefixLength(prefixLength) {
        this._data.prefix_length = prefixLength;
        return this;
    }
    fuzziness(fuzziness) {
        this._data.fuzziness = fuzziness;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a match-phrase search query.
 *
 * @category Full Text Search
 */
class MatchPhraseSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(phrase) {
        super({
            match_phrase: phrase,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    analyzer(analyzer) {
        this._data.analyzer = analyzer;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a regexp search query.
 *
 * @category Full Text Search
 */
class RegexpSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(regexp) {
        super({
            regexp: regexp,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a query-string search query.
 *
 * @category Full Text Search
 */
class QueryStringSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(query) {
        super({
            query: query,
        });
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a numeric-range search query.
 *
 * @category Full Text Search
 */
class NumericRangeSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor() {
        super({});
    }
    min(min, inclusive) {
        if (inclusive === undefined) {
            inclusive = true;
        }
        this._data.min = min;
        this._data.inclusive_min = inclusive;
        return this;
    }
    max(max, inclusive) {
        if (inclusive === undefined) {
            inclusive = false;
        }
        this._data.max = max;
        this._data.inclusive_max = inclusive;
        return this;
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a date-range search query.
 *
 * @category Full Text Search
 */
class DateRangeSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor() {
        super({});
    }
    start(start, inclusive) {
        if (inclusive === undefined) {
            inclusive = true;
        }
        if (start instanceof Date) {
            this._data.start = start.toISOString();
        }
        else {
            this._data.start = start;
        }
        this._data.inclusive_start = inclusive;
        return this;
    }
    end(end, inclusive) {
        if (inclusive === undefined) {
            inclusive = false;
        }
        if (end instanceof Date) {
            this._data.end = end.toISOString();
        }
        else {
            this._data.end = end;
        }
        this._data.inclusive_end = inclusive;
        return this;
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    dateTimeParser(parser) {
        this._data.datetime_parser = parser;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a conjunction search query.
 *
 * @category Full Text Search
 */
class ConjunctionSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(...queries) {
        super({
            conjuncts: [],
        });
        this.and(...queries);
    }
    /**
     * @internal
     */
    and(...args) {
        const queries = _unpackListArgs(args);
        for (let i = 0; i < queries.length; ++i) {
            this._data.conjuncts.push(queries[i]);
        }
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a disjunction search query.
 *
 * @category Full Text Search
 */
class DisjunctionSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(...queries) {
        super({
            disjuncts: [],
        });
        this.or(...queries);
    }
    /**
     * @internal
     */
    or(...args) {
        const queries = _unpackListArgs(args);
        for (let i = 0; i < queries.length; ++i) {
            this._data.disjuncts.push(queries[i]);
        }
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a boolean search query.
 *
 * @category Full Text Search
 */
class BooleanSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor() {
        super({});
        this._shouldMin = undefined;
    }
    must(query) {
        if (!SearchQuery.hasProp(query, 'conjuncts')) {
            query = new ConjunctionSearchQuery(query);
        }
        this._data.must = query;
        return this;
    }
    should(query) {
        if (!SearchQuery.hasProp(query, 'disjuncts')) {
            query = new DisjunctionSearchQuery(query);
        }
        this._data.should = query;
        return this;
    }
    mustNot(query) {
        if (!SearchQuery.hasProp(query, 'disjuncts')) {
            query = new DisjunctionSearchQuery(query);
        }
        this._data.must_not = query;
        return this;
    }
    shouldMin(shouldMin) {
        this._shouldMin = shouldMin;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
    toJSON() {
        const out = {};
        if (this._data.must) {
            out.must = SearchQuery.toJSON(this._data.must);
        }
        if (this._data.should) {
            out.should = SearchQuery.toJSON(this._data.should);
            if (this._shouldMin) {
                out.should.min = this._shouldMin;
            }
        }
        if (this._data.must_not) {
            out.must_not = SearchQuery.toJSON(this._data.must_not);
        }
        return out;
    }
}
/**
 * Represents a wildcard search query.
 *
 * @category Full Text Search
 */
class WildcardSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(wildcard) {
        super({
            wildcard: wildcard,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a document-id search query.
 *
 * @category Full Text Search
 */
class DocIdSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(...ids) {
        super({
            ids: [],
        });
        this.addDocIds(...ids);
    }
    /**
     * @internal
     */
    addDocIds(...args) {
        const ids = _unpackListArgs(args);
        for (let i = 0; i < ids.length; ++i) {
            this._data.ids.push(ids[i]);
        }
        return this;
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a boolean-field search query.
 *
 * @category Full Text Search
 */
class BooleanFieldSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(val) {
        super({
            bool: val,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a term search query.
 *
 * @category Full Text Search
 */
class TermSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(term) {
        super({
            term: term,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    prefixLength(prefixLength) {
        this._data.prefix_length = prefixLength;
        return this;
    }
    fuzziness(fuzziness) {
        this._data.fuzziness = fuzziness;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a phrase search query.
 *
 * @category Full Text Search
 */
class PhraseSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(terms) {
        super({
            terms: terms,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a prefix search query.
 *
 * @category Full Text Search
 */
class PrefixSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(prefix) {
        super({
            prefix: prefix,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a match-all search query.
 *
 * @category Full Text Search
 */
class MatchAllSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor() {
        super({
            match_all: null,
        });
    }
}
/**
 * Represents a match-none search query.
 *
 * @category Full Text Search
 */
class MatchNoneSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor() {
        super({
            match_none: true,
        });
    }
}
/**
 * Represents a geo-distance search query.
 *
 * @category Full Text Search
 */
class GeoDistanceSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(lon, lat, distance) {
        super({
            location: [lon, lat],
            distance: distance,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a geo-bounding-box search query.
 *
 * @category Full Text Search
 */
class GeoBoundingBoxSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(tl_lon, tl_lat, br_lon, br_lat) {
        super({
            top_left: [tl_lon, tl_lat],
            bottom_right: [br_lon, br_lat],
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
/**
 * Represents a geo-polygon search query.
 *
 * @category Full Text Search
 */
class GeoPolygonSearchQuery extends SearchQuery {
    /**
     * @internal
     */
    constructor(points) {
        const mappedPoints = points.map((v) => _parseGeoPoint(v));
        super({
            polygon_points: mappedPoints,
        });
    }
    field(field) {
        this._data.field = field;
        return this;
    }
    boost(boost) {
        this._data.boost = boost;
        return this;
    }
}
const MatchOperator$0 = void 0;
export { MatchOperator$0 as MatchOperator };
export { SearchQuery };
export { MatchSearchQuery };
export { MatchPhraseSearchQuery };
export { RegexpSearchQuery };
export { QueryStringSearchQuery };
export { NumericRangeSearchQuery };
export { DateRangeSearchQuery };
export { ConjunctionSearchQuery };
export { DisjunctionSearchQuery };
export { BooleanSearchQuery };
export { WildcardSearchQuery };
export { DocIdSearchQuery };
export { BooleanFieldSearchQuery };
export { TermSearchQuery };
export { PhraseSearchQuery };
export { PrefixSearchQuery };
export { MatchAllSearchQuery };
export { MatchNoneSearchQuery };
export { GeoDistanceSearchQuery };
export { GeoBoundingBoxSearchQuery };
export { GeoPolygonSearchQuery };
