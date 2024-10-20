import * as errors_1 from "./errors.js";
import * as httpexecutor_1 from "./httpexecutor.js";
import * as utilities_1 from "./utilities.js";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains information about an origin for a role.
 *
 * @category Management
 */
class Origin {
    /**
     * @internal
     */
    constructor(data) {
        this.type = data.type;
        this.name = data.name;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        return new Origin({
            type: data.type,
            name: data.name,
        });
    }
}
/**
 * Contains information about a role.
 *
 * @category Management
 */
class Role {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.bucket = data.bucket;
        this.scope = data.scope;
        this.collection = data.collection;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        return new Role({
            name: data.role,
            bucket: data.bucket_name,
            scope: data.scope_name,
            collection: data.collection_name,
        });
    }
    /**
     * @internal
     */
    static _toNsStr(role) {
        if (typeof role === 'string') {
            return role;
        }
        if (role.bucket && role.scope && role.collection) {
            return `${role.name}[${role.bucket}:${role.scope}:${role.collection}]`;
        }
        else if (role.bucket && role.scope) {
            return `${role.name}[${role.bucket}:${role.scope}]`;
        }
        else if (role.bucket) {
            return `${role.name}[${role.bucket}]`;
        }
        else {
            return role.name;
        }
    }
}
/**
 * Contains information about a role along with its description.
 *
 * @category Management
 */
class RoleAndDescription extends Role {
    /**
     * @internal
     */
    constructor(data) {
        super(data);
        this.displayName = data.displayName;
        this.description = data.description;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        return new RoleAndDescription({
            ...Role._fromNsData(data),
            displayName: data.name,
            description: data.description,
        });
    }
}
/**
 * Contains information about a role along with its origin.
 *
 * @category Management
 */
class RoleAndOrigin extends Role {
    /**
     * @internal
     */
    constructor(data) {
        super(data);
        this.origins = data.origins;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        let origins;
        if (data.origins) {
            origins = data.origins.map((originData) => Origin._fromNsData(originData));
        }
        else {
            origins = [];
        }
        return new RoleAndOrigin({
            ...Role._fromNsData(data),
            origins,
        });
    }
}
/**
 * Contains information about a user.
 *
 * @category Management
 */
class User {
    /**
     * @internal
     */
    constructor(data) {
        this.username = data.username;
        this.displayName = data.displayName;
        this.groups = data.groups;
        this.roles = data.roles;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        let roles;
        if (data.roles) {
            roles = data.roles
                .filter((roleData) => {
                // Check whether or not this role has originated from the user directly
                // or whether it was through a group.
                if (!roleData.origins || roleData.origins.length === 0) {
                    return false;
                }
                return !!roleData.origins.find((originData) => originData.type === 'user');
            })
                .map((roleData) => Role._fromNsData(roleData));
        }
        else {
            roles = [];
        }
        return new User({
            username: data.id,
            displayName: data.name,
            groups: data.groups,
            roles: roles,
            password: undefined,
        });
    }
    /**
     * @internal
     */
    static _toNsData(user) {
        let groups = undefined;
        if (user.groups && user.groups.length > 0) {
            groups = user.groups;
        }
        let roles = undefined;
        if (user.roles && user.roles.length > 0) {
            roles = user.roles.map((role) => Role._toNsStr(role)).join(',');
        }
        return {
            name: user.displayName,
            groups: groups,
            password: user.password,
            roles: roles,
        };
    }
}
/**
 * Contains information about a user along with some additional meta-data
 * about that user.
 *
 * @category Management
 */
class UserAndMetadata extends User {
    /**
     * Same as {@link effectiveRoles}, which already contains the roles
     * including their origins.
     *
     * @deprecated Use {@link effectiveRoles} instead.
     */
    get effectiveRolesAndOrigins() {
        return this.effectiveRoles;
    }
    /**
     * @internal
     */
    constructor(data) {
        super(data);
        this.domain = data.domain;
        this.effectiveRoles = data.effectiveRoles;
        this.passwordChanged = data.passwordChanged;
        this.externalGroups = data.externalGroups;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        let effectiveRoles;
        if (data.roles) {
            effectiveRoles = data.roles.map((roleData) => RoleAndOrigin._fromNsData(roleData));
        }
        else {
            effectiveRoles = [];
        }
        return new UserAndMetadata({
            ...User._fromNsData(data),
            domain: data.domain,
            effectiveRoles: effectiveRoles,
            effectiveRolesAndOrigins: effectiveRoles,
            passwordChanged: new Date(data.password_change_date),
            externalGroups: data.external_groups,
        });
    }
}
/**
 * Contains information about a group.
 *
 * @category Management
 */
class Group {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.roles = data.roles;
        this.ldapGroupReference = data.ldapGroupReference;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        let roles;
        if (data.roles) {
            roles = data.roles.map((roleData) => Role._fromNsData(roleData));
        }
        else {
            roles = [];
        }
        return new Group({
            name: data.id,
            description: data.description,
            roles: roles,
            ldapGroupReference: data.ldap_group_reference,
        });
    }
    /**
     * @internal
     */
    static _toNsData(group) {
        let roles = undefined;
        if (group.roles && group.roles.length > 0) {
            roles = group.roles.map((role) => Role._toNsStr(role)).join(',');
        }
        return {
            description: group.description,
            roles: roles,
            ldap_group_reference: group.ldapGroupReference,
        };
    }
}
/**
 * UserManager is an interface which enables the management of users,
 * groups and roles for the cluster.
 *
 * @category Management
 */
class UserManager {
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
     * Returns a specific user by their username.
     *
     * @param username The username of the user to fetch.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getUser(username, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const domainName = options.domainName || 'local';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/settings/rbac/users/${domainName}/${username}`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.UserNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get the user', undefined, errCtx);
            }
            const userData = JSON.parse(res.body.toString());
            return UserAndMetadata._fromNsData(userData);
        }, callback);
    }
    /**
     * Returns a list of all existing users.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllUsers(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const domainName = options.domainName || 'local';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/settings/rbac/users/${domainName}`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get users', undefined, errCtx);
            }
            const usersData = JSON.parse(res.body.toString());
            const users = usersData.map((userData) => UserAndMetadata._fromNsData(userData));
            return users;
        }, callback);
    }
    /**
     * Creates or updates an existing user.
     *
     * @param user The user to update.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async upsertUser(user, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const domainName = options.domainName || 'local';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const userData = User._toNsData(user);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Put,
                path: `/settings/rbac/users/${domainName}/${user.username}`,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)(userData),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to upsert user', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Change password for the currently authenticatd user.
     *
     * @param newPassword The new password to be applied.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async changePassword(newPassword, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const passwordData = { password: newPassword };
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/controller/changePassword`,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)(passwordData),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.UserNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to change password for the current user', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops an existing user.
     *
     * @param username The username of the user to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropUser(username, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const domainName = options.domainName || 'local';
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/settings/rbac/users/${domainName}/${username}`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.UserNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop the user', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Returns a list of roles available on the server.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getRoles(options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/settings/rbac/roles`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get roles', undefined, errCtx);
            }
            const rolesData = JSON.parse(res.body.toString());
            const roles = rolesData.map((roleData) => RoleAndDescription._fromNsData(roleData));
            return roles;
        }, callback);
    }
    /**
     * Returns a group by it's name.
     *
     * @param groupName The name of the group to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getGroup(groupName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/settings/rbac/groups/${groupName}`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.GroupNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get the group', undefined, errCtx);
            }
            const groupData = JSON.parse(res.body.toString());
            return Group._fromNsData(groupData);
        }, callback);
    }
    /**
     * Returns a list of all existing groups.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllGroups(options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/settings/rbac/groups`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get groups', undefined, errCtx);
            }
            const groupsData = JSON.parse(res.body.toString());
            const groups = groupsData.map((groupData) => Group._fromNsData(groupData));
            return groups;
        }, callback);
    }
    /**
     * Creates or updates an existing group.
     *
     * @param group The group to update.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async upsertGroup(group, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const groupData = Group._toNsData(group);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Put,
                path: `/settings/rbac/groups/${group.name}`,
                contentType: 'application/x-www-form-urlencoded',
                body: (0, utilities_1.cbQsStringify)(groupData),
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to upsert group', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops an existing group.
     *
     * @param groupName The name of the group to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropGroup(groupName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const timeout = options.timeout || this._cluster.managementTimeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/settings/rbac/groups/${groupName}`,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.GroupNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop the group', undefined, errCtx);
            }
        }, callback);
    }
}
const Origin$0 = void 0;
export { Origin };
export { Origin$0 as Origin };
export { Role };
