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

const service = {
    getMethod : getMethod,
    postMethod : postMethod,
    deleteMethod : deleteMethod
}

export default service;



//#REGION Private Methods

function getHeaders(selectedHeadersObj) {
    var defaultHeadersObj = {
        'Content-Type':'application/json'
    }
    var authHeaders = null ; //TODO: getAuthenticationHeaders();
    var headers = null;
    // if (selectedHeaders !== null) {
    //     headers = selectedHeaders;
    // }
    var headers = Object.assign({},defaultHeadersObj,authHeaders,selectedHeadersObj)
    return headers;
}

//#ENDREGION Private Methods