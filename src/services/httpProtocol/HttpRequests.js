
import RequestHelper from './RequestHelpers.js';
import InputCommonInspector from '../validators/InputCommonInspector.js';


//Test: DONE
function fetchMethod(url, options, responseCallback) {
    fetch(url, options)
        .then(function (response) {
            console.log('response:', response);
            return response.text();
        })
        .then(function (result) {
            console.log('result:', result);
            var responseObj = RequestHelper.safeJsonParse(result);
            console.log('responseObj:', responseObj);
            if (InputCommonInspector.objectIsValid(responseObj) && InputCommonInspector.stringIsValid(responseObj.replacementToken)) {
                //TODO: setAccessTokenReplacement(responseOjb.replacementToken);
            }

            if (InputCommonInspector.objectIsValid(responseObj) && InputCommonInspector.stringIsValid(responseObj.redirectTo)) {
                window.location.href = RequestHelper.getUrlRedirectto(responseObj.redirectTo);
                return;
            }

            responseCallback(responseObj);

        })
        .catch(function (error) {
            var errorObj = new Error("Promise Error:" + error);
            console.log(errorObj);
        })
}

let service = Object.freeze({
    fetchMethod:fetchMethod
});
export default service;