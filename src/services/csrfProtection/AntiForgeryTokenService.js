import CSRFToken from 'csrf';
import TokenValidator from'token-validator';

import TokenDuration from '../../library/enumerations/TokenDuration.js';
import AntiforgeryTokenConfig from '../../../configuration/csrfProtection/AntiForgeryTokenConfig.js';


const antiforgeryTokenService = (function(){

    let _csrfToken = null;
    let _tokenValidator = null;
    let _nonExpiringTokenSecret = null;
    let _expiringTokenCryptoKey = null;
    let _enabledTokenType = null;
    //Test:DONE
    const createAntiForgeryTokenAsync = async function( utcTimestamp = null ){
        //NOTE: The static Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.

        let promise = new Promise(function(resolve, reject){
            try{
                let _token = null;
                switch(_enabledTokenType){
                    case TokenDuration.expiringToken:
                        let selectedUtcTimestamp = (utcTimestamp === null) ? Date.now() : utcTimestamp;
                        _token = _tokenValidator.generate(selectedUtcTimestamp , _expiringTokenCryptoKey );
                        resolve(_token);
                    break;

                    case TokenDuration.nonExpiringToken:
                        _token = _csrfToken.create(_nonExpiringTokenSecret)
                        resolve(_token);
                    break;
                }
            }
            catch(error){
                reject(error);
            }
        });
        let csrfToken = await promise;
        return csrfToken;
    }
    //Test
    const verifyAntiForgeryTokenIsValidAsync = async function( antiforgeryToken , utcTimestamp = null){
        let promise = new Promise(function(resolve, reject){
            try{
                let tokenIsValid = false;
                switch( _enabledTokenType ){
                    case TokenDuration.expiringToken:
                        let selectedUtcTimestamp = (utcTimestamp === null) ? Date.now() : utcTimestamp;
                        tokenIsValid = _tokenValidator.verify( selectedUtcTimestamp , _expiringTokenCryptoKey , antiforgeryToken );
                        resolve(tokenIsValid);
                    break;

                    case TokenDuration.nonExpiringToken:
                        tokenIsValid = _csrfToken.verify( _nonExpiringTokenSecret , antiforgeryToken );
                        resolve(tokenIsValid);
                    break;
                }
            }
            catch(error){
                reject(error);
            }
        });
        let resultValidation = await promise;
        return resultValidation
    }

    //#REGION Private Functions

    function onInit(){
        console.log('AntiforgeryTokenConfiguration: ', AntiforgeryTokenConfig);
        _csrfToken = new CSRFToken();
        _enabledTokenType = AntiforgeryTokenConfig.ANTIFORGERY_TOKEN_ACTIVATED;
        _nonExpiringTokenSecret = AntiforgeryTokenConfig.NON_EXPIRING_ANTIFORGERY_TOKEN_SECRET;
        _expiringTokenCryptoKey = AntiforgeryTokenConfig.EXPIRING_ANTIFORGERY_TOKEN_CRYPTO_KEY;
        let expiringTokenSecret = AntiforgeryTokenConfig.EXPIRING_ANTIFORGERY_TOKEN_SECRET;
        var expiringTokenDuration = AntiforgeryTokenConfig.EXPIRING_ANTIFORGERY_TOKEN_ACTIVE_TIME_IN_MILLISECONDS;
        var expiringTokenHashLength = AntiforgeryTokenConfig.EXPIRING_ANTIFORGERY_TOKEN_HASH_LENGTH;
        _tokenValidator = new TokenValidator(expiringTokenSecret, expiringTokenDuration, expiringTokenHashLength);
    }

    //#ENDREGION Private Functions


    function constructor(){
        onInit();
        return Object.freeze({
            createAntiForgeryTokenAsync : createAntiForgeryTokenAsync,
            verifyAntiForgeryTokenIsValidAsync : verifyAntiForgeryTokenIsValidAsync
        });
    }

    return constructor();

})();

export default antiforgeryTokenService;
