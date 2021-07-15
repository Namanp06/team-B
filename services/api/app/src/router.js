const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const user = require('./action/user');
const router = express.Router();
const passport = require('passport');
const auth = require('./authentication/auth');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get(
    '/login',
    passport.authenticate('azuread-openidconnect', {
        session: false,
        failureRedirect: '/login'
    }),
    auth.login
);

router.post(
    '/auth/openid/return',
    (req, res, next) => {
        passport.authenticate('azuread-openidconnect', {
            session: false,
            response: res,
            failureRedirect: '/login'
        })(req, res, next);
    },
    auth.postCallback
);

router.get(
    '/userinfo',
    passport.authenticate('oauth-bearer', {
        session: false
    }),
    auth.getUserInfo
);

router.post('/newtoken', auth.getNewToken);

// 'logout' route, logout from passport, and destroy the session with AAD.
router.get('/logout', auth.logout);

router
    .route('/user')
    .get(
        passport.authenticate('oauth-bearer', {
            session: false
        }),
        user.getUser
    )
    .post(
        passport.authenticate('oauth-bearer', {
            session: false
        }),
        user.addUser
    );

router
    .route('/user/:id')
    .get(
        passport.authenticate('oauth-bearer', {
            session: false
        }),
        user.getUserById
    )
    .put(
        passport.authenticate('oauth-bearer', {
            session: false
        }),
        user.updateUserById
    )
    .delete(
        passport.authenticate('oauth-bearer', {
            session: false
        }),
        user.deleteUserById
    );

module.exports = router;
