const SessionFetchApiWorker = function () {
    self.onmessage = function (event) {

        console.log('SessionFetchApiWorker-self.onmessage-event', event);
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
                        name: `${requestVerb}_SessionFetchApiWorker_HTTP_Response`,
                        status: httpRequest.status,
                        statusText: httpRequest.statusText,
                        data: responseResult
                    }

                    console.log('SESSION-httpRequest.onreadystatechange-HTTP-RESPONSE',responseObj)
                    self.postMessage(responseObj);
                }
            }
        httpRequest.send(body);
    }



    var isValidJson = function(input){
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

let SessionCodeString = SessionFetchApiWorker.toString();
let SessionCodeObj = SessionCodeString.substring(SessionCodeString.indexOf("{") + 1, SessionCodeString.lastIndexOf("}"));
const blob = new Blob([SessionCodeObj], { type: "application/javascript" });
const sessionWorker_script =(typeof( URL.createObjectURL ) == 'function' ) ? URL.createObjectURL(blob) : '';

module.exports = sessionWorker_script;
