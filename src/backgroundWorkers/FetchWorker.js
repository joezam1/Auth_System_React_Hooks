const fetchWorker = function () {
    self.onmessage = function (event) {

        console.log('fetchWorker-self.onmessage-event', event);
        if (event && event.data) {
            let message = event.data;
            let switchMessage = message.switchMessage;

            let methodVerb = message.xmlHttpRequest.method;
            let url = message.xmlHttpRequest.url;
            let body = message.xmlHttpRequest.jsonPayload;
            let headers = message.xmlHttpRequest.headers;
            let cors = message.xmlHttpRequest.corsMode;
            xmlttpRequestMethod(methodVerb, url, body, headers, true);
        }
    };

    //#REGION Private Functions

    let xmlttpRequestMethod = function(requestVerb ,requestUrl, body, headers, isAsync){

        let httpRequest = new XMLHttpRequest();
        httpRequest.open(requestVerb, requestUrl, isAsync);
        httpRequest.setRequestHeader(headers.name, headers.value)

        httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    console.log('response',httpRequest.responseText)
                    let responseResult = safeJsonParse(httpRequest.responseText);
                    let responseObj = {
                        name: `${requestVerb}DataResponse`,
                        status: httpRequest.status,
                        statusText: httpRequest.statusText,
                        data: responseResult
                    }
                    self.postMessage(responseObj);
                }
            }
        httpRequest.send(body);
    }



    var isValidJson = function(input){
        if( typeof(input) !== 'string' ){
            return false;
        }
        try{
            JSON.parse(input);
        }
        catch(error){
            return false;
        }
        return true;
    }

    var safeJsonParse = function (input) {
        var value = input;
        if (isValidJson(input)) {
            value = JSON.parse(input);
        }
        return value;
    }
    //#ENDREGION Private Functions
}

let codeString = fetchWorker.toString();
let codeObj = codeString.substring(codeString.indexOf("{") + 1, codeString.lastIndexOf("}"));
const blob = new Blob([codeObj], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
