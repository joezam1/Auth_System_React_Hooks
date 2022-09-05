import InputCommonInspector from "../services/validators/InputCommonInspector";
const WebWorkerManager = (function () {

    let activeWorker = null;


    const createNewWorker = function (workerFileScript, callback) {
        console.log('createWorker-activeWorker', activeWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(activeWorker) ) {
            activeWorker = new Worker(workerFileScript);
            console.log(`BEGIN-createNewWorker-${workerFileScript}`);

            activeWorker.onmessage = function(event) {
                console.log(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    console.log('callback-isValid');
                    callback(event);
                }
            }

            activeWorker.onerror = function (error) {
                console.log(`[error] ${error.message}`);
                console.log(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        console.log('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            activeWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        console.log('BEGIN-terminateActiveWorker-activeWorker', activeWorker);
        if ((InputCommonInspector.inputExist(activeWorker))) {
            activeWorker.terminate();
            activeWorker = undefined;
            console.log('END-terminateActiveWorker-activeWorker', activeWorker);
        }
        console.log('terminateActiveWorker-activeWorker', activeWorker);
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


export default WebWorkerManager