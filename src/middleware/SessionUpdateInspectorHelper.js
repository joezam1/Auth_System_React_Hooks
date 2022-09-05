import CookieService from '../services/cookieStorage/CookieService.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import CookieProperty from '../library/stringLiterals/CookieProperty.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';


const resolveSessionUpdate = function(sessionInfo){
    let newSessionToken = sessionInfo?.sessionToken?.fieldValue;
    console.log('NEW-SESSION-TOKEN:', newSessionToken);
    if(!InputCommonInspector.inputExist(newSessionToken) || !InputCommonInspector.stringIsValid(newSessionToken) ){
        return false;
    }
    let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
    let expiresInMilliseconds = sessionInfo?.expires?.fieldValue;

    let currentCookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
    console.log('CURRENT-SESSION-TOKEN:', currentCookieValue)

    let incomingSessionIsNew =  sessionsAreDifferent( newSessionToken , currentCookieValue );
    if (incomingSessionIsNew ) {
       let resultUpdate = executeCookieUpdate(newSessionToken, expiresInMilliseconds);
       return resultUpdate;
    }
    return false;
}

function sessionsAreDifferent (newSession, currentSession){
    if(newSession !== currentSession){
        return true;
    }
    return false;
}

function executeCookieUpdate(newSessionToken , expiresInMilliseconds){
    let cookieName = LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
    let cookiePath = LocalStorageService.getItemFromLocalStorage(CookieProperty.PATH);
    CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName, cookiePath);
    let optionsObject = {
        path: cookiePath,
        maxAge: expiresInMilliseconds
    }
    let result = CookieService.insertCookieInDataStore(cookieName, newSessionToken, optionsObject);
    if(result === 'ok'){
        return true;
    }
    return false;
}

const service = Object.freeze({
    resolveSessionUpdate : resolveSessionUpdate
});

export default service;