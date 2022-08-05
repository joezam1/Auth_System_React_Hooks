import inputCommonInspectorService from "../services/validators/InputCommonInspector";
const WebWorkerManager = (function(){

    let activeWorker;
    const startNewWorker = function(workerFileScript, callback){
        if(backgroundWorkerIsValid()){
            activeWorker = new Worker(workerFileScript);
            console.log (`BEGIN-StartNewWorker-${workerFileScript}`);
            activeWorker.onmessage = function(event){
                console.log(`startNewWorker.${workerFileScript}-onmessage-MESSAGE RECEIVED-${event}`);
                if(!inputCommonInspectorService.objectIsNullOrEmpty(callback) && !inputCommonInspectorService.valueIsUndefined(callback)){
                    callback(event);
                }
            }
        }
    }

    const sendMessageToWorker = function(messageObj){
        if(backgroundWorkerIsValid()){
            activeWorker.postMessage(messageObj);
            let messageObjString = messageObj.toString();
            console.log(`${activeWorker}-sendMessageToWorker-${messageObjString}`)
        }
    }

    const terminateActiveWorker = function(){
        console.log('BEGIN-terminateActiveWorker-activeWorker',activeWorker);
        activeWorker.terminate();
        activeWorker = undefined;
        console.log('END-terminateActiveWorker-activeWorker',activeWorker);
    }


    return {
        startNewWorker : startNewWorker,
        sendMessageToWorker : sendMessageToWorker,
        terminateActiveWorker : terminateActiveWorker
    }

    //#REGION Private Functions

    function backgroundWorkerIsValid(){
        if( window.Worker && typeof(Worker) !== 'undefined'){
            return true;
        }
        return false;
    }
    //#ENDREGION Private Functions

})();


export default WebWorkerManager