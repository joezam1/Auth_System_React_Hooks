const FetcApihWorker = function () {

    self.onmessage = function (event) {

        console.log('FetchWorker-self.onmessage-event', event);
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
                        name: `${requestVerb}_FetchWorker_HTTP_Response `,
                        status: httpRequest.status,
                        statusText: httpRequest.statusText,
                        data: responseResult
                    }
                    console.log('Fetc-hWorker-HTTPResponse',responseObj)
                    self.postMessage(responseObj);
                }
            }
        httpRequest.send(body);


        httpRequest.onerror = function(error) {
            console.log('Fetc-hWorker-HTTPResponse-ERROR',error)
                    self.postMessage(error);
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
    //#ENDREGION Private Functions
}

let codeString = FetcApihWorker.toString();
let codeObj = codeString.substring(codeString.indexOf("{") + 1, codeString.lastIndexOf("}"));
const blob = new Blob([codeObj], { type: "application/javascript" });
const worker_script =(typeof( URL.createObjectURL ) == 'function' ) ? URL.createObjectURL(blob) : '';

module.exports = worker_script;
