const util = require('../utils/util');
const userDB = require('../resource/user-service-db');
const USER_FIELDS = [
    '_id',
    'UUID',
    'name',
    'email',
    'createdTime',
    'lastUpdatedTime'
];
const USER_SORT_FIELDS = [
    '_id',
    'UUID',
    'name',
    'email',
    'createdTime',
    'lastUpdatedTime'
];

module.exports.getUser = (filter, fields, sort, pagination, userProfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users;
            const selectedFields = await util.selectFields(fields, USER_FIELDS);
            const sortRes = await util.verifySortParam(sort, USER_SORT_FIELDS);
            const sortField = sortRes.sortField;
            const sortOrder = sortRes.sortOrder;
            const paginationProps = await util.getPaginationProps(pagination);
            const recordsToSkip = paginationProps.recordsToSkip;
            const pageSize = paginationProps.pageSize;
            users = await userDB.getUser(
                filter,
                selectedFields,
                sortField,
                sortOrder,
                recordsToSkip,
                pageSize
            );
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getUserById = (id, userProfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userDB.getUserById(id);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.addUser = (payload, userProfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userDB.addUser(payload);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.updateUserById = (id, payload, userProfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userDB.updateUserById(id, payload);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.deleteUserById = (id, userProfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await userDB.deleteUserById(id);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};
