import jsCookie from 'js-cookie';

let setCookie = function (cookieName, cookieValue, path, sameSite, milliseconds= null) {
    var expires = "";
    if (milliseconds) {
       var date = new Date();
       date.setTime(date.getTime() + (milliseconds));
       expires = "Expires=" + date.toUTCString();
    }
    document.cookie = cookieName + "=" + cookieValue + ';Path='+ path+';' +'SameSite='+sameSite+';' +  expires;
 }

 let setCookieWithExpiryTime = function(sessionCookieName, sessionCookieValue, path, utcDateExpired) {

    jsCookie.set(sessionCookieName, sessionCookieValue, {
        path: path,
        expires: utcDateExpired
    })
}

let getCookieValueByName = function(cookieName){
    let selectedCookie = jsCookie.get(cookieName);

    return selectedCookie;
}

let deleteCookieByNameSecurely = function(cookieName, cookiePath){
    document.cookie = cookieName +'=; Path='+ cookiePath +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


const service = Object.freeze({
    setCookie : setCookie,
    setCookieWithExpiryTime : setCookieWithExpiryTime,
    getCookieValueByName : getCookieValueByName,
    deleteCookieByNameSecurely : deleteCookieByNameSecurely
});

export default service;