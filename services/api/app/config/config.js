require('dotenv').config();

var config = {
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    port: process.env.PORT,
    allowedOrigin: process.env.ALLOWED_ORIGIN,
    dbUsername: process.env.DB_USERNAME || null,
    dbPassword: process.env.DB_PASSWORD || null,
    clientUrl: process.env.CLIENT_URL,
    tenantId: process.env.TENANT_ID || '3dea23b2-28a9-43b1-887c-e4a5a78a54ef',
    identityMetadata:
        process.env.IDENTITY_METADATA ||
        `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`,

    tokenEndpoint:
        process.env.TOKEN_ENDPOINT ||
        `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,

    clientID: process.env.CLIENT_ID,

    responseType: process.env.RESPONSE_TYPE,

    responseMode: process.env.RESPONSE_MODE,

    redirectUrl:
        process.env.REDIRECT_URL ||
        `http://localhost:${process.env.PORT}/api/auth/openid/return`,

    // Required if we use http for redirectUrl
    allowHttpForRedirectUrl: true,

    // If app key contains '\', replace it with '\\'.
    clientSecret: process.env.CLIENT_SECRET,

    validateIssuer: true,

    isB2C: false,

    // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
    issuer:
        process.env.ISSUER ||
        `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0`,

    // Required to set to true if the `verify` function has 'req' as the first parameter
    passReqToCallback: true,

    // Recommended to set to true. By default we save state in express session, if this option is set to true, then
    // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
    // to be completely express session free.
    useCookieInsteadOfSession: true,

    // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
    // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
    // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
    cookieEncryptionKeys: [
        { key: '12345678901234567890123456789012', iv: '123456789012' },
        { key: 'abcdefghijklmnopqrstuvwxyzabcdef', iv: 'abcdefghijkl' }
    ],

    // Optional. The additional scope you want besides 'openid', for example: ['email', 'profile'].
    OidcScope: process.env.OIDC_SCOPE || [
        'openid',
        'profile',
        'offline_access',
        `api://${process.env.CLIENT_ID}/access_as_user`
    ],

    BearerScope: process.env.BEARER_SCOPE || ['access_as_user'],

    // Optional, 'error', 'warn' or 'info'
    loggingLevel: process.env.LOGGING_LEVEL,

    // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
    nonceLifetime: process.env.NONCE_LIFETIME || null,

    // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
    nonceMaxAmount: 5,

    // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
    clockSkew: process.env.CLOCK_SKEW || null,

    destroySessionUrl:
        process.env.DESTROY_SESSION_URL ||
        `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${process.env.CLIENT_URL}`,

    useMongoDBSessionStore: false,

    // How long you want to keep session in mongoDB.
    mongoDBSessionMaxAge: process.env.MONGO_DB_SESSION_MAX_AGE || 24 * 60 * 60, // 1 day (unit is second)

    allowMultiAudiencesInToken: true,

    loggingNoPII: true,

    audience: process.env.CLIENT_ID
};

module.exports = config;
