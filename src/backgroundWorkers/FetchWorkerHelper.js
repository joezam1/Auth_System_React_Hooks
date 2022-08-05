import MessageWorkerDataModel from '../dataModels/MessageWorkerDataModel.js';

let getMessageDataForFetchWorker = function(url ,requestMethod, headersArray, payload){

    let payloadString = JSON.stringify(payload);
    MessageWorkerDataModel.switchMessage = requestMethod;
    MessageWorkerDataModel.value ='';
    MessageWorkerDataModel.xmlHttpRequest.url = url;
    MessageWorkerDataModel.xmlHttpRequest.method = requestMethod;
    MessageWorkerDataModel.xmlHttpRequest.corsMode = 'cors';
    MessageWorkerDataModel.xmlHttpRequest.headersArray = headersArray;
    MessageWorkerDataModel.xmlHttpRequest.jsonPayload = payloadString;

    return MessageWorkerDataModel;
}

const service = {
    getMessageDataForFetchWorker : getMessageDataForFetchWorker
}

export default service;