"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a search term for a RangeScan.
 *
 * @see {@link RangeScan}
 * @category Key-Value
 */
class ScanTerm {
    /**
     * @internal
     */
    constructor(term, exclusive) {
        this.term = term;
        this.exclusive = exclusive;
    }
}
/**
 * A RangeScan performs a scan on a range of keys with the range specified through
 * a start and end ScanTerm.
 *
 * @category Key-Value
 */
class RangeScan {
    /**
     * @internal
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns string representation of scan type.
     */
    getScanType() {
        return 'range_scan';
    }
}
/**
 * A SamplingScan performs a scan on a random sampling of keys with the sampling bounded by
 * a limit.
 *
 * @category Key-Value
 */
class SamplingScan {
    /**
     * @internal
     */
    constructor(limit, seed) {
        this.limit = limit;
        this.seed = seed;
    }
    /**
     * Returns string representation of scan type.
     */
    getScanType() {
        return 'sampling_scan';
    }
}
/**
 * A PrefixScan scan type selects every document whose ID starts with a certain prefix.
 *
 * @category key-value
 */
class PrefixScan {
    /**
     * @internal
     */
    constructor(prefix) {
        this.prefix = prefix;
    }
    /**
     * Returns string representation of scan type.
     */
    getScanType() {
        return 'prefix_scan';
    }
}
const ScanTerm$0 = void 0;
export { ScanTerm };
export { ScanTerm$0 as ScanTerm };
export { RangeScan };
