const SORT_ORDER = ['ASC', 'DESC'];

module.exports.selectFields = (fields, fieldEnum) => {
    return new Promise((resolve, reject) => {
        try {
            let selectedFields = {};
            if (fields) {
                fields.split(',').map(field => {
                    if (field && fieldEnum.includes(field)) {
                        selectedFields[field] = 1;
                    } else {
                        reject({
                            error: {
                                message: `Item "${field}" is invalid in fields query param`
                            }
                        });
                    }
                });
            }
            resolve(selectedFields);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getPaginationProps = pagination => {
    return new Promise(async (resolve, reject) => {
        try {
            let recordsToSkip = null;
            let pageSize = null;
            if (Object.keys(pagination).length === 2) {
                if (
                    'page' in pagination &&
                    'perPage' in pagination &&
                    typeof pagination.page === 'number' &&
                    typeof pagination.perPage === 'number'
                ) {
                    pageSize = pagination.perPage;
                    recordsToSkip = (pagination.page - 1) * pageSize;
                    if (pageSize < 1 || pagination.page < 1) {
                        reject({
                            error: {
                                message:
                                    'Input page and perPage value of pagination object should be more than 0'
                            }
                        });
                    }
                } else {
                    reject({
                        error: {
                            message:
                                'Input page and perPage value of pagination param should have valid numbers'
                        }
                    });
                }
            }
            resolve({
                recordsToSkip: recordsToSkip,
                pageSize: pageSize
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.verifySortParam = (sortParam, SORT_FIELD_ENUM) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortField = null;
            let sortOrder = null;
            if (Object.keys(sortParam).length === 2) {
                sortField = SORT_FIELD_ENUM.includes(sortParam.field)
                    ? sortParam.field
                    : reject({
                          error: {
                              message: `Invalid input "${sortParam.field}" for property field in sort query param`
                          }
                      });
                sortOrder = SORT_ORDER.includes(sortParam.order)
                    ? sortParam.order === 'DESC'
                        ? -1
                        : 1
                    : reject({
                          error: {
                              message: `Invalid input "${sortParam.order}" for property order in sort query param`
                          }
                      });
            }
            resolve({
                sortField: sortField,
                sortOrder: sortOrder
            });
        } catch (err) {
            reject(err);
        }
    });
};
