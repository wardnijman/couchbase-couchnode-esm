"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains the results of a Get operation.
 *
 * @category Key-Value
 */
class GetResult {
    /**
     * @internal
     */
    constructor(data) {
        this.content = data.content;
        this.cas = data.cas;
        this.expiryTime = data.expiryTime;
    }
    /**
     * BUG(JSCBC-784): This previously held the content of the document.
     *
     * @deprecated Use {@link GetResult.content} instead.
     */
    get value() {
        return this.content;
    }
    set value(v) {
        this.content = v;
    }
    /**
     * BUG(JSCBC-873): This was incorrectly named at release.
     *
     * @deprecated Use {@link GetResult.expiryTime} instead.
     */
    get expiry() {
        return this.expiryTime;
    }
}
/**
 * Contains the results of a Range or Sampling Scan operation.
 *
 * @category Key-Value
 */
class ScanResult {
    /**
     * @internal
     */
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.cas = data.cas;
        this.expiryTime = data.expiryTime;
    }
}
/**
 * Contains the results of an exists operation.
 *
 * @category Key-Value
 */
class ExistsResult {
    /**
     * @internal
     */
    constructor(data) {
        this.exists = data.exists;
        this.cas = data.cas;
    }
}
/**
 * Contains the results of a mutate-in operation.
 *
 * @category Key-Value
 */
class MutationResult {
    /**
     * @internal
     */
    constructor(data) {
        this.cas = data.cas;
        this.token = data.token;
    }
}
/**
 * Contains the results of a get from replica operation.
 *
 * @category Key-Value
 */
class GetReplicaResult {
    /**
     * @internal
     */
    constructor(data) {
        this.content = data.content;
        this.cas = data.cas;
        this.isReplica = data.isReplica;
    }
}
/**
 * Contains the results of a specific sub-operation within a lookup-in operation.
 *
 * @category Key-Value
 */
class LookupInResultEntry {
    /**
     * @internal
     */
    constructor(data) {
        this.error = data.error;
        this.value = data.value;
    }
}
/**
 * Contains the results of a lookup-in operation.
 *
 * @category Key-Value
 */
class LookupInResult {
    /**
     * @internal
     */
    constructor(data) {
        this.content = data.content;
        this.cas = data.cas;
    }
    /**
     * BUG(JSCBC-730): Previously held the content of the document.
     *
     * @deprecated Use {@link LookupInResult.content} instead.
     */
    get results() {
        return this.content;
    }
    set results(v) {
        this.content = v;
    }
}
/**
 * Contains the results of a lookup-in replica operation.
 *
 * @category Key-Value
 */
class LookupInReplicaResult {
    constructor(data) {
        this.content = data.content;
        this.cas = data.cas;
        this.isReplica = data.isReplica;
    }
}
/**
 * Contains the results of a specific sub-operation within a mutate-in operation.
 *
 * @category Key-Value
 */
class MutateInResultEntry {
    /**
     * @internal
     */
    constructor(data) {
        this.value = data.value;
    }
}
/**
 * Contains the results of a mutate-in operation.
 *
 * @category Key-Value
 */
class MutateInResult {
    /**
     * @internal
     */
    constructor(data) {
        this.content = data.content;
        this.cas = data.cas;
        this.token = data.token;
    }
}
/**
 * Contains the results of a counter operation (binary increment/decrement).
 *
 * @category Key-Value
 */
class CounterResult {
    /**
     * @internal
     */
    constructor(data) {
        this.value = data.value;
        this.cas = data.cas;
        this.token = data.token;
    }
}
const GetResult$0 = void 0;
export { GetResult$0 as GetResult };
export { ScanResult };
export { ExistsResult };
export { MutationResult };
export { GetReplicaResult };
export { LookupInResultEntry };
export { LookupInResult };
export { LookupInReplicaResult };
export { MutateInResultEntry };
export { MutateInResult };
export { CounterResult };
