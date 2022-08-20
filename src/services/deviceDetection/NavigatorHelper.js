

let getNavigatorData = function(){
    let navigatorDataArray = [navigator.userAgent.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera]
    let navigatorData = navigatorDataArray.join(' ');
    return navigatorData;
}

let getAppVersion = function(){
    let appVersion = navigator.appVersion ;
    return appVersion;
}

let getPlatform = function(){
    let platform = navigator.platform || navigator.userAgent.platform;
    return platform;
}

let getVendor = function(){
    let vendor = navigator.vendor;
    return vendor;
}

let getUserAgent = function(){
   let userAgent = window.navigator.userAgent;
    return userAgent;
}


let service = {
    getNavigatorData : getNavigatorData,
    getAppVersion : getAppVersion,
    getPlatform : getPlatform,
    getVendor : getVendor,
    getUserAgent : getUserAgent
};

export default service;