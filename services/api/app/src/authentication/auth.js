const request = require('request');
const _ = require('lodash');
const server = require('../server');
const config = require('../../config/config');
const util = require('../utils/util');

module.exports.login = (req, res) => {
    log.info('Login was called in Innovation Hub');
};

module.exports.postCallback = (req, res) => {
    server.log.info('We received a return from AzureAD.');
    res.cookie('hms_acct', req.authInfo, {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: true
    });
    res.cookie('hms_reft', req.user.refreshToken, {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: true
    });
    res.status(301).redirect(config.clientUrl);
};

module.exports.getUserInfo = async (req, res) => {
    try {
        const user = await _.omit(req.user.profile.toObject(), [
            'createdTime',
            'lastUpdatedTime',
            '__v'
        ]);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.getNewToken = (req, res) => {
    try {
        const postData = {
            client_id: config.clientID,
            scope: config.OidcScope.join(' '),
            refresh_token: req.body.refreshToken,
            redirect_uri: config.redirectUrl,
            grant_type: 'refresh_token',
            client_secret: config.clientSecret
        };

        request.post(
            {
                uri: config.tokenEndpoint,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: require('querystring').stringify(postData)
            },
            (err, result, body) => {
                let resBody = JSON.parse(body);
                if (err) {
                    res.status(400).send(err);
                } else if (resBody.error) {
                    res.status(400).send(resBody.error);
                } else {
                    res.cookie('hms_acct', resBody.access_token, {
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: true
                    });
                    res.cookie('hms_reft', resBody.refresh_token, {
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: true
                    });
                    resBody = _.pick(resBody, [
                        'token_type',
                        'access_token',
                        'refresh_token'
                    ]);
                    res.send(resBody);
                }
            }
        );
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie('hms_reft');
    res.clearCookie('hms_acct');
    if ('session' in req) {
        req.session.destroy(function (err) {
            req.logOut();
            res.redirect(config.destroySessionUrl);
        });
    } else {
        req.logOut();
        res.redirect(config.destroySessionUrl);
    }
};
