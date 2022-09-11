import SessionUpdateWebWorkerManager from "../backgroundWorkers/SessionUpdateWebWorkerManager.js";
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
import SessionUpdateInspectorHelper from './SessionUpdateInspectorHelper.js';
import JwtUpdateInspectorHelper from './JwtUpdateInspectorHelper.js';
import JwtTokenService from '../services/authorization/JwtTokenService.js';
import TokenType from "../library/enumerations/TokenType.js";
import BackgroundWorker from "../library/enumerations/BackgroundWorker.js";
import httpResponseStatus from "../library/enumerations/HttpResponseStatus.js";
import MonitorService from "../services/monitoring/MonitorService.js";

const SessionUpdateInspector = (function () {
    //Test:DONE
    const resolveUpdateExpiringSession = function () {

        MonitorService.capture('resolverefreshinExpiringSession-TRIGGERED')
        MonitorService.capture('SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS', SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS);
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
        let initialCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);

        if (inputCommonInspector.inputExist(initialCookieValue)) {


            let timerId = setInterval(function () {

                MonitorService.capture('Interval-triggered-ok');
                let latestCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
                MonitorService.capture('latestCookieValue:', latestCookieValue);
                if (!inputCommonInspector.inputExist(latestCookieValue)) {
                    clearInterval(timerId);
                    MonitorService.capture('Interval-stopped-ok');
                    return;
                }
                SessionUpdateWebWorkerManager.createNewWorker( sessionUpdateFetchWorkerOnMessageCallback );

                let message = createMessageDataForWorker(cookieName, latestCookieValue);
                SessionUpdateWebWorkerManager.sendMessageToWorker(message);

            }, SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS);

            let intervalIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId];
            LocalStorageService.setItemInLocalStorage(intervalIdName, timerId);
        }
    }

    return  Object.freeze({
        resolveUpdateExpiringSession: resolveUpdateExpiringSession
    });

})();

export default SessionUpdateInspector;

//#REGION Private Functions
function createMessageDataForWorker(cookieName, cookieValue) {
    var sessionUrl = EnvConfig.PROTOCOL + '://' + EnvConfig.TARGET_URL + ServerConfig.apiSessionsUpdatePut;
    let requestMethod = HttpRequestMethod[HttpRequestMethod.PUT];
    let payload = {
        name: cookieName,
        session: cookieValue
    }

    let currentJwtAccessToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtAccessToken);
    let currentJwtRefreshToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtRefreshToken);

    let _accessToken = {
        name: 'Authorization',
        value: 'Bearer '+ currentJwtAccessToken
    }
    let _refreshToken = {
        name: 'Refresh_token',
        value: currentJwtRefreshToken
    }
    let headersArray = [_accessToken ,_refreshToken ];
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, headersArray, payload);

    return message;
}


function sessionUpdateFetchWorkerOnMessageCallback(event) {
    MonitorService.capture('sessionWorkerOnMessageCallback-event', event);
    let responseStatus = event?.data?.status;
    switch(responseStatus){
        case httpResponseStatus._200ok:
            let _sessionInfo = event?.data?.data?.result;
            let jwtIsUpdated = JwtUpdateInspectorHelper.resolveJwtUpdate(_sessionInfo);
            let sessionIsValid = inputCommonInspector.objectIsValid(_sessionInfo);
            let sessionIsUpdated = SessionUpdateInspectorHelper.resolveSessionUpdate(_sessionInfo);
            if ( jwtIsUpdated && sessionIsValid && sessionIsUpdated ){
                return;
            }
        break;

        case httpResponseStatus._401unauthorized:
            removeAllStorageData();
        break;

        case httpResponseStatus._403forbidden:
            removeAllStorageData();
        break;

        case httpResponseStatus._400badRequest:
            removeAllStorageData();
        break;

        default:
            //For Any other Case we Verify the CALLBACK RESPONSE is from the backend API
            let sessionUpdateFetchWorker = BackgroundWorker[BackgroundWorker.SessionUpdateFetchApiWorker];
            if(isValidHttpResponseFromSelectedWorker( sessionUpdateFetchWorker, event )){
                removeAllStorageData();
            }
        break;

    }
}

function isValidHttpResponseFromSelectedWorker(selectedWorker, event){
    let selectedWorkerLowercase = selectedWorker.toLowerCase();
    let workerResponseNameLowercase =   event?.data?.name.toLowerCase();
    if( inputCommonInspector.inputExist(event?.data?.name)  &&
        workerResponseNameLowercase.includes( selectedWorkerLowercase ) &&
        event?.data?.status !== 0 && event?.data?.statusText !== '' ){
            return true;
    }
    return false;
}

function removeAllStorageData() {
    let _cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
    let _cookiePath = LocalStorageService.getItemFromLocalStorage(CookieProperty.PATH);

    CookieService.deleteCookieFromDataStoreByNameAndPath(_cookieName, _cookiePath);
    let intervalIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId];
    let intervalTimerId = LocalStorageService.getItemFromLocalStorage(intervalIdName);
    clearInterval(intervalTimerId);
    LocalStorageService.removeItemFromLocalStorage(CookieProperty.NAME);
    LocalStorageService.removeItemFromLocalStorage(CookieProperty.PATH);
    LocalStorageService.removeItemFromLocalStorage(intervalIdName);

}
//#ENDREGION Private Functions