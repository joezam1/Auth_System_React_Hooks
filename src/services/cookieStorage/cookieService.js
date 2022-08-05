import CookieHelper from './CookieHelper.js';
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';


const CookieService = (function(){


//Test: DONE
let insertCookieInDataStore = function(cookieName, cookieValue, optionsObject){
    try{
        console.log('optionsObject', optionsObject)
        let properties = {
            path: optionsObject.path,
            maxAge : optionsObject.maxAge
        }
        CookieHelper.setCookie(cookieName, cookieValue, properties.path, properties.maxAge);
        return 'OK';
    }
    catch(error){
        let errorMessage= new Error('Failed to save the cookie to the storage: ', error);
        console.log('errorMessage', errorMessage);
        return errorMessage;
    }
}

let insertCookieInDataStoreWithExpiryTime = function(name, value, path, utcDateCreated, maxAgeMilliseconds, isSecure ){

    try{
        CookieHelper.setCookieWithExpiryTime (name, value, path, utcDateCreated, maxAgeMilliseconds, isSecure );
    }
    catch(error){
        let errorMessage= new Error('Failed to save the cookie to the storage: ', error);
        console.log('errorMessage', errorMessage);
        return errorMessage;
    }
}

let getCookieFromDataStoreByName = function(cookieName){
    let selectedCookie = CookieHelper.getCookieValueByName(cookieName);
    return selectedCookie;
}


let deleteCookieFromDataStoreByNameAndPath = function(cookieName, cookiePath){
    try{
        CookieHelper.deleteCookieByNameSecurely(cookieName, cookiePath);
        return 'OK';
    }
    catch(error){
        let errorMessage= new Error('Failed to Delete the cookie from the storage: ', error);
        console.log('errorMessage', errorMessage);
        return errorMessage;
    }
}

let sessionCookieIsExpired = function( cookieSessionUTCDateCreated, cookieSessionEpiryInMilliseconds){
    let dateNow = new Date();
    let dateNowUtc = dateNow.toISOString();
    let sessionDateCreatedUtc = new Date(cookieSessionUTCDateCreated);
    let sessionExpiryInSeconds = cookieSessionEpiryInMilliseconds / SessionConfig.ONE_SECOND_IN_MILLISECONDS;
    let sessionExpiryInMinutes = cookieSessionEpiryInMilliseconds / SessionConfig.ONE_MINUTE_IN_MILLISECONDS;
    let expirationDateUtcInMinutes = sessionDateCreatedUtc.setMinutes( sessionDateCreatedUtc.getMinutes() + sessionExpiryInMinutes );
    let expirationDateUTCAsDate = sessionDateCreatedUtc.toISOString();
    if(dateNowUtc > expirationDateUTCAsDate){
        return true;
    }
    return false;
}

return {
    insertCookieInDataStore : insertCookieInDataStore,
    insertCookieInDataStoreWithExpiryTime : insertCookieInDataStoreWithExpiryTime,
    getCookieFromDataStoreByName : getCookieFromDataStoreByName,
    deleteCookieFromDataStoreByNameAndPath : deleteCookieFromDataStoreByNameAndPath,
    sessionCookieIsExpired : sessionCookieIsExpired
}
})();

export default CookieService;