import UniversalCookie from 'universal-cookie';

const cookieService = (function(){

let _cookieName = '';



let insertCookieInDataStore = function(cookieName, cookieValue, optionsObject){
    try{
        _cookieName = cookieName;
        const cookie = new UniversalCookie();
        console.log('optionsObject', optionsObject)
        let properties = {
            path: optionsObject.path,
            maxAge : optionsObject.maxAge
        }
        cookie.set(cookieName, cookieValue, properties);
        return 'OK';
    }
    catch(error){
        let errorMessage= new Error('Failed to save the cookie to the storage: ', error);
        console.log('errorMessage', errorMessage);
        return errorMessage;
    }

}

let getCookieFromDataStore = function(){
    const cookie = new UniversalCookie();
    let selectedCookie = cookie.get(_cookieName);

    return selectedCookie;
}

let getCookieFromDataStoreByName = function(cookieName){
    const cookie = new UniversalCookie();
    let selectedCookie = cookie.get(cookieName);

    return selectedCookie;
}

let deleteCookieFromDataStore = function(){
    let result = remove(_cookieName);
    return result;
}


let deleteCookieFromDataStoreByName = function(cookieName){
    let result = remove(cookieName);
    return result;
}

return {
    insertCookieInDataStore : insertCookieInDataStore,
    getCookieFromDataStore : getCookieFromDataStore,
    getCookieFromDataStoreByName : getCookieFromDataStoreByName,
    deleteCookieFromDataStore : deleteCookieFromDataStore,
    deleteCookieFromDataStoreByName : deleteCookieFromDataStoreByName
}

})();
export default cookieService;