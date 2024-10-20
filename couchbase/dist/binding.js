import path from "path";
import { loadPrebuild } from "../scripts/prebuilds.js";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
eslint
jsdoc/require-jsdoc: off,
@typescript-eslint/no-empty-interface: off
*/
const path_1 = __importDefault(path);
//#region Autogenerated Bindings
var CppManagementAnalyticsCouchbaseLinkEncryptionLevel;
(function (CppManagementAnalyticsCouchbaseLinkEncryptionLevel) {
})(CppManagementAnalyticsCouchbaseLinkEncryptionLevel || (exports.CppManagementAnalyticsCouchbaseLinkEncryptionLevel = CppManagementAnalyticsCouchbaseLinkEncryptionLevel = {}));
var CppManagementClusterBucketType;
(function (CppManagementClusterBucketType) {
})(CppManagementClusterBucketType || (exports.CppManagementClusterBucketType = CppManagementClusterBucketType = {}));
var CppManagementClusterBucketCompression;
(function (CppManagementClusterBucketCompression) {
})(CppManagementClusterBucketCompression || (exports.CppManagementClusterBucketCompression = CppManagementClusterBucketCompression = {}));
var CppManagementClusterBucketEvictionPolicy;
(function (CppManagementClusterBucketEvictionPolicy) {
})(CppManagementClusterBucketEvictionPolicy || (exports.CppManagementClusterBucketEvictionPolicy = CppManagementClusterBucketEvictionPolicy = {}));
var CppManagementClusterBucketConflictResolution;
(function (CppManagementClusterBucketConflictResolution) {
})(CppManagementClusterBucketConflictResolution || (exports.CppManagementClusterBucketConflictResolution = CppManagementClusterBucketConflictResolution = {}));
var CppManagementClusterBucketStorageBackend;
(function (CppManagementClusterBucketStorageBackend) {
})(CppManagementClusterBucketStorageBackend || (exports.CppManagementClusterBucketStorageBackend = CppManagementClusterBucketStorageBackend = {}));
var CppManagementEventingFunctionDcpBoundary;
(function (CppManagementEventingFunctionDcpBoundary) {
})(CppManagementEventingFunctionDcpBoundary || (exports.CppManagementEventingFunctionDcpBoundary = CppManagementEventingFunctionDcpBoundary = {}));
var CppManagementEventingFunctionLanguageCompatibility;
(function (CppManagementEventingFunctionLanguageCompatibility) {
})(CppManagementEventingFunctionLanguageCompatibility || (exports.CppManagementEventingFunctionLanguageCompatibility = CppManagementEventingFunctionLanguageCompatibility = {}));
var CppManagementEventingFunctionLogLevel;
(function (CppManagementEventingFunctionLogLevel) {
})(CppManagementEventingFunctionLogLevel || (exports.CppManagementEventingFunctionLogLevel = CppManagementEventingFunctionLogLevel = {}));
var CppManagementEventingFunctionBucketAccess;
(function (CppManagementEventingFunctionBucketAccess) {
})(CppManagementEventingFunctionBucketAccess || (exports.CppManagementEventingFunctionBucketAccess = CppManagementEventingFunctionBucketAccess = {}));
var CppManagementEventingFunctionStatus;
(function (CppManagementEventingFunctionStatus) {
})(CppManagementEventingFunctionStatus || (exports.CppManagementEventingFunctionStatus = CppManagementEventingFunctionStatus = {}));
var CppManagementEventingFunctionDeploymentStatus;
(function (CppManagementEventingFunctionDeploymentStatus) {
})(CppManagementEventingFunctionDeploymentStatus || (exports.CppManagementEventingFunctionDeploymentStatus = CppManagementEventingFunctionDeploymentStatus = {}));
var CppManagementEventingFunctionProcessingStatus;
(function (CppManagementEventingFunctionProcessingStatus) {
})(CppManagementEventingFunctionProcessingStatus || (exports.CppManagementEventingFunctionProcessingStatus = CppManagementEventingFunctionProcessingStatus = {}));
var CppManagementRbacAuthDomain;
(function (CppManagementRbacAuthDomain) {
})(CppManagementRbacAuthDomain || (exports.CppManagementRbacAuthDomain = CppManagementRbacAuthDomain = {}));
var CppRetryReason;
(function (CppRetryReason) {
})(CppRetryReason || (exports.CppRetryReason = CppRetryReason = {}));
var CppProtocolSubdocOpcode;
(function (CppProtocolSubdocOpcode) {
})(CppProtocolSubdocOpcode || (exports.CppProtocolSubdocOpcode = CppProtocolSubdocOpcode = {}));
var CppAnalyticsScanConsistency;
(function (CppAnalyticsScanConsistency) {
})(CppAnalyticsScanConsistency || (exports.CppAnalyticsScanConsistency = CppAnalyticsScanConsistency = {}));
var CppDesignDocumentNamespace;
(function (CppDesignDocumentNamespace) {
})(CppDesignDocumentNamespace || (exports.CppDesignDocumentNamespace = CppDesignDocumentNamespace = {}));
var CppDiagClusterState;
(function (CppDiagClusterState) {
})(CppDiagClusterState || (exports.CppDiagClusterState = CppDiagClusterState = {}));
var CppDiagEndpointState;
(function (CppDiagEndpointState) {
})(CppDiagEndpointState || (exports.CppDiagEndpointState = CppDiagEndpointState = {}));
var CppDiagPingState;
(function (CppDiagPingState) {
})(CppDiagPingState || (exports.CppDiagPingState = CppDiagPingState = {}));
var CppQueryProfile;
(function (CppQueryProfile) {
})(CppQueryProfile || (exports.CppQueryProfile = CppQueryProfile = {}));
var CppQueryScanConsistency;
(function (CppQueryScanConsistency) {
})(CppQueryScanConsistency || (exports.CppQueryScanConsistency = CppQueryScanConsistency = {}));
var CppSearchHighlightStyle;
(function (CppSearchHighlightStyle) {
})(CppSearchHighlightStyle || (exports.CppSearchHighlightStyle = CppSearchHighlightStyle = {}));
var CppSearchScanConsistency;
(function (CppSearchScanConsistency) {
})(CppSearchScanConsistency || (exports.CppSearchScanConsistency = CppSearchScanConsistency = {}));
var CppServiceType;
(function (CppServiceType) {
})(CppServiceType || (exports.CppServiceType = CppServiceType = {}));
var CppViewOnError;
(function (CppViewOnError) {
})(CppViewOnError || (exports.CppViewOnError = CppViewOnError = {}));
var CppViewScanConsistency;
(function (CppViewScanConsistency) {
})(CppViewScanConsistency || (exports.CppViewScanConsistency = CppViewScanConsistency = {}));
var CppViewSortOrder;
(function (CppViewSortOrder) {
})(CppViewSortOrder || (exports.CppViewSortOrder = CppViewSortOrder = {}));
var CppAnalyticsResponseAnalyticsStatus;
(function (CppAnalyticsResponseAnalyticsStatus) {
})(CppAnalyticsResponseAnalyticsStatus || (exports.CppAnalyticsResponseAnalyticsStatus = CppAnalyticsResponseAnalyticsStatus = {}));
var CppDurabilityLevel;
(function (CppDurabilityLevel) {
})(CppDurabilityLevel || (exports.CppDurabilityLevel = CppDurabilityLevel = {}));
var CppErrcCommon;
(function (CppErrcCommon) {
})(CppErrcCommon || (exports.CppErrcCommon = CppErrcCommon = {}));
var CppErrcKeyValue;
(function (CppErrcKeyValue) {
})(CppErrcKeyValue || (exports.CppErrcKeyValue = CppErrcKeyValue = {}));
var CppErrcQuery;
(function (CppErrcQuery) {
})(CppErrcQuery || (exports.CppErrcQuery = CppErrcQuery = {}));
var CppErrcAnalytics;
(function (CppErrcAnalytics) {
})(CppErrcAnalytics || (exports.CppErrcAnalytics = CppErrcAnalytics = {}));
var CppErrcSearch;
(function (CppErrcSearch) {
})(CppErrcSearch || (exports.CppErrcSearch = CppErrcSearch = {}));
var CppErrcView;
(function (CppErrcView) {
})(CppErrcView || (exports.CppErrcView = CppErrcView = {}));
var CppErrcManagement;
(function (CppErrcManagement) {
})(CppErrcManagement || (exports.CppErrcManagement = CppErrcManagement = {}));
var CppErrcFieldLevelEncryption;
(function (CppErrcFieldLevelEncryption) {
})(CppErrcFieldLevelEncryption || (exports.CppErrcFieldLevelEncryption = CppErrcFieldLevelEncryption = {}));
var CppErrcNetwork;
(function (CppErrcNetwork) {
})(CppErrcNetwork || (exports.CppErrcNetwork = CppErrcNetwork = {}));
var CppKeyValueStatusCode;
(function (CppKeyValueStatusCode) {
})(CppKeyValueStatusCode || (exports.CppKeyValueStatusCode = CppKeyValueStatusCode = {}));
var CppImplSubdocOpcode;
(function (CppImplSubdocOpcode) {
})(CppImplSubdocOpcode || (exports.CppImplSubdocOpcode = CppImplSubdocOpcode = {}));
var CppStoreSemantics;
(function (CppStoreSemantics) {
})(CppStoreSemantics || (exports.CppStoreSemantics = CppStoreSemantics = {}));
var CppPersistTo;
(function (CppPersistTo) {
})(CppPersistTo || (exports.CppPersistTo = CppPersistTo = {}));
var CppReplicateTo;
(function (CppReplicateTo) {
})(CppReplicateTo || (exports.CppReplicateTo = CppReplicateTo = {}));
var CppReadPreference;
(function (CppReadPreference) {
})(CppReadPreference || (exports.CppReadPreference = CppReadPreference = {}));
var CppVectorQueryCombination;
(function (CppVectorQueryCombination) {
})(CppVectorQueryCombination || (exports.CppVectorQueryCombination = CppVectorQueryCombination = {}));
var CppTxnFailureType;
(function (CppTxnFailureType) {
})(CppTxnFailureType || (exports.CppTxnFailureType = CppTxnFailureType = {}));
var CppTxnExternalException;
(function (CppTxnExternalException) {
})(CppTxnExternalException || (exports.CppTxnExternalException = CppTxnExternalException = {}));
export const zeroCas = void 0;
export default binding;
