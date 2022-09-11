


const ResourcesFetchApihWorker = function () {


    const monitorService = false;

    self.onmessage = function (event) {

        if(monitorService){console.log('ResourcesFetchApihWorker-self.onmessage-event', event)};
        if (event && event.data) {
            let message = event.data;
            let switchMessage = message.switchMessage;
            let methodVerb = message.xmlHttpRequest.method;
            let url = message.xmlHttpRequest.url;
            let body = message.xmlHttpRequest.jsonPayload;
            let headers = message.xmlHttpRequest.headersArray;
            let cors = message.xmlHttpRequest.corsMode;
            xmlttpRequestMethod(methodVerb, url, body, headers, true );
        }
    };


    //#REGION Private Functions

    let xmlttpRequestMethod = function(requestVerb ,requestUrl, body, headersArray, isAsync){

        let httpRequest = new XMLHttpRequest();
        httpRequest.open(requestVerb, requestUrl, isAsync);
        httpRequest.setRequestHeader('Content-type', 'application/json');
        httpRequest.setRequestHeader( 'Accept', 'application/json')
        if(headersArray !=null && headersArray != undefined && Array.isArray(headersArray)){
            for(let a=0; a<headersArray.length; a++){
                httpRequest.setRequestHeader(headersArray[a].name, headersArray[a].value)
            }
        }

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {

                let responseResult = safeJsonParse(httpRequest.responseText);
                let responseObj = {
                    name: `${requestVerb}_ResourcesFetchApihWorker_HTTP_Response `,
                    status: httpRequest.status,
                    statusText: httpRequest.statusText,
                    data: responseResult
                }
                if(monitorService){console.log('Fetc-hWorker-HTTPResponse',responseObj)};
                self.postMessage(responseObj);
            }
        }
        httpRequest.send(body);


        httpRequest.onerror = function(error) {
            if(monitorService){console.log('Fetch-hWorker-HTTPResponse-ERROR',error)};
            let errorObjSerializable = composeErrorObjectToStringify(error);
            if(monitorService){console.log('Fetch-hWorker-HTTPResponse-errorObjSerializable',errorObjSerializable)};
            self.postMessage(errorObjSerializable);
        };
    }

    let isValidJson = function(input){
        try{
            JSON.parse(input);
        }
        catch(error){
            return false;
        }
        return true;
    }

    let safeJsonParse = function (input) {
        let value = input;
        if (isValidJson(input)) {
            value = JSON.parse(input);
        }
        return value;
    }

    const composeErrorObjectToStringify = function(errorObj){
        if(monitorService){console.log('composeErrorObjectToStringify-errorObj', errorObj)};
        let newErrorObj = Object.assign({}, errorObj);
        let propertyExist  =  (('toJSON' in Error.prototype));
        if (!propertyExist){
            Object.defineProperty(newErrorObj, 'toJSON', {
                value: function () {
                    var alt = {};
                    Object.getOwnPropertyNames(errorObj).forEach(function (key) {
                        alt[key] = errorObj[key];
                    }, errorObj);
                    return alt;
                },
                configurable: true,
                writable: true
            });
        }

        return newErrorObj;
    }

    //#ENDREGION Private Functions
}

let codeString = ResourcesFetchApihWorker.toString();
let codeObj = codeString.substring(codeString.indexOf("{") + 1, codeString.lastIndexOf("}"));
const blob = new Blob([codeObj], { type: "application/javascript" });
const resourcesFetchWorkerScript =(typeof( URL.createObjectURL ) == 'function' ) ? URL.createObjectURL(blob) : '';

module.exports = resourcesFetchWorkerScript;
