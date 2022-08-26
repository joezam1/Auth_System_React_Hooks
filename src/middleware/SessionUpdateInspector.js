import WebWorkerManager from "../backgroundWorkers/WebWorkerManager";
import LocalStorageService from "../services/localStorage/LocalStorageService";
import CookieService from "../services/cookieStorage/CookieService";
import CookieProperty from "../library/stringLiterals/CookieProperty.js";
import HttpRequestMethod from "../library/enumerations/HttpRequestMethod";
import EnvConfig from "../../configuration/environment/EnvConfig";
import ServerConfig from '../../configuration/server/ServerConfig.js';
import SessionConfig from '../../configuration/authentication/SessionConfig.js';
import inputCommonInspector from "../services/validators/InputCommonInspector.js";
import FetchWorkerHelper from '../backgroundWorkers/FetchWorkerHelper.js';
import IntervalIdName from '../library/enumerations/IntervalIdName.js';

const SessionUpdateInspector = (function () {
    //Test:DONE
    const resolveUpdatingExpiringSession = function (fetchWorker) {

        console.log('resolverefreshinExpiringSession-TRIGGERED')
        console.log('SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS',SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS);
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let initialCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);

        if(inputCommonInspector.stringIsValid(initialCookieValue)){
            let timerId = setInterval(function()
            {
                console.log('Interval-triggered-ok');
                let latestCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
                console.log('latestCookieValue:',latestCookieValue);
                if(!inputCommonInspector.stringIsValid(latestCookieValue)){
                    clearInterval(timerId);
                    console.log('Interval-stopped-ok');
                    return;
                }
                WebWorkerManager.startNewWorker(fetchWorker, fetchWorkerOnMessageCallback);
                let message = getMessageDataForWorker(cookieName , latestCookieValue );
                WebWorkerManager.sendMessageToWorker(message);

            }, SessionConfig.SESSION_REFRESH_FREQUENCY_IN_MILLISECONDS);

            let intervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
            LocalStorageService.setItemInLocalStorage( intervalIdName , timerId);
        }
    }

    return {
        resolveUpdatingExpiringSession : resolveUpdatingExpiringSession
    }

})();

export default SessionUpdateInspector;

//#REGION Private Functions
    function getMessageDataForWorker(cookieName , cookieValue ){
        var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsUpdatePut;
        let requestMethod = HttpRequestMethod[HttpRequestMethod.PUT];
        let payload = {
            name: cookieName,
            session: cookieValue
        }
        let headersArray = [];
        let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod,headersArray, payload);

        return message;
    }


    function fetchWorkerOnMessageCallback(event){
        console.log('sessionWorkerOnMessageCallback-event', event)
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let cookiePath = LocalStorageService.getItemFromLocalStorage(CookieProperty.PATH);

        let sessionInfo = event?.data?.data?.result;

        if(inputCommonInspector.objectIsValid(sessionInfo) && updateCookieSession( cookieName, cookiePath, sessionInfo) ){
           return;
        }
        removeAllStorageData(cookieName , cookiePath);
    }

    function updateCookieSession( cookieName, cookiePath, sessionInfo ){

        let newSessionToken = sessionInfo?.sessionToken?.fieldValue;
        console.log('NEW-SESSION-TOKEN:', newSessionToken)
        let expiresInMilliseconds = sessionInfo?.expires?.fieldValue;
        let originalUtcDateExpired = sessionInfo?.utcDateExpired?.fieldValue;
        let cookieIsExpired = CookieService.sessionCookieIsExpired ( originalUtcDateExpired )
        if((cookieIsExpired === false) && inputCommonInspector.stringIsValid(newSessionToken)){
            let currentCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
            console.log('CURRENT-SESSION-TOKEN:', currentCookieValue)
            if(inputCommonInspector.stringIsValid(currentCookieValue)){

                CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
                let optionsObject = {
                    path: cookiePath,
                    maxAge : expiresInMilliseconds
                }

                CookieService.insertCookieInDataStore(cookieName, newSessionToken,  optionsObject);
                WebWorkerManager.terminateActiveWorker();
                return true;
            }
        }
        return false;
    }

    function removeAllStorageData(cookieName , cookiePath){
        CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName,cookiePath);
        let intervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
        let intervalTimerId = LocalStorageService.getItemFromLocalStorage( intervalIdName );
        clearInterval(intervalTimerId);
        LocalStorageService.removeItemFromLocalStorage(CookieProperty.NAME);
        LocalStorageService.removeItemFromLocalStorage(CookieProperty.PATH);
        LocalStorageService.removeItemFromLocalStorage(intervalIdName);
        WebWorkerManager.terminateActiveWorker();
    }
//#ENDREGION Private Functions