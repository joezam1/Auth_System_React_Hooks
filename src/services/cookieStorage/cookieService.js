import CookieHelper from './CookieHelper.js';


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
//Test: DONE
let getCookieFromDataStoreByName = function(cookieName){
    let selectedCookie = CookieHelper.getCookieValueByName(cookieName);
    return selectedCookie;
}
//Test: DONE
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
//Test: DONE
let sessionCookieIsExpired = function(cookieSessionUTCDateExpired){
    let dateNow = new Date();
    //To convert to UTC datetime by subtracting the current Timezone offset
    var utcDate =  new Date(dateNow.getTime() + (dateNow.getTimezoneOffset()*60000));
    let dateExpiredUtcAsDate = new Date(cookieSessionUTCDateExpired)
    console.log('sessionCookieIsExpired-utdDate', utcDate);
    console.log('sessionCookieIsExpired-dateExpiredUtcAsDate', dateExpiredUtcAsDate);

    let dateNowUtcAsTime = utcDate.getTime();
    let dateExpiredUtcAsTime = dateExpiredUtcAsDate.getTime();
    if( dateNowUtcAsTime > dateExpiredUtcAsTime){
        return true;
    }
    return false;
}

return Object.freeze({
    insertCookieInDataStore : insertCookieInDataStore,
    getCookieFromDataStoreByName : getCookieFromDataStoreByName,
    deleteCookieFromDataStoreByNameAndPath : deleteCookieFromDataStoreByNameAndPath,
    sessionCookieIsExpired : sessionCookieIsExpired
});
})();

export default CookieService;