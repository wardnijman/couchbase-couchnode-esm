import events from "events";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint jsdoc/require-jsdoc: off */
const events_1 = __importDefault(events);
/**
 * @internal
 */
class StreamablePromise extends events_1.default {
    /**
     * @internal
     */
    constructor(promisefyFn) {
        super();
        this._promise = null;
        this._promiseifyFn = promisefyFn;
    }
    get promise() {
        if (!this._promise) {
            this._promise = new Promise((resolve, reject) => this._promiseifyFn(this, resolve, reject));
        }
        return this._promise;
    }
    then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.promise.catch(onrejected);
    }
    finally(onfinally) {
        return this.promise.finally(onfinally);
    }
    /**
     * @internal
     */
    get [Symbol.toStringTag]() {
        return Promise[Symbol.toStringTag];
    }
}
/**
 * Provides the ability to be used as both a promise, or an event emitter.  Enabling
 * an application to easily retrieve all results using async/await, while also enabling
 * streaming of results by listening for the row and meta events.
 */
class StreamableRowPromise extends StreamablePromise {
    constructor(fn) {
        super((emitter, resolve, reject) => {
            let err;
            const rows = [];
            let meta;
            emitter.on('row', (r) => rows.push(r));
            emitter.on('meta', (m) => (meta = m));
            emitter.on('error', (e) => (err = e));
            emitter.on('end', () => {
                if (err) {
                    return reject(err);
                }
                resolve(fn(rows, meta));
            });
        });
    }
}
/**
 * Provides the ability to be used as both a promise, or an event emitter.  Enabling
 * an application to easily retrieve all results using async/await, while also enabling
 * streaming of results by listening for the replica event.
 */
class StreamableReplicasPromise extends StreamablePromise {
    constructor(fn) {
        super((emitter, resolve, reject) => {
            let err;
            const replicas = [];
            emitter.on('replica', (r) => replicas.push(r));
            emitter.on('error', (e) => (err = e));
            emitter.on('end', () => {
                if (err) {
                    return reject(err);
                }
                resolve(fn(replicas));
            });
        });
    }
}
class StreamableScanPromise extends StreamablePromise {
    constructor(fn) {
        super((emitter, resolve, reject) => {
            let err;
            const results = [];
            emitter.on('result', (r) => results.push(r));
            emitter.on('error', (e) => (err = e));
            emitter.on('end', () => {
                if (err) {
                    return reject(err);
                }
                resolve(fn(results));
            });
        });
        this._cancelRequested = false;
    }
    get cancelRequested() {
        return this._cancelRequested;
    }
    cancelStreaming() {
        this._cancelRequested = true;
    }
}
const StreamablePromise$0 = void 0;
export { StreamablePromise };
export { StreamablePromise$0 as StreamablePromise };
export { StreamableRowPromise };
