import { CppTransactions, CppTransaction, CppTransactionLinks, CppTransactionGetMetaData } from './binding';
import { Cluster } from './cluster';
import { Collection } from './collection';
import { DurabilityLevel } from './generaltypes';
import { QueryMetaData, QueryProfileMode, QueryResult, QueryScanConsistency } from './querytypes';
import { Scope } from './scope';
import { Cas } from './utilities';
/**
 * Represents the path to a document.
 *
 * @category Transactions
 */
export declare class DocumentId {
    constructor();
    /**
     * The name of the bucket containing the document.
     */
    bucket: string;
    /**
     * The name of the scope containing the document.
     */
    scope: string;
    /**
     * The name of the collection containing the document.
     */
    collection: string;
    /**
     * The key of the docuemnt.
     */
    key: string;
}
/**
 * Specifies the configuration options for a Transaction Keyspace.
 *
 * @category Transactions
 */
export interface TransactionKeyspace {
    /**
     * The name of the bucket for the Keyspace.
     */
    bucket: string;
    /**
     * The name of the scope for the Keyspace.
     */
    scope?: string;
    /**
     * The name of the collection for the Keyspace.
     */
    collection?: string;
}
/**
 * Specifies the configuration options for Transactions cleanup.
 *
 * @category Transactions
 */
export interface TransactionsCleanupConfig {
    /**
     * Specifies the period of the cleanup system.
     */
    cleanupWindow?: number;
    /**
     * Specifies whether or not the cleanup system should clean lost attempts.
     */
    disableLostAttemptCleanup?: boolean;
    /**
     * Specifies whether or not the cleanup system should clean client attempts.
     */
    disableClientAttemptCleanup?: boolean;
}
/**
 * Specifies the configuration options for Transactions queries.
 *
 * @category Transactions
 */
export interface TransactionsQueryConfig {
    /**
     * Specifies the default scan consistency level for queries.
     */
    scanConsistency?: QueryScanConsistency;
}
/**
 * Specifies the configuration options for Transactions.
 *
 * @category Transactions
 */
export interface TransactionsConfig {
    /**
     * Specifies the level of synchronous durability level.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the default timeout for KV operations, specified in millseconds.
     *
     * @deprecated Currently a no-op.  CXXCBC-391: Adds support for ExtSDKIntegration which uses KV durable timeout internally.
     */
    kvTimeout?: number;
    /**
     * Specifies the default timeout for transactions.
     */
    timeout?: number;
    /**
     * Specifies the configuration for queries.
     */
    queryConfig?: TransactionsQueryConfig;
    /**
     * Specifies the configuration for the cleanup system.
     */
    cleanupConfig?: TransactionsCleanupConfig;
    /**
     * Specifies the Keyspace (bucket, scope & collection) for the transaction metadata.
     */
    metadataCollection?: TransactionKeyspace;
}
/**
 * Specifies the configuration options for a Transaction.
 *
 * @category Transactions
 */
export interface TransactionOptions {
    /**
     * Specifies the level of synchronous durability level.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the timeout for the transaction.
     */
    timeout?: number;
}
/**
 * Contains the results of a Transaction.
 *
 * @category Transactions
 */
export declare class TransactionResult {
    /**
     * @internal
     */
    constructor(data: {
        transactionId: string;
        unstagingComplete: boolean;
    });
    /**
     * The ID of the completed transaction.
     */
    transactionId: string;
    /**
     * Whether all documents were successfully unstaged and are now available
     * for non-transactional operations to see.
     */
    unstagingComplete: boolean;
}
/**
 * Contains the results of a transactional Get operation.
 *
 * @category Transactions
 */
export declare class TransactionGetResult {
    /**
     * @internal
     */
    constructor(data: TransactionGetResult);
    /**
     * The id of the document.
     */
    id: DocumentId;
    /**
     * The content of the document.
     */
    content: any;
    /**
     * The CAS of the document.
     */
    cas: Cas;
    /**
     * @internal
     */
    _links: CppTransactionLinks;
    /**
     * @internal
     */
    _metadata: CppTransactionGetMetaData;
}
/**
 * Contains the results of a transactional Query operation.
 *
 * @category Transactions
 */
export declare class TransactionQueryResult<TRow = any> {
    /**
     * The rows which have been returned by the query.
     */
    rows: TRow[];
    /**
     * The meta-data which has been returned by the query.
     */
    meta: QueryMetaData;
    /**
     * @internal
     */
    constructor(data: QueryResult);
}
/**
 * @category Transactions
 */
export interface TransactionQueryOptions {
    /**
     * Values to be used for the placeholders within the query.
     */
    parameters?: {
        [key: string]: any;
    } | any[];
    /**
     * Specifies the consistency requirements when executing the query.
     *
     * @see QueryScanConsistency
     */
    scanConsistency?: QueryScanConsistency;
    /**
     * Specifies whether this is an ad-hoc query, or if it should be prepared
     * for faster execution in the future.
     */
    adhoc?: boolean;
    /**
     * The returned client context id for this query.
     */
    clientContextId?: string;
    /**
     * This is an advanced option, see the query service reference for more
     * information on the proper use and tuning of this option.
     */
    maxParallelism?: number;
    /**
     * This is an advanced option, see the query service reference for more
     * information on the proper use and tuning of this option.
     */
    pipelineBatch?: number;
    /**
     * This is an advanced option, see the query service reference for more
     * information on the proper use and tuning of this option.
     */
    pipelineCap?: number;
    /**
     * This is an advanced option, see the query service reference for more
     * information on the proper use and tuning of this option.  Specified
     * in milliseconds.
     */
    scanWait?: number;
    /**
     * This is an advanced option, see the query service reference for more
     * information on the proper use and tuning of this option.
     */
    scanCap?: number;
    /**
     * Specifies that this query should be executed in read-only mode, disabling
     * the ability for the query to make any changes to the data.
     */
    readOnly?: boolean;
    /**
     * Specifies the level of profiling that should be used for the query.
     */
    profile?: QueryProfileMode;
    /**
     * Specifies whether metrics should be captured as part of the execution of
     * the query.
     */
    metrics?: boolean;
    /**
     * Specifies any additional parameters which should be passed to the query engine
     * when executing the query.
     */
    raw?: {
        [key: string]: any;
    };
    /**
     * Specifies the scope to run this query in.
     */
    scope?: Scope;
}
/**
 * Provides an interface to preform transactional operations in a transaction.
 *
 * @category Transactions
 */
export declare class TransactionAttemptContext {
    private _impl;
    private _transcoder;
    /**
     * @internal
     */
    constructor(txns: Transactions, config?: TransactionOptions);
    /**
    @internal
    */
    get impl(): CppTransaction;
    /**
     * @internal
     */
    _newAttempt(): Promise<void>;
    /**
     * Retrieves the value of a document from the collection.
     *
     * @param collection The collection the document lives in.
     * @param key The document key to retrieve.
     */
    get(collection: Collection, key: string): Promise<TransactionGetResult>;
    /**
     * Inserts a new document to the collection, failing if the document already exists.
     *
     * @param collection The collection the document lives in.
     * @param key The document key to insert.
     * @param content The document content to insert.
     */
    insert(collection: Collection, key: string, content: any): Promise<TransactionGetResult>;
    /**
     * Replaces a document in a collection.
     *
     * @param doc The document to replace.
     * @param content The document content to insert.
     */
    replace(doc: TransactionGetResult, content: any): Promise<TransactionGetResult>;
    /**
     * Removes a document from a collection.
     *
     * @param doc The document to remove.
     */
    remove(doc: TransactionGetResult): Promise<void>;
    /**
     * Executes a query in the context of this transaction.
     *
     * @param statement The statement to execute.
     * @param options Optional parameters for this operation.
     */
    query<TRow = any>(statement: string, options?: TransactionQueryOptions): Promise<TransactionQueryResult<TRow>>;
    /**
     * @internal
     */
    _commit(): Promise<TransactionResult>;
    /**
     * @internal
     */
    _rollback(): Promise<void>;
}
/**
 * Provides an interface to access transactions.
 *
 * @category Transactions
 */
export declare class Transactions {
    private _cluster;
    private _impl;
    /**
    @internal
    */
    constructor(cluster: Cluster, config?: TransactionsConfig);
    /**
    @internal
    */
    get impl(): CppTransactions;
    /**
    @internal
    */
    _close(): Promise<void>;
    /**
     * Executes a transaction.
     *
     * @param logicFn The transaction lambda to execute.
     * @param config Configuration operations for the transaction.
     */
    run(logicFn: (attempt: TransactionAttemptContext) => Promise<void>, config?: TransactionOptions): Promise<TransactionResult>;
}
