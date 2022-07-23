'use strict'

import HttpRequest from './HttpRequests.js';

//Test:DONE
var getMethod = function (url, responseCallback, selectedHeaders = null) {
    var options = {
        method: 'GET',
        mode:'cors',
        headers: getHeaders(selectedHeaders)
    }

    HttpRequest.fetchMethod(url, options, responseCallback);
}

//Test:DONE
var postMethod = function (url, payload, responseCallback, selectedHeaders = null) {
    var jsonPayload = JSON.stringify(payload);

    var options = {
        method: 'POST',
        headers: getHeaders(selectedHeaders),
        body: jsonPayload
    }

    HttpRequest.fetchMethod(url, options, responseCallback);
}

var service = {
    getMethod: getMethod,
    postMethod: postMethod
}

export default service;



//#REGION Private Methods

function getHeaders(selectedHeaders) {
    var defaultHeaders = {
        'Content-Type':'application/json'
    }
    var authHeaders = null ; //TODO: getAuthenticationHeaders();
    var headers = null;
    if (selectedHeaders !== null) {
        headers = selectedHeaders;
    }
    var headers = Object.assign({},defaultHeaders,authHeaders,selectedHeaders)
    return headers;
}

//#ENDREGION Private Methods