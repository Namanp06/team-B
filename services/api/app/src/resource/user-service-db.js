const User = require('../model/User');

module.exports.getUser = (
    filter,
    selectedFields,
    sortField,
    order,
    recordsToSkip,
    pageSize
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.find(filter, selectedFields)
                .sort({ [sortField]: order })
                .skip(recordsToSkip)
                .limit(pageSize);
            const count = await User.countDocuments(filter).exec();
            resolve({ data, count });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getUserById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.addUser = payload => {
    const newUser = new User(payload);
    return new Promise(async (resolve, reject) => {
        try {
            const user = await newUser.save();
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.updateUserById = (id, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.findByIdAndUpdate(
                id,
                {
                    $set: payload
                },
                {
                    new: true
                }
            );
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.deleteUserById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.deleteOne({ _id: id });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};
