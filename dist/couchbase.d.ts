import { Cluster, ConnectOptions } from './cluster';
import { NodeCallback } from './utilities';
/**
 * Acts as the entrypoint into the rest of the library.  Connecting to the cluster
 * and exposing the various services and features.
 *
 * @param connStr The connection string to use to connect to the cluster.
 * @param options Optional parameters for this operation.
 * @param callback A node-style callback to be invoked after execution.
 * @category Core
 */
export declare function connect(connStr: string, options?: ConnectOptions, callback?: NodeCallback<Cluster>): Promise<Cluster>;
/**
 * Exposes the underlying couchbase++ library version that is being used by the
 * SDK to perform I/O with the cluster.
 *
 * @deprecated Use {@link cbppVersion} instead.
 */
export declare const lcbVersion: string;
/**
 * Exposes the underlying couchbase++ library version that is being used by the
 * SDK to perform I/O with the cluster.
 */
export declare const cbppVersion: string;
export declare const cbppMetadata: string;
/**
 * Volatile: This API is subject to change at any time.
 *
 * Exposes the underlying couchbase++ library protocol logger.  This method is for
 * logging/debugging purposes and must be used with caution as network details will
 * be logged to the provided file.
 *
 * @param filename Name of file protocol logger will save logging details.
 */
export declare function enableProtocolLoggerToSaveNetworkTrafficToFile(filename: string): void;
/**
 * Volatile: This API is subject to change at any time.
 *
 * Shutdowns the underlying couchbase++ logger.
 *
 */
export declare function shutdownLogger(): void;
export * from './analyticsindexmanager.d.ts';
export * from './analyticstypes.d.ts';
export * from './authenticators.d.ts';
export * from './binarycollection.d.ts';
export * from './bucket.d.ts';
export * from './bucketmanager.d.ts';
export * from './cluster.d.ts';
export * from './collection.d.ts';
export * from './collectionmanager.d.ts';
export * from './crudoptypes.d.ts';
export * from './datastructures.d.ts';
export * from './diagnosticstypes.d.ts';
export * from './errorcontexts.d.ts';
export * from './errors.d.ts';
export * from './eventingfunctionmanager.d.ts';
export * from './generaltypes.d.ts';
export * from './mutationstate.d.ts';
export * from './queryindexmanager.d.ts';
export * from './querytypes.d.ts';
export * from './scope.d.ts';
export * from './scopesearchindexmanager.d.ts';
export * from './sdspecs.d.ts';
export * from './searchfacet.d.ts';
export * from './searchindexmanager.d.ts';
export * from './searchquery.d.ts';
export * from './searchsort.d.ts';
export * from './searchtypes.d.ts';
export * from './streamablepromises.d.ts';
export * from './transactions.d.ts';
export * from './transcoders.d.ts';
export * from './usermanager.d.ts';
export * from './vectorsearch.d.ts';
export * from './viewexecutor.d.ts';
export * from './viewindexmanager.d.ts';
export * from './viewtypes.d.ts';
export { Cas, NodeCallback } from './utilities';
