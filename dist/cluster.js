import * as analyticsexecutor_1 from "./analyticsexecutor.js";
import * as analyticsindexmanager_1 from "./analyticsindexmanager.js";
import binding from "./binding.js";
import * as bindingutilities_1 from "./bindingutilities.js";
import * as bucket_1 from "./bucket.js";
import * as bucketmanager_1 from "./bucketmanager.js";
import * as configProfile_1 from "./configProfile.js";
import * as connspec_1 from "./connspec.js";
import * as diagnosticsexecutor_1 from "./diagnosticsexecutor.js";
import * as eventingfunctionmanager_1 from "./eventingfunctionmanager.js";
import * as queryexecutor_1 from "./queryexecutor.js";
import * as queryindexmanager_1 from "./queryindexmanager.js";
import * as searchexecutor_1 from "./searchexecutor.js";
import * as searchindexmanager_1 from "./searchindexmanager.js";
import * as transactions_1 from "./transactions.js";
import * as transcoders_1 from "./transcoders.js";
import * as usermanager_1 from "./usermanager.js";
import * as utilities_1 from "./utilities.js";
import * as utilities_internal_1 from "./utilities_internal.js";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const binding_1 = __importDefault(binding);
/**
 * Exposes the operations which are available to be performed against a cluster.
 * Namely the ability to access to Buckets as well as performing management
 * operations against the cluster.
 *
 * @category Core
 */
class Cluster {
    /**
     * @internal
     */
    get conn() {
        return this._conn;
    }
    /**
    @internal
    */
    get transcoder() {
        return this._transcoder;
    }
    /**
    @internal
    */
    get kvTimeout() {
        return this._kvTimeout;
    }
    /**
    @internal
    */
    get kvDurableTimeout() {
        return this._kvDurableTimeout;
    }
    /**
    @internal
    */
    get viewTimeout() {
        return this._viewTimeout;
    }
    /**
    @internal
    */
    get queryTimeout() {
        return this._queryTimeout;
    }
    /**
    @internal
    */
    get analyticsTimeout() {
        return this._analyticsTimeout;
    }
    /**
    @internal
    */
    get searchTimeout() {
        return this._searchTimeout;
    }
    /**
    @internal
    */
    get managementTimeout() {
        return this._managementTimeout;
    }
    /**
    @internal
    */
    get bootstrapTimeout() {
        return this._bootstrapTimeout;
    }
    /**
    @internal
    */
    get connectTimeout() {
        return this._connectTimeout;
    }
    /**
    @internal
    */
    get resolveTimeout() {
        return this._resolveTimeout;
    }
    /**
    @internal
    @deprecated Use the static sdk-level {@link connect} method instead.
    */
    constructor(connStr, options) {
        var _a, _b, _c;
        if (!options) {
            options = {};
        }
        if (!options.security) {
            options.security = {};
        }
        if (!options.timeouts) {
            options.timeouts = {};
        }
        this._connStr = connStr;
        this._trustStorePath = options.security.trustStorePath || '';
        if (options.configProfile) {
            configProfile_1.knownProfiles.applyProfile(options.configProfile, options);
        }
        this._kvTimeout = options.timeouts.kvTimeout || 2500;
        this._kvDurableTimeout = options.timeouts.kvDurableTimeout || 10000;
        this._viewTimeout = options.timeouts.viewTimeout || 75000;
        this._queryTimeout = options.timeouts.queryTimeout || 75000;
        this._analyticsTimeout = options.timeouts.analyticsTimeout || 75000;
        this._searchTimeout = options.timeouts.searchTimeout || 75000;
        this._managementTimeout = options.timeouts.managementTimeout || 75000;
        this._bootstrapTimeout = (_a = options.timeouts) === null || _a === void 0 ? void 0 : _a.bootstrapTimeout;
        this._connectTimeout = (_b = options.timeouts) === null || _b === void 0 ? void 0 : _b.connectTimeout;
        this._resolveTimeout = (_c = options.timeouts) === null || _c === void 0 ? void 0 : _c.resolveTimeout;
        if (options.transcoder) {
            this._transcoder = options.transcoder;
        }
        else {
            this._transcoder = new transcoders_1.DefaultTranscoder();
        }
        if (options.transactions) {
            this._txnConfig = options.transactions;
        }
        else {
            this._txnConfig = {};
        }
        if (options.username || options.password) {
            if (options.authenticator) {
                throw new Error('Cannot specify authenticator along with username/password.');
            }
            this._auth = {
                username: options.username || '',
                password: options.password || '',
            };
        }
        else if (options.authenticator) {
            this._auth = options.authenticator;
        }
        else {
            this._auth = {
                username: '',
                password: '',
            };
        }
        if (options.dnsConfig &&
            (options.dnsConfig.nameserver ||
                options.dnsConfig.port ||
                options.dnsConfig.dnsSrvTimeout)) {
            this._dnsConfig = {
                nameserver: options.dnsConfig.nameserver,
                port: options.dnsConfig.port,
                dnsSrvTimeout: options.dnsConfig.dnsSrvTimeout || 500,
            };
        }
        else {
            this._dnsConfig = null;
        }
        this._openBuckets = [];
        this._conn = new binding_1.default.Connection();
    }
    /**
    @internal
    */
    static async connect(connStr, options, callback) {
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const cluster = new Cluster(connStr, options);
            await cluster._connect();
            return cluster;
        }, callback);
    }
    /**
     * Creates a Bucket object reference to a specific bucket.
     *
     * @param bucketName The name of the bucket to reference.
     */
    bucket(bucketName) {
        if (!this._openBuckets.includes(bucketName)) {
            this._conn.openBucket(bucketName, (err) => {
                if (err) {
                    // BUG(JSCBC-1011): Move this to log framework once it is implemented.
                    console.error('failed to open bucket: %O', err);
                }
            });
            this._openBuckets.push(bucketName);
        }
        return new bucket_1.Bucket(this, bucketName);
    }
    /**
     * Returns a UserManager which can be used to manage the users
     * of this cluster.
     */
    users() {
        return new usermanager_1.UserManager(this);
    }
    /**
     * Returns a BucketManager which can be used to manage the buckets
     * of this cluster.
     */
    buckets() {
        return new bucketmanager_1.BucketManager(this);
    }
    /**
     * Returns a QueryIndexManager which can be used to manage the query indexes
     * of this cluster.
     */
    queryIndexes() {
        return new queryindexmanager_1.QueryIndexManager(this);
    }
    /**
     * Returns a AnalyticsIndexManager which can be used to manage the analytics
     * indexes of this cluster.
     */
    analyticsIndexes() {
        return new analyticsindexmanager_1.AnalyticsIndexManager(this);
    }
    /**
     * Returns a SearchIndexManager which can be used to manage the search
     * indexes of this cluster.
     */
    searchIndexes() {
        return new searchindexmanager_1.SearchIndexManager(this);
    }
    /**
     * Returns a EventingFunctionManager which can be used to manage the eventing
     * functions of this cluster.
     * Uncommitted: This API is subject to change in the future.
     */
    eventingFunctions() {
        return new eventingfunctionmanager_1.EventingFunctionManager(this);
    }
    /**
     * Returns a Transactions object which can be used to perform transactions
     * on this cluster.
     */
    transactions() {
        if (!this._transactions) {
            this._transactions = new transactions_1.Transactions(this, this._txnConfig);
        }
        return this._transactions;
    }
    /**
     * Executes a N1QL query against the cluster.
     *
     * @param statement The N1QL statement to execute.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    query(statement, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new queryexecutor_1.QueryExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.query(statement, options_), callback);
    }
    /**
     * Executes an analytics query against the cluster.
     *
     * @param statement The analytics statement to execute.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    analyticsQuery(statement, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new analyticsexecutor_1.AnalyticsExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.query(statement, options_), callback);
    }
    /**
     * Executes a search query against the cluster.
     *
     * @param indexName The name of the index to query.
     * @param query The SearchQuery describing the query to execute.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    searchQuery(indexName, query, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new searchexecutor_1.SearchExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.query(indexName, query, options_), callback);
    }
    /**
     * Executes a search query against the cluster.
     *
     * @param indexName The name of the index to query.
     * @param request The SearchRequest describing the search to execute.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    search(indexName, request, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new searchexecutor_1.SearchExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.query(indexName, request, options_), callback);
    }
    /**
     * Returns a diagnostics report about the currently active connections with the
     * cluster.  Includes information about remote and local addresses, last activity,
     * and other diagnostics information.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    diagnostics(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new diagnosticsexecutor_1.DiagnoticsExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.diagnostics(options_), callback);
    }
    /**
     * Performs a ping operation against the cluster.  Pinging the services which
     * are specified (or all services if none are specified).  Returns a report
     * which describes the outcome of the ping operations which were performed.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    ping(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const exec = new diagnosticsexecutor_1.PingExecutor(this);
        const options_ = options;
        return utilities_1.PromiseHelper.wrapAsync(() => exec.ping(options_), callback);
    }
    /**
     * Shuts down this cluster object.  Cleaning up all resources associated with it.
     *
     * @param callback A node-style callback to be invoked after execution.
     */
    async close(callback) {
        if (this._transactions) {
            await this._transactions._close();
            this._transactions = undefined;
        }
        return utilities_1.PromiseHelper.wrap((wrapCallback) => {
            this._conn.shutdown((cppErr) => {
                wrapCallback((0, bindingutilities_1.errorFromCpp)(cppErr));
            });
        }, callback);
    }
    async _connect() {
        return new Promise((resolve, reject) => {
            const dsnObj = connspec_1.ConnSpec.parse(this._connStr);
            dsnObj.options.user_agent_extra = (0, utilities_internal_1.generateClientString)();
            //trust_store_path is legacy, C++ SDK expects trust_certificate
            if ('trust_store_path' in dsnObj.options &&
                !('trust_certificate' in dsnObj.options)) {
                dsnObj.options.trust_certificate = dsnObj.options.trust_store_path;
                delete dsnObj.options['trust_store_path'];
            }
            //if trust store was passed in via `SecurityConfig` override connstr
            if (this._trustStorePath) {
                dsnObj.options.trust_certificate = this._trustStorePath;
            }
            if (this.bootstrapTimeout) {
                dsnObj.options['bootstrap_timeout'] = this.bootstrapTimeout.toString();
            }
            if (this.connectTimeout) {
                dsnObj.options['kv_connect_timeout'] = this.connectTimeout.toString();
            }
            if (this.resolveTimeout) {
                dsnObj.options['resolve_timeout'] = this.resolveTimeout.toString();
            }
            const connStr = dsnObj.toString();
            const authOpts = {};
            // lets allow `allowed_sasl_mechanisms` to override legacy connstr option
            for (const saslKey of ['sasl_mech_force', 'allowed_sasl_mechanisms']) {
                if (!(saslKey in dsnObj.options)) {
                    continue;
                }
                if (typeof dsnObj.options[saslKey] === 'string') {
                    authOpts.allowed_sasl_mechanisms = [dsnObj.options[saslKey]];
                }
                else {
                    authOpts.allowed_sasl_mechanisms = dsnObj.options[saslKey];
                }
                delete dsnObj.options[saslKey];
            }
            if (this._auth) {
                const passAuth = this._auth;
                if (passAuth.username || passAuth.password) {
                    authOpts.username = passAuth.username;
                    authOpts.password = passAuth.password;
                    if (passAuth.allowed_sasl_mechanisms) {
                        authOpts.allowed_sasl_mechanisms = passAuth.allowed_sasl_mechanisms;
                    }
                }
                const certAuth = this._auth;
                if (certAuth.certificatePath || certAuth.keyPath) {
                    authOpts.certificate_path = certAuth.certificatePath;
                    authOpts.key_path = certAuth.keyPath;
                }
            }
            this._conn.connect(connStr, authOpts, this._dnsConfig, (cppErr) => {
                if (cppErr) {
                    const err = (0, bindingutilities_1.errorFromCpp)(cppErr);
                    return reject(err);
                }
                resolve(null);
            });
        });
    }
}
const Cluster$0 = void 0;
export { Cluster };
export { Cluster$0 as Cluster };
export {  };
