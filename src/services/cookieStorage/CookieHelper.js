import jsCookie from 'js-cookie';
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';


let setCookie = function (cookieName, cookieValue, path, milliseconds= null) {
    var expires = "";
    if (milliseconds) {
       var date = new Date();
       date.setTime(date.getTime() + (milliseconds));
       expires = "Expires=" + date.toUTCString();
    }
    document.cookie = cookieName + "=" + cookieValue + ';Path='+ path+';'+  expires;
 }

 let setCookieWithExpiryTime = function(sessionCookieName, sessionCookieValue, path, utcDateCreated, maxAgeMilliseconds, isSecure) {

    let sessionDateCreatedUtc = new Date(utcDateCreated);
    let sessionExpiryInMinutes = maxAgeMilliseconds / SessionConfig.ONE_MINUTE_IN_MILLISECONDS;
    let expirationDateUtc = sessionDateCreatedUtc.setMinutes( sessionDateCreatedUtc.getMinutes() + sessionExpiryInMinutes );

    jsCookie.set(sessionCookieName, sessionCookieValue, {
        path: path,
        expires: expirationDateUtc,
        secure: isSecure,
    })
}



let getCookieValueByName = function(cookieName){
    let selectedCookie = jsCookie.get(cookieName);

    return selectedCookie;
}


let deleteCookiebyName = function(cookieName){
    Cookies.remove(cookieName);
}

let deleteCookieByNameSecurely = function(cookieName, cookiePath){
    document.cookie = cookieName +'=; Path='+ cookiePath +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


const service = {
    setCookie : setCookie,
    setCookieWithExpiryTime : setCookieWithExpiryTime,
    getCookieValueByName : getCookieValueByName,
    deleteCookiebyName : deleteCookiebyName,
    deleteCookieByNameSecurely : deleteCookieByNameSecurely
}

export default service;