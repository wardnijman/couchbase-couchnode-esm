import * as errors_1 from "./errors.js";
import * as httpexecutor_1 from "./httpexecutor.js";
import * as utilities_1 from "./utilities.js";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the type of an analytics link.
 *
 * @category Analytics
 */
var AnalyticsLinkType;
export { AnalyticsLinkType };
(function (AnalyticsLinkType) {
    /**
     * Indicates that the link is for S3.
     */
    AnalyticsLinkType["S3External"] = "s3";
    /**
     * Indicates that the link is for Azure.
     */
    AnalyticsLinkType["AzureBlobExternal"] = "azureblob";
    /**
     * Indicates that the link is for a remote Couchbase cluster.
     */
    AnalyticsLinkType["CouchbaseRemote"] = "couchbase";
})(AnalyticsLinkType || (exports.AnalyticsLinkType = AnalyticsLinkType = {}));
/**
 * Represents what level of encryption to use for analytics remote links.
 *
 * @category Analytics
 */
var AnalyticsEncryptionLevel;
(function (AnalyticsEncryptionLevel) {
    /**
     * Indicates that no encryption should be used.
     */
    AnalyticsEncryptionLevel["None"] = "none";
    /**
     * Indicates that half encryption should be used.
     */
    AnalyticsEncryptionLevel["Half"] = "half";
    /**
     * Indicates that full encryption should be used.
     */
    AnalyticsEncryptionLevel["Full"] = "full";
})(AnalyticsEncryptionLevel || (exports.AnalyticsEncryptionLevel = AnalyticsEncryptionLevel = {}));
/**
 * Contains a specific dataset configuration for the analytics service.
 *
 * @category Management
 */
class AnalyticsDataset {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.dataverseName = data.dataverseName;
        this.linkName = data.linkName;
        this.bucketName = data.bucketName;
    }
}
/**
 * Contains a specific index configuration for the analytics service.
 *
 * @category Management
 */
class AnalyticsIndex {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.datasetName = data.datasetName;
        this.dataverseName = data.dataverseName;
        this.isPrimary = data.isPrimary;
    }
}
/**
 * Includes information about an analytics remote links encryption.
 */
class CouchbaseAnalyticsEncryptionSettings {
    /**
     * @internal
     */
    constructor(data) {
        this.encryptionLevel = data.encryptionLevel;
        this.certificate = data.certificate;
        this.clientCertificate = data.clientCertificate;
        this.clientKey = data.clientKey;
    }
}
/**
 * This is a base class for specific link configurations for the analytics service.
 */
class AnalyticsLink {
    /**
     * @internal
     */
    constructor() {
        this.linkType = '';
    }
    /**
     * @internal
     */
    static _toHttpData(data) {
        if (data.linkType === AnalyticsLinkType.CouchbaseRemote) {
            return CouchbaseRemoteAnalyticsLink._toHttpData(data);
        }
        else if (data.linkType === AnalyticsLinkType.S3External) {
            return S3ExternalAnalyticsLink._toHttpData(data);
        }
        else if (data.linkType === AnalyticsLinkType.AzureBlobExternal) {
            return AzureExternalAnalyticsLink._toHttpData(data);
        }
        else {
            throw new Error('invalid link type');
        }
    }
    /**
     * @internal
     */
    static _fromHttpData(data) {
        if (data.type === 'couchbase') {
            return CouchbaseRemoteAnalyticsLink._fromHttpData(data);
        }
        else if (data.type === 's3') {
            return S3ExternalAnalyticsLink._fromHttpData(data);
        }
        else if (data.type === 'azure') {
            return AzureExternalAnalyticsLink._fromHttpData(data);
        }
        else {
            throw new Error('invalid link type');
        }
    }
}
/**
 * Provides information about a analytics remote Couchbase link.
 */
class CouchbaseRemoteAnalyticsLink extends AnalyticsLink {
    /**
     * @internal
     */
    constructor(data) {
        super();
        this.linkType = AnalyticsLinkType.CouchbaseRemote;
        this.dataverse = data.dataverse;
        this.name = data.name;
        this.hostname = data.hostname;
        this.encryption = data.encryption;
        this.username = data.username;
        this.password = data.password;
    }
    /**
     * @internal
     */
    static _toHttpData(data) {
        let dvSpecific;
        if (data.dataverse.indexOf('/') !== -1) {
            const encDataverse = encodeURIComponent(data.dataverse);
            const encName = encodeURIComponent(data.name);
            dvSpecific = {
                httpPath: `/analytics/link/${encDataverse}/${encName}`,
            };
        }
        else {
            dvSpecific = {
                httpPath: `/analytics/link`,
                dataverse: data.dataverse,
                name: data.name,
            };
        }
        return {
            type: 'couchbase',
            ...dvSpecific,
            hostname: data.hostname,
            username: data.username,
            password: data.password,
            encryption: data.encryption ? data.encryption.encryptionLevel : undefined,
            certificate: data.encryption
                ? data.encryption.certificate
                    ? data.encryption.certificate.toString()
                    : undefined
                : undefined,
            clientCertificate: data.encryption
                ? data.encryption.clientCertificate
                    ? data.encryption.clientCertificate.toString()
                    : undefined
                : undefined,
            clientKey: data.encryption
                ? data.encryption.clientKey
                    ? data.encryption.clientKey.toString()
                    : undefined
                : undefined,
        };
    }
    /**
     * @internal
     */
    static _fromHttpData(data) {
        return new CouchbaseRemoteAnalyticsLink({
            linkType: AnalyticsLinkType.CouchbaseRemote,
            dataverse: data.dataverse || data.scope,
            name: data.name,
            hostname: data.activeHostname,
            encryption: new CouchbaseAnalyticsEncryptionSettings({
                encryptionLevel: data.encryption,
                certificate: Buffer.from(data.certificate),
                clientCertificate: Buffer.from(data.clientCertificate),
                clientKey: Buffer.from(data.clientKey),
            }),
            username: data.username,
            password: undefined,
        });
    }
}
/**
 * Provides information about a analytics remote S3 link.
 */
class S3ExternalAnalyticsLink extends AnalyticsLink {
    /**
     * @internal
     */
    constructor(data) {
        super();
        this.linkType = AnalyticsLinkType.S3External;
        this.dataverse = data.dataverse;
        this.name = data.name;
        this.accessKeyId = data.accessKeyId;
        this.secretAccessKey = data.secretAccessKey;
        this.sessionToken = data.sessionToken;
        this.region = data.region;
        this.serviceEndpoint = data.serviceEndpoint;
    }
    /**
     * @internal
     */
    static _toHttpData(data) {
        let dvSpecific;
        if (data.dataverse.indexOf('/') !== -1) {
            const encDataverse = encodeURIComponent(data.dataverse);
            const encName = encodeURIComponent(data.name);
            dvSpecific = {
                httpPath: `/analytics/link/${encDataverse}/${encName}`,
            };
        }
        else {
            dvSpecific = {
                httpPath: `/analytics/link`,
                dataverse: data.dataverse,
                name: data.name,
            };
        }
        return {
            type: 's3',
            ...dvSpecific,
            accessKeyId: data.accessKeyId,
            secretAccessKey: data.secretAccessKey,
            region: data.region,
            sessionToken: data.sessionToken,
            serviceEndpoint: data.serviceEndpoint,
        };
    }
    /**
     * @internal
     */
    static _fromHttpData(data) {
        return new S3ExternalAnalyticsLink({
            linkType: AnalyticsLinkType.S3External,
            dataverse: data.dataverse || data.scope,
            name: data.name,
            accessKeyId: data.accessKeyId,
            secretAccessKey: undefined,
            region: data.region,
            sessionToken: undefined,
            serviceEndpoint: data.serviceEndpoint,
        });
    }
}
/**
 * Provides information about a analytics remote S3 link.
 */
class AzureExternalAnalyticsLink extends AnalyticsLink {
    /**
     * @internal
     */
    constructor(data) {
        super();
        this.linkType = AnalyticsLinkType.AzureBlobExternal;
        this.dataverse = data.dataverse;
        this.name = data.name;
        this.connectionString = data.connectionString;
        this.accountName = data.accountName;
        this.accountKey = data.accountKey;
        this.sharedAccessSignature = data.sharedAccessSignature;
        this.blobEndpoint = data.blobEndpoint;
        this.endpointSuffix = data.endpointSuffix;
    }
    /**
     * @internal
     */
    static _toHttpData(data) {
        let dvSpecific;
        if (data.dataverse.indexOf('/') !== -1) {
            const encDataverse = encodeURIComponent(data.dataverse);
            const encName = encodeURIComponent(data.name);
            dvSpecific = {
                httpPath: `/analytics/link/${encDataverse}/${encName}`,
            };
        }
        else {
            dvSpecific = {
                httpPath: `/analytics/link`,
                dataverse: data.dataverse,
                name: data.name,
            };
        }
        return {
            type: 'azure',
            ...dvSpecific,
            connectionString: data.connectionString,
            accountName: data.accountName,
            accountKey: data.accountKey,
            sharedAccessSignature: data.sharedAccessSignature,
            blobEndpoint: data.blobEndpoint,
            endpointSuffix: data.endpointSuffix,
        };
    }
    /**
     * @internal
     */
    static _fromHttpData(data) {
        return new AzureExternalAnalyticsLink({
            linkType: AnalyticsLinkType.AzureBlobExternal,
            dataverse: data.dataverse || data.scope,
            name: data.name,
            connectionString: undefined,
            accountName: data.accountName,
            accountKey: undefined,
            sharedAccessSignature: undefined,
            blobEndpoint: data.blobEndpoint,
            endpointSuffix: data.endpointSuffix,
        });
    }
}
/**
 * AnalyticsIndexManager provides an interface for performing management
 * operations against the analytics service of the cluster.
 *
 * @category Management
 */
class AnalyticsIndexManager {
    /**
     * @internal
     */
    constructor(cluster) {
        this._cluster = cluster;
    }
    get _http() {
        return new httpexecutor_1.HttpExecutor(this._cluster.conn);
    }
    /**
     * Creates a new dataverse.
     *
     * @param dataverseName The name of the dataverse to create.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createDataverse(dataverseName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'CREATE DATAVERSE';
        qs += ' `' + dataverseName.split('/').join('`.`') + '`';
        if (options.ignoreIfExists) {
            qs += ' IF NOT EXISTS';
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            try {
                await this._cluster.analyticsQuery(qs, {
                    timeout: timeout,
                });
            }
            catch (err) {
                if (err instanceof errors_1.DataverseExistsError) {
                    throw err;
                }
                throw new errors_1.CouchbaseError('failed to create dataverse', err);
            }
        }, callback);
    }
    /**
     * Drops a previously created dataverse.
     *
     * @param dataverseName The name of the dataverse to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropDataverse(dataverseName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'DROP DATAVERSE';
        qs += ' `' + dataverseName.split('/').join('`.`') + '`';
        if (options.ignoreIfNotExists) {
            qs += ' IF EXISTS';
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            try {
                await this._cluster.analyticsQuery(qs, {
                    timeout: timeout,
                });
            }
            catch (err) {
                if (err instanceof errors_1.DataverseNotFoundError) {
                    throw err;
                }
                throw new errors_1.CouchbaseError('failed to drop dataverse', err);
            }
        }, callback);
    }
    /**
     * Creates a new dataset.
     *
     * @param bucketName The name of the bucket to create this dataset of.
     * @param datasetName The name of the new dataset.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createDataset(bucketName, datasetName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'CREATE DATASET';
        if (options.ignoreIfExists) {
            qs += ' IF NOT EXISTS';
        }
        if (options.dataverseName) {
            qs +=
                ' `' +
                    options.dataverseName.split('/').join('`.`') +
                    '`.`' +
                    datasetName +
                    '`';
        }
        else {
            qs += ' `' + datasetName + '`';
        }
        qs += ' ON `' + bucketName + '`';
        if (options.condition) {
            qs += ' WHERE ' + options.condition;
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            try {
                await this._cluster.analyticsQuery(qs, {
                    timeout: timeout,
                });
            }
            catch (err) {
                if (err instanceof errors_1.DatasetExistsError) {
                    throw err;
                }
                throw new errors_1.CouchbaseError('failed to create dataset', err);
            }
        }, callback);
    }
    /**
     * Drops a previously created dataset.
     *
     * @param datasetName The name of the dataset to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropDataset(datasetName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'DROP DATASET';
        if (options.dataverseName) {
            qs +=
                ' `' +
                    options.dataverseName.split('/').join('`.`') +
                    '`.`' +
                    datasetName +
                    '`';
        }
        else {
            qs += ' `' + datasetName + '`';
        }
        if (options.ignoreIfNotExists) {
            qs += ' IF EXISTS';
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            try {
                await this._cluster.analyticsQuery(qs, {
                    timeout: timeout,
                });
            }
            catch (err) {
                if (err instanceof errors_1.DatasetNotFoundError) {
                    throw err;
                }
                throw new errors_1.CouchbaseError('failed to drop dataset', err);
            }
        }, callback);
    }
    /**
     * Returns a list of all existing datasets.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllDatasets(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const qs = 'SELECT d.* FROM `Metadata`.`Dataset` d WHERE d.DataverseName <> "Metadata"';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
            const datasets = res.rows.map((row) => new AnalyticsDataset({
                name: row.DatasetName,
                dataverseName: row.DataverseName,
                linkName: row.LinkName,
                bucketName: row.BucketName,
            }));
            return datasets;
        }, callback);
    }
    /**
     * Creates a new index.
     *
     * @param datasetName The name of the dataset to create this index on.
     * @param indexName The name of index to create.
     * @param fields A map of fields that the index should contain.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createIndex(datasetName, indexName, fields, options, callback) {
        if (options instanceof Function) {
            callback = arguments[3];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'CREATE INDEX';
        qs += ' `' + indexName + '`';
        if (options.ignoreIfExists) {
            qs += ' IF NOT EXISTS';
        }
        if (options.dataverseName) {
            qs +=
                ' ON `' +
                    options.dataverseName.split('/').join('`.`') +
                    '`.`' +
                    datasetName +
                    '`';
        }
        else {
            qs += ' ON `' + datasetName + '`';
        }
        qs += ' (';
        qs += Object.keys(fields)
            .map((i) => '`' + i + '`: ' + fields[i])
            .join(', ');
        qs += ')';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
        }, callback);
    }
    /**
     * Drops a previously created index.
     *
     * @param datasetName The name of the dataset containing the index to drop.
     * @param indexName The name of the index to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropIndex(datasetName, indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        let qs = '';
        qs += 'DROP INDEX';
        if (options.dataverseName) {
            qs +=
                ' `' +
                    options.dataverseName.split('/').join('`.`') +
                    '`.`' +
                    datasetName +
                    '`';
        }
        else {
            qs += ' `' + datasetName + '`';
        }
        qs += '.`' + indexName + '`';
        if (options.ignoreIfNotExists) {
            qs += ' IF EXISTS';
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
        }, callback);
    }
    /**
     * Returns a list of all existing indexes.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllIndexes(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const qs = 'SELECT d.* FROM `Metadata`.`Index` d WHERE d.DataverseName <> "Metadata"';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
            const indexes = res.rows.map((row) => new AnalyticsIndex({
                name: row.IndexName,
                datasetName: row.DatasetName,
                dataverseName: row.DataverseName,
                isPrimary: row.IsPrimary,
            }));
            return indexes;
        }, callback);
    }
    /**
     * Connects a not yet connected link.
     *
     * @param linkName The name of the link to connect.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async connectLink(linkName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const qs = 'CONNECT LINK ' + linkName;
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
        }, callback);
    }
    /**
     * Disconnects a previously connected link.
     *
     * @param linkName The name of the link to disconnect.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async disconnectLink(linkName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const qs = 'DISCONNECT LINK ' + linkName;
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            await this._cluster.analyticsQuery(qs, {
                timeout: timeout,
            });
        }, callback);
    }
    /**
     * Returns a list of all pending mutations.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getPendingMutations(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Analytics,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/analytics/node/agg/stats/remaining`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get pending mutations', undefined, errCtx);
            }
            return JSON.parse(res.body.toString());
        }, callback);
    }
    /**
     * Creates a new analytics remote link.
     *
     * @param link The settings for the link to create.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createLink(link, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const linkData = AnalyticsLink._toHttpData(link);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Analytics,
                method: httpexecutor_1.HttpMethod.Post,
                path: linkData.httpPath,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)({
                    linkData,
                    httpPath: undefined,
                }),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('24055')) {
                    throw new errors_1.LinkExistsError(undefined, errCtx);
                }
                else if (errText.includes('24034')) {
                    throw new errors_1.DataverseNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to create link', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Replaces an existing analytics remote link.
     *
     * @param link The settings for the updated link.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async replaceLink(link, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const linkData = AnalyticsLink._toHttpData(link);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Analytics,
                method: httpexecutor_1.HttpMethod.Put,
                path: linkData.httpPath,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)({
                    linkData,
                    httpPath: undefined,
                }),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('24055')) {
                    throw new errors_1.LinkExistsError(undefined, errCtx);
                }
                else if (errText.includes('24034')) {
                    throw new errors_1.DataverseNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to replace link', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops an existing analytics remote link.
     *
     * @param linkName The name of the link to drop.
     * @param dataverseName The dataverse containing the link to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropLink(linkName, dataverseName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            let httpPath;
            let httpParams;
            if (dataverseName.indexOf('/') !== -1) {
                const encDataverse = encodeURIComponent(dataverseName);
                const encName = encodeURIComponent(linkName);
                httpPath = `/analytics/link/${encDataverse}/${encName}`;
                httpParams = {};
            }
            else {
                httpPath = `/analytics/link`;
                httpParams = {
                    dataverse: dataverseName,
                    name: linkName,
                };
            }
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Analytics,
                method: httpexecutor_1.HttpMethod.Delete,
                path: httpPath,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)(httpParams),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('24055')) {
                    throw new errors_1.LinkExistsError(undefined, errCtx);
                }
                else if (errText.includes('24034')) {
                    throw new errors_1.DataverseNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to delete link', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Returns a list of existing analytics remote links.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllLinks(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const dataverseName = options.dataverse;
        const linkName = options.name;
        const linkType = options.linkType;
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            let httpPath;
            if (dataverseName && dataverseName.indexOf('/') !== -1) {
                const encDataverse = encodeURIComponent(dataverseName);
                httpPath = `/analytics/link/${encDataverse}`;
                if (linkName) {
                    const encName = encodeURIComponent(linkName);
                    httpPath += `/${encName}`;
                }
                httpPath += '?';
                if (linkType) {
                    httpPath += `type=${linkType}&`;
                }
            }
            else {
                httpPath = `/analytics/link?`;
                if (dataverseName) {
                    httpPath += `dataverse=${dataverseName}&`;
                    if (linkName) {
                        httpPath += `dataverse=${linkName}&`;
                    }
                }
                if (linkType) {
                    httpPath += `type=${linkType}&`;
                }
            }
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Analytics,
                method: httpexecutor_1.HttpMethod.Get,
                path: httpPath,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('24034')) {
                    throw new errors_1.DataverseNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get links', undefined, errCtx);
            }
            const linksData = JSON.parse(res.body.toString());
            const links = linksData.map((linkData) => AnalyticsLink._fromHttpData(linkData));
            return links;
        }, callback);
    }
}
const AnalyticsLinkType$0 = void 0;
export { AnalyticsLinkType$0 as AnalyticsLinkType };
export { S3ExternalAnalyticsLink };
