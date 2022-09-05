import SessionWebWorkerManager from "../backgroundWorkers/SessionWebWorkerManager.js";
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

const SessionUpdateInspector = (function () {
    //Test:DONE
    const resolveUpdateExpiringSession = function (generalSharedWorker) {

        console.log('resolverefreshinExpiringSession-TRIGGERED')
        console.log('SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS', SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS);
        let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
        let initialCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);

        if (inputCommonInspector.inputExist(initialCookieValue)) {


            let timerId = setInterval(function () {

                console.log('Interval-triggered-ok');
                let latestCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
                console.log('latestCookieValue:', latestCookieValue);
                if (!inputCommonInspector.inputExist(latestCookieValue)) {
                    clearInterval(timerId);
                    console.log('Interval-stopped-ok');
                    return;
                }
                SessionWebWorkerManager.createNewWorker(generalSharedWorker, sessionSharedFetchWorkerOnMessageCallback);

                let message = createMessageDataForSharedWorker(cookieName, latestCookieValue);
                SessionWebWorkerManager.sendMessageToWorker(message);

            }, SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS);

            let intervalIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId];
            LocalStorageService.setItemInLocalStorage(intervalIdName, timerId);
        }
    }

    return {
        resolveUpdateExpiringSession: resolveUpdateExpiringSession
    }

})();

export default SessionUpdateInspector;

//#REGION Private Functions
function createMessageDataForSharedWorker(cookieName, cookieValue) {
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


function sessionSharedFetchWorkerOnMessageCallback(event) {
    console.log('sessionWorkerOnMessageCallback-event', event);

    let _sessionInfo = event?.data?.data?.result;
    let jwtIsUpdated = JwtUpdateInspectorHelper.resolveJwtUpdate(_sessionInfo);
    let sessionIsValid = inputCommonInspector.objectIsValid(_sessionInfo);
    let sessionIsUpdated = SessionUpdateInspectorHelper.resolveSessionUpdate(_sessionInfo);
    if ( jwtIsUpdated && sessionIsValid && sessionIsUpdated ){

        return;
    }
    removeAllStorageData();
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