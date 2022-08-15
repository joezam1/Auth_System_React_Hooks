


const GeolocationServices = (function(){

    const getGeolocationAsync = async function(){
        let promise = new Promise(function(resolve, reject){
            if (navigator.geolocation) {
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
            }
            else{
                resolve(null);
            }
        });
        let result = await promise;
        return result;
    }
    return Object.freeze({
        getGeolocationAsync : getGeolocationAsync
    });
})();

export default GeolocationServices;