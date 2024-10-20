import "./errorcontexts.js";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A generic base error that all errors inherit.  Exposes the cause and
 * context of the error to enable easier debugging.
 *
 * @category Error Handling
 */
class CouchbaseError extends Error {
    constructor(message, cause, context) {
        super(message);
        this.name = this.constructor.name;
        this.stack = undefined;
        this.cause = cause;
        this.context = context;
    }
}
/**
 * Indicates that an operation was performed after a connection was closed.
 *
 * @category Error Handling
 */
class ConnectionClosedError extends CouchbaseError {
    constructor() {
        super('The connection has been closed.');
    }
}
/**
 * Indicates that an operation was performed after the cluster object was explicitly
 * closed by the user.
 *
 * @category Error Handling
 */
class ClusterClosedError extends CouchbaseError {
    constructor() {
        super('The parent cluster object has been closed.');
    }
}
/**
 * Indicates that an cluster-level operation could not be performed as no buckets
 * were open.  This occurs with pre-6.0 clusters which were not able to fetch cluster
 * topology without knowing the name of a bucket.
 *
 * @category Error Handling
 */
class NeedOpenBucketError extends CouchbaseError {
    constructor() {
        super('You must have one open bucket before you can perform queries.');
    }
}
/**
 * Indicates that the specific durability level was invalid.
 *
 * @category Error Handling
 */
class InvalidDurabilityLevel extends CouchbaseError {
    constructor() {
        super('An invalid durability level was specified.');
    }
}
/**
 * Indicates that the specific durabilityPersistTo level was invalid.
 *
 * @category Error Handling
 */
class InvalidDurabilityPersistToLevel extends CouchbaseError {
    constructor() {
        super('An invalid durability PersistTo level was specified.');
    }
}
/**
 * Indicates that the specific durabilityReplicateTo level was invalid.
 *
 * @category Error Handling
 */
class InvalidDurabilityReplicateToLevel extends CouchbaseError {
    constructor() {
        super('An invalid durability ReplicateTo level was specified.');
    }
}
/**
 * Indicates that the operation timed out.
 *
 * @category Error Handling
 */
class TimeoutError extends CouchbaseError {
    constructor(cause, context) {
        super('timeout', cause, context);
    }
}
/**
 * Indicates that the request was explicitly cancelled.
 *
 * @category Error Handling
 */
class RequestCanceledError extends CouchbaseError {
    constructor(cause, context) {
        super('request canceled', cause, context);
    }
}
/**
 * Indicates that one of the passed arguments was invalid.
 *
 * @category Error Handling
 */
class InvalidArgumentError extends CouchbaseError {
    constructor(cause, context) {
        super('invalid argument', cause, context);
    }
}
/**
 * Indicates that the operation requires a service which was not available.
 * For instance, attempting to perform a query without the query service
 * being enabled.
 *
 * @category Error Handling
 */
class ServiceNotAvailableError extends CouchbaseError {
    constructor(cause, context) {
        super('service not available', cause, context);
    }
}
/**
 * Indicates some form of internal error occured on the server and the
 * request could not be completed.
 *
 * @category Error Handling
 */
class InternalServerFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('internal server failure', cause, context);
    }
}
/**
 * Indicates that an error occurred authenticating the user to the cluster.
 *
 * @category Error Handling
 */
class AuthenticationFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('authentication failure', cause, context);
    }
}
/**
 * Indicates that a temporary failure occured, attempting the same operation
 * in the future may succeed.
 *
 * @category Error Handling
 */
class TemporaryFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('temporary failure', cause, context);
    }
}
/**
 * Indicates that a parsing failure occured.
 *
 * @category Error Handling
 */
class ParsingFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('parsing failure', cause, context);
    }
}
/**
 * Indicates that a CAS mismatch occurred.  This means that the document
 * has changed since the last access and should be fetched again before
 * attempting to make further changes.
 *
 * @category Error Handling
 */
class CasMismatchError extends CouchbaseError {
    constructor(cause, context) {
        super('cas mismatch', cause, context);
    }
}
/**
 * Indicates that the bucket being referenced does not exist.
 *
 * @category Error Handling
 */
class BucketNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('bucket not found', cause, context);
    }
}
/**
 * Indicates that the collection being referenced does not exist.
 *
 * @category Error Handling
 */
class CollectionNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('collection not found', cause, context);
    }
}
/**
 * Indicates that there was a failure during encoding.
 *
 * @category Error Handling
 */
class EncodingFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('encoding failure', cause, context);
    }
}
/**
 * Indicates that there was a failure during decoding.
 *
 * @category Error Handling
 */
class DecodingFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('decoding failure', cause, context);
    }
}
/**
 * Indicates that an operation which is not supported was executed.
 *
 * @category Error Handling
 */
class UnsupportedOperationError extends CouchbaseError {
    constructor(cause, context) {
        super('unsupported operation', cause, context);
    }
}
/**
 * Indicates that an ambiguous timeout has occured.  The outcome of the
 * operation is unknown, and it is possible that it completed after the
 * generation of this error.
 *
 * @category Error Handling
 */
class AmbiguousTimeoutError extends TimeoutError {
    constructor(cause, context) {
        super(cause, context);
        this.message = 'ambiguous timeout';
    }
}
/**
 * Indicates an unambiguous timeout has occurred.  The outcome of the
 * operation is objective failure and it is known to have not completed.
 *
 * @category Error Handling
 */
class UnambiguousTimeoutError extends TimeoutError {
    constructor(cause, context) {
        super(cause, context);
        this.message = 'unambiguous timeout';
    }
}
/**
 * Indicates a feature which is not available was used.  This primarily can
 * occur if you attempt to perform a query when no query services are enabled
 * on the cluster, or if a newer server feature which is not available in the
 * connected server version is used.
 *
 * @category Error Handling
 */
class FeatureNotAvailableError extends CouchbaseError {
    constructor(cause, context) {
        super('feature not available', cause, context);
    }
}
/**
 * Indicates that the referenced scope does not exist.
 *
 * @category Error Handling
 */
class ScopeNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('scope not found', cause, context);
    }
}
/**
 * Indicates that the referenced index does not exist.
 *
 * @category Error Handling
 */
class IndexNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('index not found', cause, context);
    }
}
/**
 * Indicates that a rate limit was exceeded while attempting to
 * execute the operation.
 *
 * @category Error Handling
 */
class RateLimitedError extends CouchbaseError {
    constructor(cause, context) {
        super('operation was rate limited', cause, context);
    }
}
/**
 * Indicates that a quota limit was exceeded while attempting to
 * execute the operation.
 *
 * @category Error Handling
 */
class QuotaLimitedError extends CouchbaseError {
    constructor(cause, context) {
        super('operation was quota limited', cause, context);
    }
}
/**
 * Indicates that the referenced index already existed, but was expected
 * to not yet exist for the operation.
 *
 * @category Error Handling
 */
class IndexExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('index exists', cause, context);
    }
}
/**
 * Indicates that the referenced document does not exist.
 *
 * @category Error Handling
 */
class DocumentNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('document not found', cause, context);
    }
}
/**
 * Indicates that the referenced document could not be retrieved.
 *
 * @category Error Handling
 */
class DocumentUnretrievableError extends CouchbaseError {
    constructor(cause, context) {
        super('document unretrievable', cause, context);
    }
}
/**
 * Indicates that the referenced document could not be used as it is currently
 * locked, likely by another actor in the system.
 *
 * @category Error Handling
 */
class DocumentLockedError extends CouchbaseError {
    constructor(cause, context) {
        super('document locked', cause, context);
    }
}
/**
 * Indicates that the referenced document is not locked.  Generally raised when an unlock
 * operation is performed.
 *
 * @category Error Handling
 */
class DocumentNotLockedError extends CouchbaseError {
    constructor(cause, context) {
        super('document not locked', cause, context);
    }
}
/**
 * Indicates that a value could not be stored as it was too large.
 *
 * @category Error Handling
 */
class ValueTooLargeError extends CouchbaseError {
    constructor(cause, context) {
        super('value too large', cause, context);
    }
}
/**
 * Indicates that the referenced document exists already, but the operation
 * was not expecting it to exist.
 *
 * @category Error Handling
 */
class DocumentExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('document exists', cause, context);
    }
}
/**
 * Indicates that a JSON operation was attempted with non-JSON data.
 *
 * @category Error Handling
 */
class ValueNotJsonError extends CouchbaseError {
    constructor(cause, context) {
        super('value not json', cause, context);
    }
}
/**
 * Indicates that a durability level which is not available was specified.
 *
 * @category Error Handling
 */
class DurabilityLevelNotAvailableError extends CouchbaseError {
    constructor(cause, context) {
        super('durability level not available', cause, context);
    }
}
/**
 * Indicates that a durability level which is impossible to achieve was
 * specified.  This can occur when you try to use Majority but there is
 * less than the majority of nodes available.
 *
 * @category Error Handling
 */
class DurabilityImpossibleError extends CouchbaseError {
    constructor(cause, context) {
        super('durability impossible', cause, context);
    }
}
/**
 * Indicates that the durable operation that was performed has failed
 * ambiguously and may or may not have completed, or may complete in
 * the future.
 *
 * @category Error Handling
 */
class DurabilityAmbiguousError extends CouchbaseError {
    constructor(cause, context) {
        super('durability ambiguous', cause, context);
    }
}
/**
 * Indicates that a write was failed as an existing durable write against
 * that key is already in progress.
 *
 * @category Error Handling
 */
class DurableWriteInProgressError extends CouchbaseError {
    constructor(cause, context) {
        super('durable write in progress', cause, context);
    }
}
/**
 * Indicates that a write was failed as the server is currently reconstructing
 * it's durable data following a failover.
 *
 * @category Error Handling
 */
class DurableWriteReCommitInProgressError extends CouchbaseError {
    constructor(cause, context) {
        super('durable write recommit in progress', cause, context);
    }
}
/**
 * Indicates that a mutation was lost.
 *
 * @category Error Handling
 */
class MutationLostError extends CouchbaseError {
    constructor(cause, context) {
        super('mutation lost', cause, context);
    }
}
/**
 * Indicates that the reference path was not found.
 *
 * @category Error Handling
 */
class PathNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('path not found', cause, context);
    }
}
/**
 * Indicates that the referenced path made incorrect assumptions about
 * the structure of a document, for instance attempting to access a field
 * as an object when in fact it is an array.
 *
 * @category Error Handling
 */
class PathMismatchError extends CouchbaseError {
    constructor(cause, context) {
        super('path mismatch', cause, context);
    }
}
/**
 * Indicates that the referenced path is not valid.
 *
 * @category Error Handling
 */
class PathInvalidError extends CouchbaseError {
    constructor(cause, context) {
        super('path invalid', cause, context);
    }
}
/**
 * Indicates that the specified path was too large to parse.
 *
 * @category Error Handling
 */
class PathTooBigError extends CouchbaseError {
    constructor(cause, context) {
        super('path too big', cause, context);
    }
}
/**
 * Indicates that the referenced path was too deep to parse.
 *
 * @category Error Handling
 */
class PathTooDeepError extends CouchbaseError {
    constructor(cause, context) {
        super('path too deep', cause, context);
    }
}
/**
 * Indicates that the document created by the operation would become
 * too deep to operate on.
 *
 * @category Error Handling
 */
class ValueTooDeepError extends CouchbaseError {
    constructor(cause, context) {
        super('value too deep', cause, context);
    }
}
/**
 * Indicates that the value passed is invalid.
 *
 * @category Error Handling
 */
class ValueInvalidError extends CouchbaseError {
    constructor(cause, context) {
        super('value invalid', cause, context);
    }
}
/**
 * Indicates that an operation expecting JSON was performed against a document
 * which is not JSON.
 *
 * @category Error Handling
 */
class DocumentNotJsonError extends CouchbaseError {
    constructor(cause, context) {
        super('document not json', cause, context);
    }
}
/**
 * Indicates that a number has grown too large.
 *
 * @category Error Handling
 */
class NumberTooBigError extends CouchbaseError {
    constructor(cause, context) {
        super('number too big', cause, context);
    }
}
/**
 * Indicates that the delta specified is invalid.
 *
 * @category Error Handling
 */
class DeltaInvalidError extends CouchbaseError {
    constructor(cause, context) {
        super('delta invalid', cause, context);
    }
}
/**
 * Indicates that the reference path already existed, but the operation
 * expected that it did not.
 *
 * @category Error Handling
 */
class PathExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('path exists', cause, context);
    }
}
/**
 * Indicates that a failure occurred while planning a query.
 *
 * @category Error Handling
 */
class PlanningFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('planning failure', cause, context);
    }
}
/**
 * Indicates that a failure occured while querying an index.
 *
 * @category Error Handling
 */
class IndexFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('index failure', cause, context);
    }
}
/**
 * Indicates that an error occurred with a prepared statement.
 *
 * @category Error Handling
 */
class PreparedStatementFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('prepared statement failure', cause, context);
    }
}
/**
 * Indicates that a generic DML error occurred with a query.
 *
 * @category Error Handling
 */
class DmlFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('generic dml failure', cause, context);
    }
}
/**
 * Indicates that the index was not ready yet.
 *
 * @category Error Handling
 */
class IndexNotReadyError extends CouchbaseError {
    constructor(cause, context) {
        super('index not ready', cause, context);
    }
}
/**
 * Indicates that an error occurred while compiling a query.
 *
 * @category Error Handling
 */
class CompilationFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('compilation failure', cause, context);
    }
}
/**
 * Indicates that the job queue for the service was full and further requests will
 * be rejected for a period of time until the queue shrinks.
 *
 * @category Error Handling
 */
class JobQueueFullError extends CouchbaseError {
    constructor(cause, context) {
        super('job queue full', cause, context);
    }
}
/**
 * Indicates that the referenced dataset does not exist.
 *
 * @category Error Handling
 */
class DatasetNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('dataset not found', cause, context);
    }
}
/**
 * Indicates that the referenced dataverse does not exist.
 *
 * @category Error Handling
 */
class DataverseNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('dataverse not found', cause, context);
    }
}
/**
 * Indicates that the referenced dataset already exists, but the operation
 * expected that it did not.
 *
 * @category Error Handling
 */
class DatasetExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('dataset exists', cause, context);
    }
}
/**
 * Indicates that the referenced dataverse already exists, but the operation
 * expected that it did not.
 *
 * @category Error Handling
 */
class DataverseExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('dataverse exists', cause, context);
    }
}
/**
 * Indicates that the referenced link does not exist.
 *
 * @category Error Handling
 */
class LinkNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('link not found', cause, context);
    }
}
/**
 * Indicates that the link already exists.
 *
 * @category Error Handling
 */
class LinkExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('link already exists', cause, context);
    }
}
/**
 * Indicates that the referenced view does not exist.
 *
 * @category Error Handling
 */
class ViewNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('view not found', cause, context);
    }
}
/**
 * Indicates that the referenced design document does not exist.
 *
 * @category Error Handling
 */
class DesignDocumentNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('design document not found', cause, context);
    }
}
/**
 * Indicates that the referenced collection already exists, but the operation
 * expected that it did not.
 *
 * @category Error Handling
 */
class CollectionExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('collection exists', cause, context);
    }
}
/**
 * Indicates that the referenced scope already exists, but the operation
 * expected that it did not.
 *
 * @category Error Handling
 */
class ScopeExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('scope exists', cause, context);
    }
}
/**
 * Indicates that the referenced user does not exist.
 *
 * @category Error Handling
 */
class UserNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('user not found', cause, context);
    }
}
/**
 * Indicates that the referenced group does not exist.
 *
 * @category Error Handling
 */
class GroupNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('group not found', cause, context);
    }
}
/**
 * Indicates that the referenced bucket already exists, but the operation
 * expected it to not exist.
 *
 * @category Error Handling
 */
class BucketExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('bucket exists', cause, context);
    }
}
/**
 * Indicates that the referenced user already exists, but the operation
 * expected it to not exist.
 *
 * @category Error Handling
 */
class UserExistsError extends CouchbaseError {
    constructor(cause, context) {
        super('user exists', cause, context);
    }
}
/**
 * Indicates that the bucket could not be flushed due to not having the flush
 * option enabled.  This option can be dynamically adjusted.
 *
 * @category Error Handling
 */
class BucketNotFlushableError extends CouchbaseError {
    constructor(cause, context) {
        super('bucket not flushable', cause, context);
    }
}
/**
 * Indicates that the referenced eventing function does not exist.
 *
 * @category Error Handling
 */
class EventingFunctionNotFoundError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function not found', cause, context);
    }
}
/**
 * Indicates that the referenced eventing function was not deployed but was
 * expected to have been.
 *
 * @category Error Handling
 */
class EventingFunctionNotDeployedError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function not deployed', cause, context);
    }
}
/**
 * Indicates that the eventing function was not able to be compiled.
 *
 * @category Error Handling
 */
class EventingFunctionCompilationFailureError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function compilation failed', cause, context);
    }
}
/**
 * Indicates that the source and metadata keyspaces both referenced the same
 * place for an eventing function.
 *
 * @category Error Handling
 */
class EventingFunctionIdenticalKeyspaceError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function identical keyspace', cause, context);
    }
}
/**
 * Indicates that an eventing function was deployed but has not yet fully
 * completed the bootstrapping process.
 *
 * @category Error Handling
 */
class EventingFunctionNotBootstrappedError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function not bootstrapped', cause, context);
    }
}
/**
 * Indicates that an eventing function is deployed but the operation expected
 * that it was not.
 *
 * @category Error Handling
 */
class EventingFunctionDeployedError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function deployed', cause, context);
    }
}
/**
 * Indicates that an eventing function is paused but the operation expected
 * that it was not.
 *
 * @category Error Handling
 */
class EventingFunctionPausedError extends CouchbaseError {
    constructor(cause, context) {
        super('eventing function paused', cause, context);
    }
}
/**
 * Indicates a transaction operation failed to complete.
 *
 * @category Error Handling
 */
class TransactionOperationFailedError extends CouchbaseError {
    constructor(cause, context) {
        super('transaction operation failed', cause, context);
    }
}
/**
 * Indicates a transaction failed to complete.
 *
 * @category Error Handling
 */
class TransactionFailedError extends CouchbaseError {
    constructor(cause, context) {
        super('transaction failed', cause, context);
    }
}
/**
 * Indicates a transaction failed to complete due to expiring.
 *
 * @category Error Handling
 */
class TransactionExpiredError extends CouchbaseError {
    constructor(cause) {
        super('transaction expired', cause);
    }
}
/**
 * Indicates the state of a transaction ended as ambiguous and may or
 * may not have committed successfully.
 *
 * @category Error Handling
 */
class TransactionCommitAmbiguousError extends CouchbaseError {
    constructor(cause) {
        super('transaction commit ambiguous', cause);
    }
}
const CouchbaseError$0 = void 0;
const NumberTooBigError$0 = void 0;
export { CouchbaseError$0 as CouchbaseError };
export { NumberTooBigError$0 as NumberTooBigError };
export { ConnectionClosedError };
export { ClusterClosedError };
export { NeedOpenBucketError };
export { InvalidDurabilityLevel };
export { InvalidDurabilityPersistToLevel };
export { InvalidDurabilityReplicateToLevel };
export { TimeoutError };
export { RequestCanceledError };
export { InvalidArgumentError };
export { ServiceNotAvailableError };
export { InternalServerFailureError };
export { AuthenticationFailureError };
export { TemporaryFailureError };
export { ParsingFailureError };
export { CasMismatchError };
export { BucketNotFoundError };
export { CollectionNotFoundError };
export { EncodingFailureError };
export { DecodingFailureError };
export { UnsupportedOperationError };
export { AmbiguousTimeoutError };
export { UnambiguousTimeoutError };
export { FeatureNotAvailableError };
export { ScopeNotFoundError };
export { IndexNotFoundError };
export { RateLimitedError };
export { QuotaLimitedError };
export { IndexExistsError };
export { DocumentNotFoundError };
export { DocumentUnretrievableError };
export { DocumentLockedError };
export { DocumentNotLockedError };
export { ValueTooLargeError };
export { DocumentExistsError };
export { ValueNotJsonError };
export { DurabilityLevelNotAvailableError };
export { DurabilityImpossibleError };
export { DurabilityAmbiguousError };
export { DurableWriteInProgressError };
export { DurableWriteReCommitInProgressError };
export { MutationLostError };
export { PathNotFoundError };
export { PathMismatchError };
export { PathInvalidError };
export { PathTooBigError };
export { PathTooDeepError };
export { ValueTooDeepError };
export { ValueInvalidError };
export { DocumentNotJsonError };
export { DeltaInvalidError };
export { PathExistsError };
export { PlanningFailureError };
export { IndexFailureError };
export { PreparedStatementFailureError };
export { DmlFailureError };
export { IndexNotReadyError };
export { CompilationFailureError };
export { JobQueueFullError };
export { DatasetNotFoundError };
export { DataverseNotFoundError };
export { DatasetExistsError };
export { DataverseExistsError };
export { LinkNotFoundError };
export { LinkExistsError };
export { ViewNotFoundError };
export { DesignDocumentNotFoundError };
export { CollectionExistsError };
export { ScopeExistsError };
export { UserNotFoundError };
export { GroupNotFoundError };
export { BucketExistsError };
export { UserExistsError };
export { BucketNotFlushableError };
export { EventingFunctionNotFoundError };
export { EventingFunctionNotDeployedError };
export { EventingFunctionCompilationFailureError };
export { EventingFunctionIdenticalKeyspaceError };
export { EventingFunctionNotBootstrappedError };
export { EventingFunctionDeployedError };
export { EventingFunctionPausedError };
export { TransactionOperationFailedError };
export { TransactionFailedError };
export { TransactionExpiredError };
export { TransactionCommitAmbiguousError };
