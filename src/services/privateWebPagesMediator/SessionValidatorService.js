import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import CookieService from '../cookieStorage/CookieService.js';
import LocalStorageService from '../localStorage/LocalStorageService.js';
import inputCommonInspector from '../validators/InputCommonInspector';
import WebWorkerManager from '../../backgroundWorkers/WebWorkerManager.js';
import FetchWorker from '../../backgroundWorkers/FetchWorker.js';
import FetchWorkerHelper from '../../backgroundWorkers/FetchWorkerHelper.js';
import HttpRequestMethod from '../../library/enumerations/HttpRequestMethod.js';
import WindowLocationProperty from '../../library/stringLiterals/WindowLocationProperty.js';
import Helpers from '../../library/common/Helpers.js';




const SessionValidatorService = (function(){
    //Test:DONE
    const redirectPrivateWebpagesMediator = function(redirectTo){
        LocalStorageService.setItemInLocalStorage( WindowLocationProperty.REDIRECT, redirectTo )
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
        let sessionToken = CookieService.getCookieFromDataStoreByName(cookieName);
        if( !inputCommonInspector.stringIsNullOrEmpty(sessionToken)){
            resolveSessionValidationUsingWebWorkers(FetchWorker, sessionToken);
        }
        else{
            Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
        }
    }

    return {
        redirectPrivateWebpagesMediator : redirectPrivateWebpagesMediator,
    }
})();

export default SessionValidatorService;

//#REGION Private Functions

function resolveSessionValidationUsingWebWorkers(selectedWebWorker, currentSessionToken){
    WebWorkerManager.startNewWorker(selectedWebWorker, validateSessionFetchWorkerMessageCallback);
    let apiRequestMessage = getMessageForApiSession(currentSessionToken);
    WebWorkerManager.sendMessageToWorker(apiRequestMessage);
}


function getMessageForApiSession(cookieValue){
    var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsSessionTokenGet;
    let requestMethod = HttpRequestMethod[HttpRequestMethod.GET];
    let headersArray = [{name:'x_session_id', value: cookieValue }];
    let payload = {};
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, headersArray, payload);
    return message;
}


function validateSessionFetchWorkerMessageCallback(event){
    console.log('sessionWorkerOnMessageCallback-event', event)
    let sessionInfo = event?.data?.data?.result;
    WebWorkerManager.terminateActiveWorker()
    if(inputCommonInspector.objectIsValid(sessionInfo)){
        let apiStoredSessionToken = sessionInfo?.sessionToken?.fieldValue;
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let currentSessionCookie = CookieService.getCookieFromDataStoreByName(cookieName);
        if(apiStoredSessionToken === currentSessionCookie){
            let locationRedirect = LocalStorageService.getItemFromLocalStorage(WindowLocationProperty.REDIRECT);
            LocalStorageService.removeItemFromLocalStorage(WindowLocationProperty.REDIRECT);
            if(inputCommonInspector.stringIsValid(locationRedirect)){
                Helpers.setUrlRedirect( locationRedirect );
            }
            return;
        }
    }
    //if is not valid then LOGOUT
    Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
}


//#ENDREGION Private Functions