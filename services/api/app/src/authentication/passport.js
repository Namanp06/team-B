const passport = require('passport');
const config = require('../../config/config');
const AzureOIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const AzureBearerStrategy = require('passport-azure-ad').BearerStrategy;
const User = require('../model/User');
const server = require('../server');

module.exports = function passportAuth(req, res, next) {
    passport.serializeUser((user, done) => {
        done(null, user.UUID || user.oid);
    });

    passport.deserializeUser((oid, done) => {
        findByOid(oid, (err, user) => {
            done(err, user);
        });
    });

    const findByOid = async (oid, fn) => {
        const user = await User.findOne({ UUID: oid });
        if (user) {
            return fn(null, user);
        }
        return fn(null, null);
    };

    const oidcOptions = {
        identityMetadata: config.identityMetadata,
        clientID: config.clientID,
        responseType: config.responseType,
        responseMode: config.responseMode,
        redirectUrl: config.redirectUrl,
        allowHttpForRedirectUrl: config.allowHttpForRedirectUrl,
        clientSecret: config.clientSecret,
        validateIssuer: config.validateIssuer,
        isB2C: config.isB2C,
        issuer: config.issuer,
        passReqToCallback: config.passReqToCallback,
        scope: config.OidcScope,
        loggingLevel: config.loggingLevel,
        loggingNoPII: config.loggingNoPII,
        nonceLifetime: config.nonceLifetime,
        nonceMaxAmount: config.nonceMaxAmount,
        useCookieInsteadOfSession: config.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.cookieEncryptionKeys,
        clockSkew: config.clockSkew
    };

    const oidcStrategy = new AzureOIDCStrategy(
        oidcOptions,
        (req, iss, sub, profile, accessToken, refreshToken, done) => {
            try {
                server.log.info(
                    `Authentication/login - Request : ${req.originalMethod} | ${
                        req.originalUrl
                    } | ${JSON.stringify(
                        req.params,
                        null,
                        2
                    )} | ${JSON.stringify(req.body, null, 2)} | ${
                        req.headers.host
                    }`
                );
                server.log.info(
                    `Authentication - User profile - ${profile._json.name} | ${profile._json.preferred_username}`
                );
                if (!profile.oid) {
                    return done(new Error('No oid found'), null);
                }
                process.nextTick(function () {
                    findByOid(profile.oid, async function (err, user) {
                        if (err) {
                            server.log.Error(
                                `Error while finding user in passport: ${err}`
                            );
                            return done(err);
                        }
                        if (!user) {
                            // "Auto-registration"
                            const newUser = new User({
                                UUID: profile.oid,
                                email: profile._json.preferred_username,
                                name: profile._json.name
                            });
                            const user = await newUser.save();
                            user.refreshToken = refreshToken;
                            return done(null, user, accessToken);
                        }
                        user.refreshToken = refreshToken;
                        return done(null, user, accessToken);
                    });
                });
            } catch (err) {
                server.log.error(
                    `Error during passport authentication: ${err}`
                );
            }
        }
    );

    const bearerOptions = {
        identityMetadata: config.identityMetadata,
        clientID: config.clientID,
        validateIssuer: config.validateIssuer,
        issuer: config.issuer,
        passReqToCallback: config.passReqToCallback,
        isB2C: config.isB2C,
        allowMultiAudiencesInToken: config.allowMultiAudiencesInToken,
        audience: config.audience,
        loggingLevel: config.loggingLevel,
        loggingNoPII: config.loggingNoPII,
        clockSkew: config.clockSkew,
        scope: config.BearerScope
    };

    const bearerStrategy = new AzureBearerStrategy(
        bearerOptions,
        async function (req, token, done) {
            if (!token.oid) done(new Error('oid is not found in token'));
            else {
                server.log.info(
                    `Authorization - Request : ${req.originalMethod} | ${
                        req.originalUrl
                    } | ${JSON.stringify(
                        req.params,
                        null,
                        2
                    )} | ${JSON.stringify(req.body, null, 2)} | ${
                        req.headers.referer
                    } | ${req.headers.host}`
                );
                server.log.info(
                    `Authorization - User profile : ${token.name} | ${token.preferred_username}`
                );
                const user = await User.findOne({
                    UUID: token.oid
                });
                token.profile = user;
                done(null, token);
            }
        }
    );

    passport.use(oidcStrategy);
    passport.use(bearerStrategy);

    next();
};
