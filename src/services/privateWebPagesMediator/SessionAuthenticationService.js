import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import CookieService from '../cookieStorage/CookieService.js';
import LocalStorageService from '../localStorage/LocalStorageService.js';
import inputCommonInspector from '../validators/InputCommonInspector';

import SessionAuthenticationWebWorkerManager from '../../backgroundWorkers/SessionAuthenticationWebWorkerManager.js';
import FetchWorkerHelper from '../../backgroundWorkers/FetchWorkerHelper.js';
import HttpRequestMethod from '../../library/enumerations/HttpRequestMethod.js';
import WindowLocationProperty from '../../library/stringLiterals/WindowLocationProperty.js';
import Helpers from '../../library/common/Helpers.js';
import BackgroundWorker from '../../library/enumerations/BackgroundWorker.js';
import httpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';


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
    SessionAuthenticationWebWorkerManager.createNewWorker( authenticateSessionFetchWorkerMessageCallback );
    let apiRequestMessage = createMessageForApiSession(currentSessionToken);
    console.log('resolveSessionAuthenticationUsingWebWorkers-apiRequestMessage', apiRequestMessage);
    SessionAuthenticationWebWorkerManager.sendMessageToWorker(apiRequestMessage);
}


function createMessageForApiSession(cookieValue){
    var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsSessionTokenGet;
    let requestMethod = HttpRequestMethod[HttpRequestMethod.GET];
    let headersArray = [{name:'x_session_id', value: cookieValue }];
    let payload = {};
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, headersArray, payload);
    return message;
}


function authenticateSessionFetchWorkerMessageCallback(event){
    console.log('sessionWorkerOnMessageCallback-event', event);
    console.log('sessionWorkerOnMessageCallback-event?.data?', event?.data);
    console.log('sessionWorkerOnMessageCallback-event?.data?.data?', event?.data?.data);
    console.log('sessionWorkerOnMessageCallback-event?.data?.data?.result', event?.data?.data?.result);

    let sessionInfo = event?.data?.data?.result;
    console.log('sessionWorkerOnMessageCallback-sessionInfo', sessionInfo);
    let responseStatus = event?.data?.status ;

    switch(responseStatus){
        case httpResponseStatus._200ok:
            let storedSessionIsAuthentic = resolveCurrentSessionAuthentication(sessionInfo);
            if(storedSessionIsAuthentic){
                executePrivateRedirect();
            }
        break;

        case httpResponseStatus._401unauthorized:
            Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
        break;

        case httpResponseStatus._400badRequest:
            Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
        break;

        default:
            //For Any other Case we Verify the CALLBACK RESPONSE is from the backend API
            let sessionAuthenticationFetchWorker = BackgroundWorker[BackgroundWorker.SessionAuthenticationFetchApihWorker ];
            if(isValidHttpResponseFromSelectedWorker( sessionAuthenticationFetchWorker , event ) ){
                console.log('it is a verified and valid request from the API.');
                console.log('No ACTIVE Session FOUND then LOGOUT');
                console.log('authenticateSessionFetchWorkerMessageCallback-LOGOUT TRIGGERED');
                Helpers.setUrlRedirect( RouteConfig.authLogoutPath );
            }
        break;
    }
}

function isValidHttpResponseFromSelectedWorker(selectedWorker, event){
    let selectedWorkerNameLowerCase = selectedWorker.tolowerCase();
    let workerFileNameLowerCase = event?.data?.name?.tolowerCase();
    if( inputCommonInspector.inputExist(event?.data?.name)  &&
        workerFileNameLowerCase.includes( selectedWorkerNameLowerCase ) &&
        event?.data?.status !== 0 && event?.data?.statusText !== '' ){
            return true;
    }
    return false;
}

function resolveCurrentSessionAuthentication(sessionInfo){
    console.log('sessionWorkerOnMessageCallback-sessionInfo', sessionInfo)
    if(inputCommonInspector.objectIsValid(sessionInfo)){
        let apiStoredSessionToken = sessionInfo?.sessionToken?.fieldValue;
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let currentSessionToken = CookieService.getCookieFromDataStoreByName(cookieName);
        console.log('NEW API Stored SessionToken', apiStoredSessionToken)
        console.log('CURRENT SessionToken', currentSessionToken)
        if(apiStoredSessionToken === currentSessionToken){
            return true;
        }
    }
    return false;
}

function executePrivateRedirect(){
    let currentLocationRedirect = LocalStorageService.getItemFromLocalStorage(WindowLocationProperty.REDIRECT);
    console.log('authenticateSessionFetchWorkerMessageCallback-currentLocationRedirect:' , currentLocationRedirect);
    if(inputCommonInspector.stringIsValid(currentLocationRedirect)){
        console.log('LOCATION REDIRECT IS VALID-currentLocationRedirect', currentLocationRedirect);
        Helpers.setUrlRedirect( currentLocationRedirect );
    }
    return;
}

//#ENDREGION Private Functions