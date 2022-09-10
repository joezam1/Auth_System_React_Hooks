import ResourcesWebWorkerManager from "../backgroundWorkers/ResourcesWebWorkerManager";
import TokenType from "../library/enumerations/TokenType";
import LocalStorageService from "../services/localStorage/LocalStorageService";
import ServerConfig from '../../configuration/server/ServerConfig.js';
import HttpRequestMethod from '../library/enumerations/HttpRequestMethod.js';
import FetchWorkerHelper from '../backgroundWorkers/FetchWorkerHelper.js';
import AntiforgeryTokenService from '../services/csrfProtection/AntiForgeryTokenService.js';
import EnvConfig from "../../configuration/environment/EnvConfig";
import HttpResponseStatus from "../library/enumerations/HttpResponseStatus";


const ResourcesInspector = (function(){

    //Test: DONE
    const resolveLoadResources = function(){

        let csrfTokenName = TokenType[TokenType.antiforgeryToken];
        let antiforgeryToken = LocalStorageService.removeItemFromLocalStorage (csrfTokenName);
        console.log('ResourcesInspector-antiforgeryToken:', antiforgeryToken);
        ResourcesWebWorkerManager.createNewWorker(resourcesCallback);
        let message = createMessageDataForSharedWorker();
        ResourcesWebWorkerManager.sendMessageToWorker(message);
    }


    return Object.freeze({
        resolveLoadResources : resolveLoadResources
    });

})();


export default ResourcesInspector;

//#REGION Private Functions

function createMessageDataForSharedWorker( ) {
    var resourcesUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.homeResourcesGet;
    let requestMethod = HttpRequestMethod[HttpRequestMethod.GET];
    let headersArray = [];
    let payload = { };
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(resourcesUrl, requestMethod, headersArray, payload);

    return message;
}


function resourcesCallback(event){

    console.log('resourcesCallback-event', event);
    let responseStatus = event?.data?.status;
    switch(responseStatus){
        case HttpResponseStatus._200ok:
            let antiforgeryToken = event?.data?.data?.result;
            let csrfTokenName = TokenType[TokenType.antiforgeryToken];
            let tokenOk = LocalStorageService.setItemInLocalStorage( csrfTokenName , antiforgeryToken );
            setTimeout(async function(){

                console.log('token',antiforgeryToken );
                let isValidCsrfToken = await AntiforgeryTokenService.verifyAntiForgeryTokenIsValidAsync(antiforgeryToken);
                if(isValidCsrfToken){
                    console.log('csrfTokenIsValid - OK');
                }
            }, 0);
        break;

        case HttpResponseStatus._401unauthorized:

        break;

        case HttpResponseStatus._400badRequest:

        break;

        default:
        break;
    }
}


//#ENDREGION Private Functions