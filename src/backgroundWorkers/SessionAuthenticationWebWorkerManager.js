import InputCommonInspector from "../services/validators/InputCommonInspector";
import SessionAuthenticationFetchApiWorker from './SessionAuthenticationFetchApiWorker';
import MonitorService from "../services/monitoring/MonitorService";


const SessionAuthenticationWebWorkerManager = (function () {

    let activeWorker = null;
    const createNewWorker = function ( callback ) {
        MonitorService.capture('createWorker-activeWorker', activeWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(activeWorker) ) {
            activeWorker = new Worker(SessionAuthenticationFetchApiWorker);
            MonitorService.capture('BEGIN-createNewWorker-',SessionAuthenticationFetchApiWorker);

            activeWorker.onmessage = function(event) {
                MonitorService.capture(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    MonitorService.capture('callback-isValid');
                    callback(event);
                }
            }

            activeWorker.onerror = function (error) {
                MonitorService.capture(`[error] ${error.message}`);
                MonitorService.capture(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        MonitorService.capture('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            activeWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        MonitorService.capture('BEGIN-terminateActiveWorker-activeWorker', activeWorker);
        if ((InputCommonInspector.inputExist(activeWorker))) {
            activeWorker.terminate();
            activeWorker = undefined;
            MonitorService.capture('END-terminateActiveWorker-activeWorker', activeWorker);
        }
        MonitorService.capture('terminateActiveWorker-activeWorker', activeWorker);
    }


    return Object.freeze({
        createNewWorker : createNewWorker,
        sendMessageToWorker: sendMessageToWorker,
        terminateActiveWorker: terminateActiveWorker
    });

    //#REGION Private Functions

    function browserSupportsWorker() {
        if (window.Worker && typeof (Worker) !== 'undefined') {
            return true;
        }
        return false;
    }
    //#ENDREGION Private Functions

})();


export default SessionAuthenticationWebWorkerManager;