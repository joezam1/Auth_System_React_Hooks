import InputCommonInspector from "../services/validators/InputCommonInspector";




const SessionWebWorkerManager = (function () {

    let sessionWorker = null;


    const createNewWorker = function (sessionWorkerFileScript, callback) {
        console.log('createWorker-sessionWorker', sessionWorker);
        if (browserSupportsWorker() && !InputCommonInspector.inputExist(sessionWorker) ) {
            sessionWorker = new Worker(sessionWorkerFileScript);
            console.log('BEGIN-createNewWorker', sessionWorker);

            sessionWorker.onmessage = function(event) {
                console.log(`web-worker-onmessage-MESSAGE RECEIVED:`, event);
                if (InputCommonInspector.inputExist(callback)) {
                    console.log('callback-isValid');
                    callback(event);
                }
            }

            sessionWorker.onerror = function (error) {
                console.log(`[error] ${error.message}`);
                console.log(`[SOCKET] ${error.message}`);
                callback(error);
            };
        }
    }



    const sendMessageToWorker = function (messageObj) {
        console.log('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (browserSupportsWorker()) {
            sessionWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        console.log('BEGIN-terminateActiveWorker-sessionWorker', sessionWorker);
        if ((InputCommonInspector.inputExist(sessionWorker))) {
            sessionWorker.terminate();
            sessionWorker = undefined;
            console.log('END-terminateActiveWorker-sessionWorker', sessionWorker);
        }
        console.log('terminateActiveWorker-sessionWorker', sessionWorker);
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


export default SessionWebWorkerManager