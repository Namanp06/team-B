/*jshint esversion: 6 */
/*global fetch, btoa */
import Q from 'q';
/**
 * `MERN-API` provides APIs for various user operations performed on `mern-starter`.
 * @class UiApiUtils
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
let UiApiUtils = (function () {
    'use strict';

    function UiApiUtils(options) {
        let domain = typeof options === 'object' ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.apiKey =
            typeof options === 'object'
                ? options.apiKey
                    ? options.apiKey
                    : {}
                : {};
    }

    function serializeQueryParams(parameters) {
        let str = [];
        for (let p in parameters) {
            if (parameters.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) +
                        '=' +
                        encodeURIComponent(parameters[p])
                );
            }
        }
        return str.join('&');
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (
                parameterName
            ) {
                let parameter = parameters.$queryParameters[parameterName];
                queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name UiApiUtils#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    UiApiUtils.prototype.request = function (
        method,
        url,
        parameters,
        body,
        headers,
        queryParameters,
        form,
        deferred
    ) {
        const queryParams =
            queryParameters && Object.keys(queryParameters).length
                ? serializeQueryParams(queryParameters)
                : null;
        const urlWithParams = url + (queryParams ? '?' + queryParams : '');

        if (body && !Object.keys(body).length) {
            body = undefined;
        }

        fetch(urlWithParams, {
            method,
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                return {
                    data: response.json(),
                    headers: { status: response.status }
                };
            })
            .then(body => {
                deferred.resolve(body);
            })
            .catch(error => {
                deferred.reject(error);
            });
    };

    /**
     * Set Api Key
     * @method
     * @name UiApiUtils#setApiKey
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    UiApiUtils.prototype.setApiKey = function (
        value,
        headerOrQueryName = 'Authorization',
        isQuery = false
    ) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
     * Set Auth headers
     * @method
     * @name UiApiUtils#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    UiApiUtils.prototype.setAuthHeaders = function (headerParams) {
        let headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    };

    /**
     * Get user(s) of MERN API
     * @method
     * @name UiApiUtils#getUser
     * @param {object} parameters - method options and parameters
     * @param {object} parameters.filter - MongoDB filter to fetch records with specific criteria
     * @param {array} parameters.fields - Fetch only the specific field(s) for the given input
     * @param {object} parameters.sort - user records to be sorted based on the selected field
     * @param {object} parameters.pagination - Input object to get paginated results
     */
    UiApiUtils.prototype.getUser = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters['fields'] !== undefined) {
            queryParameters['fields'] = parameters['fields'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters['pagination'] !== undefined) {
            queryParameters['pagination'] = parameters['pagination'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'GET',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Add new user to MERN API
     * @method
     * @name UiApiUtils#postUser
     * @param {object} parameters - method options and parameters
     * @param {} parameters.payload - Input payload of new user
     */
    UiApiUtils.prototype.postUser = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['payload'] !== undefined) {
            body = parameters['payload'];
        }

        if (parameters['payload'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: payload'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'POST',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Get user of MERN API for specific id
     * @method
     * @name UiApiUtils#getUserById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Id of the specific user
     */
    UiApiUtils.prototype.getUserById = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'GET',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Update specific user record for user(s)
     * @method
     * @name UiApiUtils#putUserById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Mongo document _id to update specific field(s) of a user
     * @param {} parameters.payload - Input payload with updated field(s) of a user
     */
    UiApiUtils.prototype.putUserById = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['payload'] !== undefined) {
            body = parameters['payload'];
        }

        if (parameters['payload'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: payload'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'PUT',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Delete specific user record of user(s)
     * @method
     * @name UiApiUtils#deleteUserById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Mongo document _id to delete a user
     */
    UiApiUtils.prototype.deleteUserById = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'DELETE',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Get logged in userinfo of MERN API
     * @method
     * @name UiApiUtils#getUserinfo
     * @param {object} parameters - method options and parameters
     */
    UiApiUtils.prototype.getUserinfo = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userinfo';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'GET',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * Get new access_token and id_token from Azure AD using refresh_token
     * @method
     * @name UiApiUtils#postNewtoken
     * @param {object} parameters - method options and parameters
     * @param {} parameters.payload - refresh_token of logged in user
     */
    UiApiUtils.prototype.postNewtoken = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/newtoken';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['payload'] !== undefined) {
            body = parameters['payload'];
        }

        if (parameters['payload'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: payload'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'POST',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };

    return UiApiUtils;
})();

export default UiApiUtils;
