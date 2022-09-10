import CommonValidators from '../validators/CommonValidators.js';


//Test: DONE
function fetchMethod(url, options, responseCallback) {
    fetch(url, options)
        .then(function (response) {
            console.log('response:', response);
            return response.text();
        })
        .then(function (result) {
            console.log('result:', result);
            var responseObj = CommonValidators.safeJsonParse(result);
            console.log('responseObj:', responseObj);

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