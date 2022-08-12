'use strict'

import HttpRequest from './HttpRequests.js';
import HttpRequestMethods from '../../library/enumerations/HttpRequestMethods.js';



//Test:DONE
let getMethod = function (url, responseCallback, selectedHeaders = null) {
    let options = {
        method: HttpRequestMethods[HttpRequestMethods.GET],
        mode:'cors',
        headers: getHeaders(selectedHeaders)
    }

    HttpRequest.fetchMethod(url, options, responseCallback);
}

//Test:DONE
let postMethod = function (url, payload, responseCallback, selectedHeaders = null) {
    let jsonPayload = JSON.stringify(payload);

    let options = {
        method: HttpRequestMethods[HttpRequestMethods.POST],
        mode:'cors',
        headers: getHeaders(selectedHeaders),
        body: jsonPayload
    }

    HttpRequest.fetchMethod(url, options, responseCallback);
}

//Test: DONE
let deleteMethod = function (url, payload, responseCallback, selectedHeaders = null) {
    let jsonPayload = JSON.stringify(payload);

    let options = {
        method: HttpRequestMethods[HttpRequestMethods.DELETE],
        mode:'cors',
        headers: getHeaders(selectedHeaders),
        body: jsonPayload
    }

    HttpRequest.fetchMethod(url, options, responseCallback);
}

const service = Object.freeze({
    getMethod : getMethod,
    postMethod : postMethod,
    deleteMethod : deleteMethod
});

export default service;



//#REGION Private Methods

function getHeaders(selectedHeadersObj) {
    let defaultHeadersObj = {
        'Content-Type':'application/json'
    }
    let authHeaders = null ; //TODO: getAuthenticationHeaders();
    let headers = Object.assign({},defaultHeadersObj,authHeaders,selectedHeadersObj)
    return headers;
}

//#ENDREGION Private Methods