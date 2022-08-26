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
import Helpers from '../library/common/Helpers.js';
import EncryptDecryptService from '../services/encryption/EncryptDecryptService.js';


const JwtUpdateInspector = (function () {

    const resolveUpdateExpiringJwtToken = function(fetchWorker){

        console.log('resolveUpdateExpiringJwtToken-TRIGGERED')
        console.log('JwtConfig.JWT_REFRESH_TOKEN_REFRESH_FREQUENCY_IN_MILLISECONDS', JwtConfig.JWT_REFRESH_TOKEN_REFRESH_FREQUENCY_IN_MILLISECONDS );
        let _accessTokenName = TokenType[TokenType.jwtAccessToken];
        let _refreshTokenName = TokenType[TokenType.jwtRefreshToken];
        //let jwtAccessToken = LocalStorageService.getItemFromLocalStorage( _accessTokenName);
        let initialJwtRefreshTokenValue = LocalStorageService.getItemFromLocalStorage( _refreshTokenName);
        if(InputCommonInspector.inputExist(initialJwtRefreshTokenValue))
        {
            let jwtUpdateTimerId = setInterval(function(){

                let currentJwtAccessToken = LocalStorageService.getItemFromLocalStorage( _accessTokenName);
                let currentJwtRefreshToken = LocalStorageService.getItemFromLocalStorage( _refreshTokenName);

                if(!InputCommonInspector.stringIsValid(currentJwtRefreshToken)){
                    clearInterval(jwtUpdateTimerId);
                    console.log('Interval-stopped-ok');
                    return;
                }

                WebWorkerManager.startNewWorker( fetchWorker, fetchWorkerCallback);
                let message = getMessageDataForWorker( currentJwtAccessToken , currentJwtRefreshToken);
                WebWorkerManager.sendMessageToWorker(message);

            }, JwtConfig.JWT_REFRESH_TOKEN_REFRESH_FREQUENCY_IN_MILLISECONDS);

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
    let _accessTokenName = TokenType[TokenType.jwtAccessToken];
    let _refreshTokenName = TokenType[TokenType.jwtRefreshToken];

    let eventStatus = event.data.data.status;
    if(eventStatus === httpResponseStatus._200ok){
        let jwtInfo = event?.data?.data?.result;
        console.log('jwtInfo', jwtInfo);
        let _jwtAccessToken = jwtInfo.jwtAccessToken.fieldValue;
        let _jwtRefreshToken = jwtInfo.jwtRefreshToken.fieldValue;
        //let encryptedJwtAccessTokenPayload = JwtTokenService.getPayloadFromDecodedJWT(_jwtAccessToken);
        //let decryptedJwtAccessTokenPayload = EncryptDecryptService.decryptWithAES(encryptedJwtAccessTokenPayload);
        //let jwtAccessTokenPayload = JSON.parse(decryptedJwtAccessTokenPayload);


        let encryptedJwtRefreshTokenPayload = JwtTokenService.getPayloadFromDecodedJWT(_jwtRefreshToken);
        let decryptedJwtRefreshTokenPayload = EncryptDecryptService.decryptWithAES(encryptedJwtRefreshTokenPayload);
        let jwtRefreshTokenPayload = JSON.parse(decryptedJwtRefreshTokenPayload);

        console.log('jwtRefreshTokenPayload', jwtRefreshTokenPayload);

        let jwtRefreshTokenLocaleDateExpired = new Date(jwtRefreshTokenPayload.tokenUTCDateExpiry)
        let jwtRefreshTokenUTCDateExpired = Helpers.convertLocaleDateToUTCDate(jwtRefreshTokenLocaleDateExpired);

        let jwtRefreshTokenUtcDateExpiredTime =  jwtRefreshTokenUTCDateExpired.getTime();
        let localeDateNow = new Date();
        let dateNuwUtc = Helpers.convertLocaleDateToUTCDate(localeDateNow);
        let dateNowUtcTime = dateNuwUtc.getTime();

        if(jwtRefreshTokenUtcDateExpiredTime > dateNowUtcTime){

            LocalStorageService.removeItemFromLocalStorage(_accessTokenName);
            LocalStorageService.setItemInLocalStorage(_accessTokenName, _jwtAccessToken );

            LocalStorageService.removeItemFromLocalStorage(_refreshTokenName);
            LocalStorageService.setItemInLocalStorage(_refreshTokenName, _jwtRefreshToken );
            console.log('fetchWorkerCallback-_jwtRefreshToken', _jwtRefreshToken);

            return;
        }
    }

    removeAllStorageData(_accessTokenName , _refreshTokenName);
}

function removeAllStorageData(accessTokenName, refreshTokenName){

    LocalStorageService.removeItemFromLocalStorage( accessTokenName);
    LocalStorageService.removeItemFromLocalStorage( refreshTokenName);
    let jwtIntervalIdName = IntervalIdName[IntervalIdName.jwtTokenUpdateIntervalId];
    let _jwtIntervalId = LocalStorageService.getItemFromLocalStorage ( jwtIntervalIdName );

    clearInterval(_jwtIntervalId);
    LocalStorageService.removeItemFromLocalStorage(jwtIntervalIdName);
}

//#ENDREGION Private Functions