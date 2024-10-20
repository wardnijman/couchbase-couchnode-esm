import { Cluster } from './cluster';
import { NodeCallback } from './utilities';
import { GetSearchIndexOptions, GetAllSearchIndexesOptions, UpsertSearchIndexOptions, GetSearchIndexedDocumentsCountOptions, DropSearchIndexOptions, PauseSearchIngestOptions, ResumeSearchIngestOptions, AllowSearchQueryingOptions, DisallowSearchQueryingOptions, FreezeSearchPlanOptions, UnfreezeSearchPlanOptions, AnalyzeSearchDocumentOptions, ISearchIndex, SearchIndex } from './searchindexmanager';
/**
 * SearchIndexManager provides an interface for managing the
 * search indexes on the cluster.
 *
 * @category Management
 */
export declare class ScopeSearchIndexManager {
    private _cluster;
    private _bucketName;
    private _scopeName;
    /**
     * @internal
     */
    constructor(cluster: Cluster, bucketName: string, scopeName: string);
    /**
     * Returns an index by it's name.
     *
     * @param indexName The index to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getIndex(indexName: string, options?: GetSearchIndexOptions, callback?: NodeCallback<SearchIndex>): Promise<SearchIndex>;
    /**
     * Returns a list of all existing indexes.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAllIndexes(options?: GetAllSearchIndexesOptions, callback?: NodeCallback<SearchIndex[]>): Promise<SearchIndex[]>;
    /**
     * Creates or updates an existing index.
     *
     * @param indexDefinition The index to update.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    upsertIndex(indexDefinition: ISearchIndex, options?: UpsertSearchIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Drops an index.
     *
     * @param indexName The name of the index to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropIndex(indexName: string, options?: DropSearchIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Returns the number of documents that have been indexed.
     *
     * @param indexName The name of the index to return the count for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getIndexedDocumentsCount(indexName: string, options?: GetSearchIndexedDocumentsCountOptions, callback?: NodeCallback<number>): Promise<number>;
    /**
     * Pauses the ingestion of documents into an index.
     *
     * @param indexName The name of the index to pause.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    pauseIngest(indexName: string, options?: PauseSearchIngestOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Resumes the ingestion of documents into an index.
     *
     * @param indexName The name of the index to resume.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    resumeIngest(indexName: string, options?: ResumeSearchIngestOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Enables querying of an index.
     *
     * @param indexName The name of the index to enable querying for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    allowQuerying(indexName: string, options?: AllowSearchQueryingOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Disables querying of an index.
     *
     * @param indexName The name of the index to disable querying for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    disallowQuerying(indexName: string, options?: DisallowSearchQueryingOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Freezes the indexing plan for execution of queries.
     *
     * @param indexName The name of the index to freeze the plan of.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    freezePlan(indexName: string, options?: FreezeSearchPlanOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Unfreezes the indexing plan for execution of queries.
     *
     * @param indexName The name of the index to freeze the plan of.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    unfreezePlan(indexName: string, options?: UnfreezeSearchPlanOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Performs analysis of a specific document by an index.
     *
     * @param indexName The name of the index to use for the analysis.
     * @param document The document to analyze.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    analyzeDocument(indexName: string, document: any, options?: AnalyzeSearchDocumentOptions, callback?: NodeCallback<any>): Promise<any>;
}
