import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import TokenType from '../library/enumerations/TokenType.js';
import JwtTokenService from '../services/authorization/JwtTokenService';
import MonitorService from '../services/monitoring/MonitorService.js';


//Test: DONE
const resolveJwtUpdate = function(jwtInfo){
    MonitorService.capture('jwtInfo', jwtInfo);

    let _newjwtAccessToken = jwtInfo?.jwtAccessToken?.fieldValue;
    let _newJwtRefreshToken = jwtInfo?.jwtRefreshToken?.fieldValue;

    if(!InputCommonInspector.inputExist(_newJwtRefreshToken) || !InputCommonInspector.inputExist(_newjwtAccessToken)){
       return false;
    }

    let currentJwtRefreshToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtRefreshToken);
    let incomingRefreshTokenIsNew = tokensAreDifferent(_newJwtRefreshToken , currentJwtRefreshToken);
    if(incomingRefreshTokenIsNew){
        return executeUpdateJwtStorageData(_newjwtAccessToken , _newJwtRefreshToken);
    }
    return false;
}

function tokensAreDifferent(newToken, currentToken){
    if(newToken !== currentToken){
        return true;
    }
    return false;
}

function executeUpdateJwtStorageData( jwtAccessTokenValue , jwtRefreshTokenValue){

    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtAccessToken);
    JwtTokenService.saveTokenToLocalStorage(TokenType.jwtAccessToken, jwtAccessTokenValue);
    JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtRefreshToken);
    JwtTokenService.saveTokenToLocalStorage(TokenType.jwtRefreshToken, jwtRefreshTokenValue);
    MonitorService.capture('executeUpdateJwtStorageData-jwtRefreshTokenValue', jwtRefreshTokenValue);

    return true;
}


const service = Object.freeze({
    resolveJwtUpdate : resolveJwtUpdate
});

export default service;