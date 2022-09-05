import CommonValidators from '../validators/CommonValidators.js';
import InputCommonInspector from '../validators/InputCommonInspector.js';
import EncryptDecryptService from '../encryption/EncryptDecryptService.js';
import Helpers from '../../library/common/Helpers.js';
import TokenType from '../../library/enumerations/TokenType.js';
import LocalStorageService from '../localStorage/LocalStorageService.js';

const JwtTokenService = (function(){


    //Test: DONE
    const getPayloadFromDecodedJWT = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        console.log('jsonPayload', jsonPayload)
        let result = CommonValidators.safeJsonParse(jsonPayload);
        return result;
    };

    //Tet: DONE
    const isJwtExpired = function(tokenLocaleDateExpiredAsDate ){
        let tokenUTCDateExpired = Helpers.convertLocaleDateToUTCDate(tokenLocaleDateExpiredAsDate);

        let tokenUtcDateExpiredTime =  tokenUTCDateExpired.getTime();
        let localeDateNow = new Date();
        let dateNuwUtc = Helpers.convertLocaleDateToUTCDate(localeDateNow);
        let dateNowUtcTime = dateNuwUtc.getTime();

        if(tokenUtcDateExpiredTime > dateNowUtcTime){

            return false;
        }
        return true;
    }

    //Tet: DONE
    const decryptEncryptedJwtPayload = function(selectedJwtToken){
        if(!InputCommonInspector.inputExist(selectedJwtToken)){
            return null;
        }

        let encryptedJwtTokenPayload = getPayloadFromDecodedJWT(selectedJwtToken);
        let decryptedJwtTokenPayload = EncryptDecryptService.decryptWithAES(encryptedJwtTokenPayload);
        let parsedObjectJwtTokenPayload = CommonValidators.safeJsonParse(decryptedJwtTokenPayload);
        return parsedObjectJwtTokenPayload;
    }

    //Test: DONE
    const saveTokenToLocalStorage = function(tokenTypeEnum, selectedToken){
        let _tokenName = TokenType[tokenTypeEnum];
        LocalStorageService.setItemInLocalStorage(_tokenName, selectedToken );
    }
    //Test: DONE
    const getTokenFromLocalStorage = function (tokenTypeEnum){
        let _tokenName = TokenType[tokenTypeEnum];
        let savedToken = LocalStorageService.getItemFromLocalStorage (_tokenName );
        return savedToken;
    }
    //Test: DONE
    const deleteTokenFromLocalStorage = function (tokenTypeEnum){
        let _tokenName = TokenType[tokenTypeEnum];
        LocalStorageService.removeItemFromLocalStorage( _tokenName);
    }

    return {
        getPayloadFromDecodedJWT : getPayloadFromDecodedJWT,
        isJwtExpired : isJwtExpired,
        decryptEncryptedJwtPayload : decryptEncryptedJwtPayload,
        saveTokenToLocalStorage : saveTokenToLocalStorage,
        getTokenFromLocalStorage : getTokenFromLocalStorage,
        deleteTokenFromLocalStorage : deleteTokenFromLocalStorage
    }
})();

export default JwtTokenService;