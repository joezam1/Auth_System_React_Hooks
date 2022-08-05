import React from 'react';
import { Navigate } from 'react-router-dom';

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

const AuthenticationInspector = (function(){

    let _redirectTo = '';
    let redirectPrivateWebpagesMediator = function(redirectTo){
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperties.NAME);
        let sessionToken = CookieService.getCookieFromDataStoreByName(cookieName);
        if( !inputCommonInspector.stringIsNullOrEmpty(sessionToken)){
            _redirectTo = redirectTo;
            WebWorkerManager.startNewWorker(FetchWorker, fetchWorkerMessageCallback);
            let message = getMessageDataForFetchWorker();
            WebWorkerManager.sendMessageToWorker(message);
        }
        else{
            return <Navigate to = { RouteConfig.authLogoutPath } />
        }
    }

    return {
        redirectPrivateWebpagesMediator : redirectPrivateWebpagesMediator
    }
})();

export default AuthenticationInspector;

//#REGION Private Functions
function getMessageDataForFetchWorker(){
    let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
    let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
    var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsUuidGet+cookieValue;

    let requestMethod = HttpRequestMethods[HttpRequestMethods.GET];
    let payload = {}
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, payload);
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
            return <Navigate to = { _redirectTo } />
        }
    }
    //if is not valid then LOGOUT
    return <Navigate to = { RouteConfig.authLogoutPath } />
}
//#ENDREGION Private Functions