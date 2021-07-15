const userService = require('../service/user-service');

module.exports.getUser = async (req, res) => {
    try {
        const filter =
            'filter' in req.query ? JSON.parse(req.query.filter) : {};
        const fields = req.query.fields;
        const sort = 'sort' in req.query ? JSON.parse(req.query.sort) : {};
        const pagination =
            'pagination' in req.query ? JSON.parse(req.query.pagination) : {};
        const userProfile = req.user.profile;
        const users = await userService.getUser(
            filter ? filter : {},
            fields,
            sort,
            pagination,
            userProfile
        );
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.set('X-Total-Count', users.count);
        res.send(users.data);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userProfile = req.user.profile;
        const user = await userService.getUserById(id, userProfile);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.addUser = async (req, res) => {
    try {
        const body = req.body;
        const userProfile = req.user.profile;
        const user = await userService.addUser(body, userProfile);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const userProfile = req.user.profile;
        const result = await userService.updateUserById(
            id,
            payload,
            userProfile
        );
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userProfile = req.user.profile;
        const result = await userService.deleteUserById(id, userProfile);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
};
