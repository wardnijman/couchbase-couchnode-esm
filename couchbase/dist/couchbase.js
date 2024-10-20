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
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function (m, exports) {
    for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
            __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const binding_1 = __importDefault(binding);
/**
 * Acts as the entrypoint into the rest of the library.  Connecting to the cluster
 * and exposing the various services and features.
 *
 * @param connStr The connection string to use to connect to the cluster.
 * @param options Optional parameters for this operation.
 * @param callback A node-style callback to be invoked after execution.
 * @category Core
 */
async function connect(connStr, options, callback) {
    return cluster_1.Cluster.connect(connStr, options, callback);
}
/**
 * Volatile: This API is subject to change at any time.
 *
 * Exposes the underlying couchbase++ library protocol logger.  This method is for
 * logging/debugging purposes and must be used with caution as network details will
 * be logged to the provided file.
 *
 * @param filename Name of file protocol logger will save logging details.
 */
function enableProtocolLoggerToSaveNetworkTrafficToFile(filename) {
    binding_1.default.enableProtocolLogger(filename);
}
/**
 * Volatile: This API is subject to change at any time.
 *
 * Shutdowns the underlying couchbase++ logger.
 *
 */
function shutdownLogger() {
    binding_1.default.shutdownLogger();
}
__exportStar(analyticsindexmanager, exports);
__exportStar(analyticstypes, exports);
__exportStar(authenticators, exports);
__exportStar(binarycollection, exports);
__exportStar(bucket, exports);
__exportStar(bucketmanager, exports);
__exportStar(cluster_1, exports);
__exportStar(collection, exports);
__exportStar(collectionmanager, exports);
__exportStar(crudoptypes, exports);
__exportStar(datastructures, exports);
__exportStar(diagnosticstypes, exports);
__exportStar(errorcontexts, exports);
__exportStar(errors, exports);
__exportStar(eventingfunctionmanager, exports);
__exportStar(generaltypes, exports);
__exportStar(mutationstate, exports);
__exportStar(queryindexmanager, exports);
__exportStar(querytypes, exports);
__exportStar(scope, exports);
__exportStar(scopesearchindexmanager, exports);
__exportStar(sdspecs, exports);
__exportStar(searchfacet, exports);
__exportStar(searchindexmanager, exports);
__exportStar(searchquery, exports);
__exportStar(searchsort, exports);
__exportStar(searchtypes, exports);
__exportStar(streamablepromises, exports);
__exportStar(transactions, exports);
__exportStar(transcoders, exports);
__exportStar(usermanager, exports);
__exportStar(vectorsearch, exports);
__exportStar(viewexecutor, exports);
__exportStar(viewindexmanager, exports);
__exportStar(viewtypes, exports);
const connect$0 = void 0;
export const lcbVersion = binding_1.default.cbppVersion;
export const cbppVersion = binding_1.default.cbppVersion;
export const cbppMetadata = binding_1.default.cbppMetadata;
export { connect$0 as connect };
export { enableProtocolLoggerToSaveNetworkTrafficToFile };
export { shutdownLogger };
