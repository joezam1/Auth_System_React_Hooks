import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import CookieService from '../cookieStorage/CookieService.js';
import LocalStorageService from '../localStorage/LocalStorageService.js';
import inputCommonInspector from '../validators/InputCommonInspector';

import WebWorkerManager from '../../backgroundWorkers/WebWorkerManager.js';
import FetchWorker from '../../backgroundWorkers/FetchWorker';

import FetchWorkerHelper from '../../backgroundWorkers/FetchWorkerHelper.js';
import HttpRequestMethod from '../../library/enumerations/HttpRequestMethod.js';
import WindowLocationProperty from '../../library/stringLiterals/WindowLocationProperty.js';
import Helpers from '../../library/common/Helpers.js';
import BackgroundWorker from '../../library/enumerations/BackgroundWorker.js';



const SessionAuthenticationService = (function(){
    //Test:DONE
    const redirectPrivateWebpagesMediator = function(redirectTo){
        console.log('redirectPrivateWebpagesMediator-redirectTo', redirectTo);
        saveRedirectValueToLocalStorage(redirectTo);
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
        let sessionToken = CookieService.getCookieFromDataStoreByName(cookieName);
        console.log('redirectPrivateWebpagesMediator-sessionToken', sessionToken);
        if( !inputCommonInspector.stringIsNullOrEmpty(sessionToken)){
            resolveSessionAuthenticationUsingWebWorkers( sessionToken);
        }
        else{

            console.log('redirectPrivateWebpagesMediator-LOGOUT TRIGGERED');
            Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
        }
    }

    return {
        redirectPrivateWebpagesMediator : redirectPrivateWebpagesMediator,
    }
})();

export default SessionAuthenticationService;

//#REGION Private Functions

function saveRedirectValueToLocalStorage( redirectTo ){
    LocalStorageService.removeItemFromLocalStorage(WindowLocationProperty.REDIRECT);
    LocalStorageService.setItemInLocalStorage( WindowLocationProperty.REDIRECT, redirectTo );

    let _redirectValue = LocalStorageService.getItemFromLocalStorage( WindowLocationProperty.REDIRECT );
    if(!inputCommonInspector.inputExist(_redirectValue)){
        console.log('WARNING-RedirectTo-value not SET:', _redirectValue);
        return;
    }
    console.log('RedirectTo-value SET-OK:', _redirectValue);
}

function resolveSessionAuthenticationUsingWebWorkers(currentSessionToken){
    WebWorkerManager.createNewWorker(FetchWorker, authenticateSessionFetchWorkerMessageCallback);
    let apiRequestMessage = getMessageForApiSession(currentSessionToken);
    console.log('resolveSessionAuthenticationUsingWebWorkers-apiRequestMessage', apiRequestMessage);
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


function authenticateSessionFetchWorkerMessageCallback(event){
    console.log('sessionWorkerOnMessageCallback-event', event)
    let sessionInfo = event?.data?.data?.result;

    console.log('sessionWorkerOnMessageCallback-event?.data?', event?.data)
    console.log('sessionWorkerOnMessageCallback-event?.data?.data?', event?.data?.data)
    console.log('sessionWorkerOnMessageCallback-event?.data?.data?.result', event?.data?.data?.result)
    console.log('sessionWorkerOnMessageCallback-sessionInfo', sessionInfo)



    console.log('sessionWorkerOnMessageCallback-sessionInfo', sessionInfo)
    if(inputCommonInspector.objectIsValid(sessionInfo)){
        let apiStoredSessionToken = sessionInfo?.sessionToken?.fieldValue;
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let currentSessionCookie = CookieService.getCookieFromDataStoreByName(cookieName);

        console.log('NEW apiStoredSessionToken', apiStoredSessionToken)
        console.log('CURRENT currentSessionCookie', currentSessionCookie)

        if(apiStoredSessionToken === currentSessionCookie){
            let currentLocationRedirect = LocalStorageService.getItemFromLocalStorage(WindowLocationProperty.REDIRECT);
            console.log('authenticateSessionFetchWorkerMessageCallback-currentLocationRedirect:' , currentLocationRedirect);

            if(inputCommonInspector.stringIsValid(currentLocationRedirect)){

                console.log('LOCATION REDIRECT IS VALID-currentLocationRedirect', currentLocationRedirect);

                Helpers.setUrlRedirect( currentLocationRedirect );
            }
            return;
        }
    }

     //we Verify the CALLBACK RESPONSE is from the backend API
     let fetchWorker = BackgroundWorker[BackgroundWorker.FetchWorker];
     if( inputCommonInspector.inputExist(event?.data?.name)  && event?.data?.name.includes( fetchWorker ) && event?.data?.statusText !== '' ){

        console.log('it is a verified and valid request from the API.');
         //No ACTIVE Session then LOGOUT
        console.log('authenticateSessionFetchWorkerMessageCallback-LOGOUT TRIGGERED');
        Helpers.setUrlRedirect( RouteConfig.authLogoutPath );;
     }


}

//#ENDREGION Private Functions