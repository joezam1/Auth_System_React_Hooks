import inputCommonInspector from "../services/validators/InputCommonInspector";
const WebWorkerManager = (function () {

    let activeWorker;
    const startNewWorker = function (workerFileScript, callback) {
        if (backgroundWorkerIsValid()) {
            activeWorker = new Worker(workerFileScript);
            console.log(`BEGIN-StartNewWorker-${workerFileScript}`);
            activeWorker.onmessage = function (event) {
                console.log(`startNewWorker.${workerFileScript}-onmessage-MESSAGE RECEIVED:`, event);
                if (callback !== null && !inputCommonInspector.valueIsUndefined(callback)) {
                    console.log('callback-isValid');
                    callback(event);
                }
            }
        }
    }

    const sendMessageToWorker = function (messageObj) {
        console.log('WORKER-MANAGER- sendMessageToWorker- messageObj:', messageObj)
        if (backgroundWorkerIsValid()) {
            activeWorker.postMessage(messageObj);
        }

    }

    const terminateActiveWorker = function () {
        console.log('BEGIN-terminateActiveWorker-activeWorker', activeWorker);
        if ((activeWorker !== null && activeWorker !== undefined)) {
            activeWorker.terminate();
            activeWorker = undefined;
            console.log('END-terminateActiveWorker-activeWorker', activeWorker);
        }
        console.log('terminateActiveWorker-activeWorker', activeWorker);
    }


    return Object.freeze({
        startNewWorker: startNewWorker,
        sendMessageToWorker: sendMessageToWorker,
        terminateActiveWorker: terminateActiveWorker
    });

    //#REGION Private Functions

    function backgroundWorkerIsValid() {
        if (window.Worker && typeof (Worker) !== 'undefined') {
            return true;
        }
        return false;
    }
    //#ENDREGION Private Functions

})();


export default WebWorkerManager