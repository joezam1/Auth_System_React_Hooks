import CommonValidators from '../validators/CommonValidators.js';

//Test:DONE
var safeJsonParse = function (input) {
    var value = input;
    if (CommonValidators.isValidJson(input)) {
        value = JSON.parse(input);
    }
    return value;
}

//Test:DONE
var getUrlRedirectTo = function(redirectTo){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var pathName = window.location.pathname;
    var search = window.location.search;
    var urlReferrer = protocol + "//" + host + "/" + pathName + search;
    var urlRedirect = protocol + "//" + host + redirectTo;
    return urlRedirect;
}


var service = Object.freeze({
    safeJsonParse: safeJsonParse,
    getUrlRedirectTo:getUrlRedirectTo
});

export default service;