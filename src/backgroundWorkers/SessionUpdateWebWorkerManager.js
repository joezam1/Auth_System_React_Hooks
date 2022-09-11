import InputCommonInspector from "../services/validators/InputCommonInspector";
import SessionUpdateFetchApiWorker from './SessionUpdateFetchApiWorker.js';
import MonitorService from "../services/monitoring/MonitorService";


const SessionUpdateWebWorkerManager = (function () {

    let sessionWorker = null;
    const createNewWorker = function (callback) {
        MonitorService.capture('createWorker-sessionWorker', sessionWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(sessionWorker) ) {
            sessionWorker = new Worker(SessionUpdateFetchApiWorker);
            MonitorService.capture('BEGIN-createNewWorker', SessionUpdateFetchApiWorker);

            sessionWorker.onmessage = function(event) {
                MonitorService.capture(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    MonitorService.capture('callback-isValid');
                    callback(event);
                }
            }

            sessionWorker.onerror = function (error) {
                MonitorService.capture(`[error] ${error.message}`);
                MonitorService.capture(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        MonitorService.capture('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            sessionWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        MonitorService.capture('BEGIN-terminateActiveWorker-sessionWorker', sessionWorker);
        if ((InputCommonInspector.inputExist(sessionWorker))) {
            sessionWorker.terminate();
            sessionWorker = undefined;
            MonitorService.capture('END-terminateActiveWorker-sessionWorker', sessionWorker);
        }
        MonitorService.capture('terminateActiveWorker-sessionWorker', sessionWorker);
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


export default SessionUpdateWebWorkerManager