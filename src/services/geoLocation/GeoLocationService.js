import NavigatorGeoLocationHelper from "./NavigatorGeolocationHelper.js";


const GeolocationServices = (function(){


    //Test: DONE
    const getGeoLocationAsync = async function(){

        if( !NavigatorGeoLocationHelper.browserGeoLocationIsAvailable() ){
            return null;
        }

        let locationResult =await NavigatorGeoLocationHelper.getBrowserCurrentGeoLocationAsync();
        return locationResult;
    }

    return {
        getGeoLocationAsync : getGeoLocationAsync
    };
})();

export default GeolocationServices;