import JwtConfig from '../../configuration/authorization/JwtConfig.js';
import TokenType from '../library/enumerations/TokenType.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import WebWorkerManager from '../backgroundWorkers/WebWorkerManager.js';
import EnvConfig from '../../configuration/environment/EnvConfig';
import ServerConfig from '../../configuration/server/ServerConfig.js';
import HttpRequestMethod from '../library/enumerations/HttpRequestMethod.js';
import FetchWorkerHelper from '../backgroundWorkers/FetchWorkerHelper.js';
import httpResponseStatus from '../library/enumerations/HttpResponseStatus.js';
import JwtTokenService from '../services/authorization/JwtTokenService.js';

const JwtUpdateInspector = (function () {

    //Test: DONE
    const resolveUpdateExpiringJwtToken = function(fetchWorker){

        console.log('resolveUpdateExpiringJwtToken-TRIGGERED')
        console.log('JwtConfig.JWT_REFRESH_TOKEN_UPDATE_FREQUENCY_IN_MILLISECONDS', JwtConfig.JWT_REFRESH_TOKEN_UPDATE_FREQUENCY_IN_MILLISECONDS );
        let initialJwtRefreshTokenValue =JwtTokenService.getTokenFromLocalStorage(TokenType.jwtRefreshToken);
        if(InputCommonInspector.inputExist(initialJwtRefreshTokenValue))
        {
            let jwtUpdateTimerId = setInterval(function(){

                let currentJwtAccessToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtAccessToken);
                let currentJwtRefreshToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtRefreshToken);
                if(!InputCommonInspector.stringIsValid(currentJwtRefreshToken)){
                    clearInterval(jwtUpdateTimerId);
                    console.log('Interval-stopped-ok');
                    return;
                }

                WebWorkerManager.startNewWorker( fetchWorker, fetchWorkerCallback);
                let message = getMessageDataForWorker( currentJwtAccessToken , currentJwtRefreshToken);
                WebWorkerManager.sendMessageToWorker(message);

            }, JwtConfig.JWT_REFRESH_TOKEN_UPDATE_FREQUENCY_IN_MILLISECONDS);

            let jwtIntervalIdName = IntervalIdName[IntervalIdName.jwtTokenUpdateIntervalId];
            LocalStorageService.setItemInLocalStorage( jwtIntervalIdName , jwtUpdateTimerId);
        }
    }

    return {
        resolveUpdateExpiringJwtToken : resolveUpdateExpiringJwtToken
    }
})();


export default JwtUpdateInspector;

//#REGION Private Functions
function getMessageDataForWorker(jwtAccessToken, jwtRefreshToken){
    var sessionUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiJsonWebTokenUpdatePut;
    let requestMethod = HttpRequestMethod[HttpRequestMethod.PUT];
    let payload = { };
    let _accessToken = {
        name: 'Authorization',
        value: 'Bearer '+ jwtAccessToken
    }
    let _refreshToken = {
        name: 'Refresh_token',
        value: jwtRefreshToken
    }
    let headersArray = [_accessToken ,_refreshToken ];
    let message = FetchWorkerHelper.getMessageDataForFetchWorker(sessionUrl, requestMethod, headersArray, payload);

    return message;
}


function fetchWorkerCallback(event){
    console.log('sessionWorkerOnMessageCallback-event', event);
    let eventStatus = event?.data?.data?.status;
    if(eventStatus === httpResponseStatus._200ok){
        let jwtInfo = event?.data?.data?.result;
        console.log('jwtInfo', jwtInfo);
        let _jwtAccessToken = jwtInfo.jwtAccessToken.fieldValue;
        let _jwtRefreshToken = jwtInfo.jwtRefreshToken.fieldValue;

        let jwtRefreshTokenPayload = JwtTokenService.decryptEncryptedJwtPayload(_jwtRefreshToken)
        console.log('jwtRefreshTokenPayload', jwtRefreshTokenPayload);
        let jwtRefreshTokenLocaleDateExpired = new Date(jwtRefreshTokenPayload.tokenUTCDateExpiry)
        let tokenIsExpired = JwtTokenService.isJwtExpired(jwtRefreshTokenLocaleDateExpired);

        if(!tokenIsExpired){

            updateJwtStorageData( _jwtAccessToken, _jwtRefreshToken );
            return;
        }
    }

    removeAllStorageData();
}

function updateJwtStorageData( jwtAccessTokenValue , jwtRefreshTokenValue){

    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtAccessToken);
    JwtTokenService.saveTokenToLocalStorage(TokenType.jwtAccessToken, jwtAccessTokenValue);
    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtRefreshToken);
    JwtTokenService.saveTokenToLocalStorage(TokenType.jwtRefreshToken, jwtRefreshTokenValue);

    console.log('fetchWorkerCallback-jwtRefreshTokenValue', jwtRefreshTokenValue);
    WebWorkerManager.terminateActiveWorker();
}

function removeAllStorageData(){

    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtAccessToken);
    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtRefreshToken);
    let jwtIntervalIdName = IntervalIdName[IntervalIdName.jwtTokenUpdateIntervalId];
    let _jwtIntervalId = LocalStorageService.getItemFromLocalStorage ( jwtIntervalIdName );

    clearInterval(_jwtIntervalId);
    LocalStorageService.removeItemFromLocalStorage(jwtIntervalIdName);

    WebWorkerManager.terminateActiveWorker();
}

//#ENDREGION Private Functions