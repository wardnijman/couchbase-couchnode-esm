/// <reference types="node" />
import EventEmitter from 'events';
/**
 * @internal
 */
type PromisifyFunc<T> = (emitter: StreamablePromise<T>, resolve: (result: T) => void, reject: (err: Error) => void) => void;
/**
 * @internal
 */
export declare class StreamablePromise<T> extends EventEmitter implements Promise<T> {
    private _promise;
    private _promiseifyFn;
    /**
     * @internal
     */
    constructor(promisefyFn: PromisifyFunc<T>);
    private get promise();
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
    /**
     * @internal
     */
    get [Symbol.toStringTag](): string;
}
/**
 * Provides the ability to be used as both a promise, or an event emitter.  Enabling
 * an application to easily retrieve all results using async/await, while also enabling
 * streaming of results by listening for the row and meta events.
 */
export declare class StreamableRowPromise<T, TRow, TMeta> extends StreamablePromise<T> {
    constructor(fn: (rows: TRow[], meta: TMeta) => T);
}
/**
 * Provides the ability to be used as both a promise, or an event emitter.  Enabling
 * an application to easily retrieve all results using async/await, while also enabling
 * streaming of results by listening for the replica event.
 */
export declare class StreamableReplicasPromise<T, TRep> extends StreamablePromise<T> {
    constructor(fn: (replicas: TRep[]) => T);
}
export declare class StreamableScanPromise<T, TRes> extends StreamablePromise<T> {
    private _cancelRequested;
    constructor(fn: (results: TRes[]) => T);
    get cancelRequested(): boolean;
    cancelStreaming(): void;
}
export {};
