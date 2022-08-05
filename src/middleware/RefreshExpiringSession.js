import WebWorkerManager from "../backgroundWorkers/WebWorkerManager";
import LocalStorageService from "../services/localStorage/LocalStorageService";
import CookieService from "../services/cookieStorage/CookieService";
import CookieProperties from "../library/stringLiterals/CookieProperties";
import MessageWorkerDataModel from "../dataModels/MessageWorkerDataModel";
import HttpRequestMethods from "../library/enumerations/HttpRequestMethods";
import EnvConfig from "../../configuration/environment/EnvConfig";
import ServerConfig from '../../configuration/server/ServerConfig.js';
import SessionConfig from '../../configuration/authentication/SessionConfig.js';
import inputCommonInspector from "../services/validators/InputCommonInspector.js";
import messageWorkerDataModel from "../dataModels/MessageWorkerDataModel";
import FetchWorkerHelper from '../backgroundWorkers/FetchWorkerHelper.js';

const RefreshExpiringSession = (function () {
    const resolveRefreshingExpiringSession = function (fetchWorker) {

        let timerId = setInterval(function(){
            WebWorkerManager.startNewWorker(fetchWorker, fetchWorkerOnMessageCallback);
            let message = getMessageDataForWorker();
            WebWorkerManager.sendMessageToWorker(message);

        }, SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS);

        LocalStorageService.setItemInLocalStorage(SessionConfig.SESSION_TIMER_ID, timerId);
    }

    return {
        resolveRefreshingExpiringSession: resolveRefreshingExpiringSession
    }

})();

export default RefreshExpiringSession;

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
        let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, payload);

        return message;
    }


    function fetchWorkerOnMessageCallback(event){
        console.log('sessionWorkerOnMessageCallback-event', event)
        let sessionInfo = event?.data?.data?.result;
        if(inputCommonInspector.objectIsValid(sessionInfo)){
            let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperties.NAME);
            let cookiePath = sessionInfo?.data?.fieldValue?.properties?.path
            let newSessionToken = sessionInfo?.sessionToken?.fieldValue;
            let originalUtcDateCreated = sessionInfo?.utcDateCreated?.fieldValue;
            let expiresInMilliseconds = sessionInfo?.expires?.fieldValue;

            let cookieIsExpired = CookieService.sessionCookieIsExpired (originalUtcDateCreated, expiresInMilliseconds)
            if(!cookieIsExpired && inputCommonInspector.stringIsValid(newSessionToken)){

                let currentCookie = CookieService.getCookieFromDataStoreByName(cookieName);
                if(inputCommonInspector.stringIsValid(currentCookie)){

                    CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
                    CookieService.insertCookieInDataStoreWithExpiryTime(cookieName, newSessionToken, cookiePath, originalUtcDateCreated, expiresInMilliseconds, true);
                    return;
                }
            }
            CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
        }
        WebWorkerManager.terminateActiveWorker();
    }

//#ENDREGION Private Functions