import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import CookieProperties from '../../library/stringLiterals/CookieProperties.js';
import CookieService from '../cookieStorage/CookieService.js';
import LocalStorageService from '../localStorage/LocalStorageService.js';
import inputCommonInspector from '../validators/InputCommonInspector';
import WebWorkerManager from '../../backgroundWorkers/WebWorkerManager.js';
import FetchWorker from '../../backgroundWorkers/FetchWorker.js';
import FetchWorkerHelper from '../../backgroundWorkers/FetchWorkerHelper.js';
import HttpRequestMethods from '../../library/enumerations/HttpRequestMethods.js';
import WindowLocationProperties from '../../library/stringLiterals/WindowLocationProperties.js';

const AuthenticationInspector = (function(){

    let redirectPrivateWebpagesMediator = function(redirectTo){
        LocalStorageService.setItemInLocalStorage( WindowLocationProperties.REDIRECT, redirectTo )
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperties.NAME);
        let sessionToken = CookieService.getCookieFromDataStoreByName(cookieName);
        if( !inputCommonInspector.stringIsNullOrEmpty(sessionToken)){

            WebWorkerManager.startNewWorker(FetchWorker, fetchWorkerMessageCallback);
            let message = getMessage();
            WebWorkerManager.sendMessageToWorker(message);
        }
        else{
            setUrlRedirect( RouteConfig.authLogoutPath );
        }
    }

    return {
        redirectPrivateWebpagesMediator : redirectPrivateWebpagesMediator
    }
})();

export default AuthenticationInspector;

//#REGION Private Functions
function getMessage(){
    let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
    let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
    var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsSessionTokenGet;

    let requestMethod = HttpRequestMethods[HttpRequestMethods.GET];
    let headersArray = [{name:'x_session_id',value: cookieValue }];
    let payload = {};
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, headersArray, payload);
    return message;
}


function fetchWorkerMessageCallback(event){

    console.log('sessionWorkerOnMessageCallback-event', event)
    let sessionInfo = event?.data?.data?.result;
    WebWorkerManager.terminateActiveWorker()
    if(inputCommonInspector.objectIsValid(sessionInfo)){
        let apiStoredSessionToken = sessionInfo?.sessionToken?.fieldValue;
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
        let currentSessionCookie = CookieService.getCookieFromDataStoreByName(cookieName);
        if(apiStoredSessionToken === currentSessionCookie){
            let locationRedirect = LocalStorageService.getItemFromLocalStorage(WindowLocationProperties.REDIRECT);
            LocalStorageService.removeItemFromLocalStorage(WindowLocationProperties.REDIRECT);
            setUrlRedirect( locationRedirect );
            return;
        }
    }
    //if is not valid then LOGOUT
    setUrlRedirect( RouteConfig.authLogoutPath );
}

function setUrlRedirect(redirectTo){
    var protocol = window.location.protocol;
    var host = window.location.host
    var pathName = window.location.pathname;
    var search = window.location.search
    var referrerUrl = protocol  + "//" + host + "/" + pathName + search
    var urlRedirect = protocol  + "//" + host + redirectTo;
    window.location.href =urlRedirect;
}

//#ENDREGION Private Functions