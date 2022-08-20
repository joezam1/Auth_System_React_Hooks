

const NavigatorGeoLocationHelper = (function () {



    const browserGeoLocationIsAvailable = function () {
        if (navigator.geolocation) {
            return true;
        }
        return false;
    }

    const getBrowserCurrentGeoLocationAsync = async function(){
        let resultPromise = new Promise(function(resolve, reject){
            const gpsOptions = { enableHighAccuracy: true, timeout: 10000, /*10 seconds*/ maximumAge:0 };

            function successCallback(positionInfo) {
                const crd = positionInfo.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
                resolve(positionInfo);
            }

            function errorCallback(error) {
                let message = '';
                switch(error.code){
                    case error.PERMISSION_DENIED:
                    message +="User denied the request for Geolocation API.";
                    break;
                    case error.POSITION_UNAVAILABLE:
                    message = "USer location information is unavailable.";
                    break;
                    case error.TIMEOUT:
                    message = "The request to get user location timed out.";
                    break;
                    case error.UNKNOWN_ERROR:
                    message ="An unknown error occurred.";
                    break;
                }
                console.log(`Error Message: ${message}`, error);
                reject(error);
            }

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, gpsOptions);
        });
        let result = await resultPromise;
        return result;
    }

    return Object.freeze({
        browserGeoLocationIsAvailable : browserGeoLocationIsAvailable,
        getBrowserCurrentGeoLocationAsync : getBrowserCurrentGeoLocationAsync
    });
})();

export default NavigatorGeoLocationHelper;