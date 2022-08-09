import WebWorkerManager from "../backgroundWorkers/WebWorkerManager";
import LocalStorageService from "../services/localStorage/LocalStorageService";
import CookieService from "../services/cookieStorage/CookieService";
import CookieProperties from "../library/stringLiterals/CookieProperties";
//import MessageWorkerDataModel from "../dataModels/MessageWorkerDataModel";
import HttpRequestMethods from "../library/enumerations/HttpRequestMethods";
import EnvConfig from "../../configuration/environment/EnvConfig";
import ServerConfig from '../../configuration/server/ServerConfig.js';
import SessionConfig from '../../configuration/authentication/SessionConfig.js';
import inputCommonInspector from "../services/validators/InputCommonInspector.js";
import FetchWorkerHelper from '../backgroundWorkers/FetchWorkerHelper.js';
import IntervalIdName from '../library/enumerations/IntervalIdName.js';

const SessionRefreshInspector = (function () {
    const resolveRefreshingExpiringSession = function (fetchWorker) {

        console.log('resolverefreshinExpiringSession-TRIGGERED')
        console.log('SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS',SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS);
        let timerId = setInterval(function()
        {
            console.log('Interval-triggered-ok');
            WebWorkerManager.startNewWorker(fetchWorker, refreshFetchWorkerOnMessageCallback);
            let message = getMessageDataForWorker();
            WebWorkerManager.sendMessageToWorker(message);

        }, SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS);

        let setInntervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
        LocalStorageService.setItemInLocalStorage( setInntervalIdName , timerId);
    }

    return {
        resolveRefreshingExpiringSession: resolveRefreshingExpiringSession
    }

})();

export default SessionRefreshInspector;

//#REGION Private Functions
    function getMessageDataForWorker(){
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
        var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsUpdatePut;
        let requestMethod = HttpRequestMethods[HttpRequestMethods.PUT];
        let payload = {
            name: cookieName,
            session: cookieValue
        }
        let headersArray = [];
        let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod,headersArray, payload);

        return message;
    }


    function refreshFetchWorkerOnMessageCallback(event){
        console.log('sessionWorkerOnMessageCallback-event', event)
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
        let cookiePath = LocalStorageService.getItemFromLocalStorage(CookieProperties.PATH);
        let intervalTimerId = LocalStorageService.getItemFromLocalStorage( SessionConfig.SESSION_TIMER_ID );
        let sessionInfo = event?.data?.data?.result;

        if(inputCommonInspector.objectIsValid(sessionInfo)){
            let newSessionToken = sessionInfo?.sessionToken?.fieldValue;
            let originalUtcDateCreated = sessionInfo?.utcDateCreated?.fieldValue;
            let expiresInMilliseconds = sessionInfo?.expires?.fieldValue;
            let originalUtcDateExpired = sessionInfo?.utcDateExpired?.fieldValue;
            let cookieIsExpired = CookieService.sessionCookieIsExpired ( originalUtcDateExpired )
            if(!cookieIsExpired && inputCommonInspector.stringIsValid(newSessionToken)){

                let currentCookie = CookieService.getCookieFromDataStoreByName(cookieName);
                if(inputCommonInspector.stringIsValid(currentCookie)){

                    CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
                    let optionsObject = {
                        path: cookiePath,
                        maxAge : expiresInMilliseconds
                    }
                    CookieService.insertCookieInDataStore(cookieName, newSessionToken,  optionsObject);
                    WebWorkerManager.terminateActiveWorker();
                    return;
                }
            }
        }
        CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
        clearInterval(intervalTimerId);
        WebWorkerManager.terminateActiveWorker();
    }

//#ENDREGION Private Functions