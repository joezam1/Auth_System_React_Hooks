import InputCommonInspector from "../services/validators/InputCommonInspector";
import ResourcesFetchApiWorker from './ResourcesFetchApiWorker.js';
import MonitorService from "../services/monitoring/MonitorService";



const ResourcesWebWorkerManager = (function () {

    let resourcesWorker = null;
    const createNewWorker = function (callback) {
        MonitorService.capture('createWorker-resourcesWorker', resourcesWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(resourcesWorker) ) {
            resourcesWorker = new Worker(ResourcesFetchApiWorker);
            MonitorService.capture('BEGIN-createNewWorker', ResourcesFetchApiWorker);

            resourcesWorker.onmessage = function(event) {
                MonitorService.capture(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    MonitorService.capture('callback-isValid');
                    callback(event);
                }
            }

            resourcesWorker.onerror = function (error) {
                MonitorService.capture(`[error] ${error.message}`);
                MonitorService.capture(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        MonitorService.capture('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            resourcesWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        MonitorService.capture('BEGIN-terminateActiveWorker-resourcesWorker', resourcesWorker);
        if ((InputCommonInspector.inputExist(resourcesWorker))) {
            resourcesWorker.terminate();
            resourcesWorker = undefined;
            MonitorService.capture('END-terminateActiveWorker-resourcesWorker', resourcesWorker);
        }
        MonitorService.capture('terminateActiveWorker-resourcesWorker', resourcesWorker);
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


export default ResourcesWebWorkerManager