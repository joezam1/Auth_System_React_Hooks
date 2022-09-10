import InputCommonInspector from "../services/validators/InputCommonInspector";
import ResourcesFetchApiWorker from './ResourcesFetchApiWorker.js';



const ResourcesWebWorkerManager = (function () {

    let resourcesWorker = null;
    const createNewWorker = function (callback) {
        console.log('createWorker-resourcesWorker', resourcesWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(resourcesWorker) ) {
            resourcesWorker = new Worker(ResourcesFetchApiWorker);
            console.log('BEGIN-createNewWorker', ResourcesFetchApiWorker);

            resourcesWorker.onmessage = function(event) {
                console.log(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    console.log('callback-isValid');
                    callback(event);
                }
            }

            resourcesWorker.onerror = function (error) {
                console.log(`[error] ${error.message}`);
                console.log(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        console.log('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            resourcesWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        console.log('BEGIN-terminateActiveWorker-resourcesWorker', resourcesWorker);
        if ((InputCommonInspector.inputExist(resourcesWorker))) {
            resourcesWorker.terminate();
            resourcesWorker = undefined;
            console.log('END-terminateActiveWorker-resourcesWorker', resourcesWorker);
        }
        console.log('terminateActiveWorker-resourcesWorker', resourcesWorker);
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