import binding from "./binding.js";
import * as cluster_1 from "./cluster.js";
import * as analyticsindexmanager from "./analyticsindexmanager.js";
import * as analyticstypes from "./analyticstypes.js";
import * as authenticators from "./authenticators.js";
import * as binarycollection from "./binarycollection.js";
import * as bucket from "./bucket.js";
import * as bucketmanager from "./bucketmanager.js";
import * as collection from "./collection.js";
import * as collectionmanager from "./collectionmanager.js";
import * as crudoptypes from "./crudoptypes.js";
import * as datastructures from "./datastructures.js";
import * as diagnosticstypes from "./diagnosticstypes.js";
import * as errorcontexts from "./errorcontexts.js";
import * as errors from "./errors.js";
import * as eventingfunctionmanager from "./eventingfunctionmanager.js";
import * as generaltypes from "./generaltypes.js";
import * as mutationstate from "./mutationstate.js";
import * as queryindexmanager from "./queryindexmanager.js";
import * as querytypes from "./querytypes.js";
import * as scope from "./scope.js";
import * as scopesearchindexmanager from "./scopesearchindexmanager.js";
import * as sdspecs from "./sdspecs.js";
import * as searchfacet from "./searchfacet.js";
import * as searchindexmanager from "./searchindexmanager.js";
import * as searchquery from "./searchquery.js";
import * as searchsort from "./searchsort.js";
import * as searchtypes from "./searchtypes.js";
import * as streamablepromises from "./streamablepromises.js";
import * as transactions from "./transactions.js";
import * as transcoders from "./transcoders.js";
import * as usermanager from "./usermanager.js";
import * as vectorsearch from "./vectorsearch.js";
import * as viewexecutor from "./viewexecutor.js";
import * as viewindexmanager from "./viewindexmanager.js";
import * as viewtypes from "./viewtypes.js";

// Exporting everything explicitly from each module
export * from "./analyticsindexmanager.js";
export * from "./analyticstypes.js";
export * from "./authenticators.js";
export * from "./binarycollection.js";
export * from "./bucket.js";
export * from "./bucketmanager.js";
export * from "./collection.js";
export * from "./collectionmanager.js";
export * from "./crudoptypes.js";
export * from "./datastructures.js";
export * from "./diagnosticstypes.js";
export * from "./errorcontexts.js";
export * from "./errors.js";
export * from "./eventingfunctionmanager.js";
export * from "./generaltypes.js";
export * from "./mutationstate.js";
export * from "./queryindexmanager.js";
export * from "./querytypes.js";
export * from "./scope.js";
export * from "./scopesearchindexmanager.js";
export * from "./sdspecs.js";
export * from "./searchfacet.js";
export * from "./searchindexmanager.js";
export * from "./searchquery.js";
export * from "./searchsort.js";
export * from "./searchtypes.js";
export * from "./streamablepromises.js";
export * from "./transactions.js";
export * from "./transcoders.js";
export * from "./usermanager.js";
export * from "./vectorsearch.js";
export * from "./viewexecutor.js";
export * from "./viewindexmanager.js";
export * from "./viewtypes.js";

/**
 * Acts as the entry point into the rest of the library. Connecting to the cluster
 * and exposing the various services and features.
 *
 * @param connStr The connection string to use to connect to the cluster.
 * @param options Optional parameters for this operation.
 * @param callback A node-style callback to be invoked after execution.
 * @category Core
 */
export async function connect(connStr, options, callback) {
    return cluster_1.Cluster.connect(connStr, options, callback);
}

/**
 * Volatile: This API is subject to change at any time.
 *
 * Exposes the underlying couchbase++ library protocol logger. This method is for
 * logging/debugging purposes and must be used with caution as network details will
 * be logged to the provided file.
 *
 * @param filename Name of file protocol logger will save logging details.
 */
export function enableProtocolLoggerToSaveNetworkTrafficToFile(filename) {
    binding.enableProtocolLogger(filename);
}

/**
 * Volatile: This API is subject to change at any time.
 *
 * Shutdowns the underlying couchbase++ logger.
 */
export function shutdownLogger() {
    binding.shutdownLogger();
}

// Constants
export const lcbVersion = binding.cbppVersion;
export const cbppVersion = binding.cbppVersion;
export const cbppMetadata = binding.cbppMetadata;
export {  };
