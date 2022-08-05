import MessageWorkerDataModel from '../dataModels/MessageWorkerDataModel.js';

let getMessageDataForFetchWorker = function(url ,requestMethod, payload){

    let payloadString = JSON.stringify(payload);
    MessageWorkerDataModel.switchMessage = requestMethod;
    MessageWorkerDataModel.value ='';
    MessageWorkerDataModel.xmlHttpRequest.url = url;
    MessageWorkerDataModel.xmlHttpRequest.method = requestMethod;
    MessageWorkerDataModel.xmlHttpRequest.corsMode = 'cors';
    MessageWorkerDataModel.xmlHttpRequest.headers = {name: 'Content-type', value: 'application/json' };
    MessageWorkerDataModel.xmlHttpRequest.jsonPayload = payloadString;

    return MessageWorkerDataModel;
}

const service = {
    getMessageDataForFetchWorker : getMessageDataForFetchWorker
}

export default service;