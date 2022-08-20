import GeoLocationService from '../src/services/geoLocation/GeoLocationService.js';
import NavigatorGeoLocationHelper from '../src/services/geoLocation/NavigatorGeoLocationHelper.js';


jest.mock('../src/services/geoLocation/NavigatorGeoLocationHelper.js');

describe('File: GeoLocationService.js', function () {
    afterAll(() => {
        jest.resetAllMocks();
    });
    describe('Function: getGeolocationAsync', function () {

        test('When GeoLocation IS AVAILABLE, the function is called, location coordinates are returned', async function () {
            //Arrange
            let isAvailable = true;
            NavigatorGeoLocationHelper.browserGeoLocationIsAvailable = jest.fn().mockReturnValueOnce(isAvailable);
            let coordinates = {
                lat: '+123456',
                long: '-1234657'
            }
            NavigatorGeoLocationHelper.getBrowserCurrentGeoLocationAsync = jest.fn().mockResolvedValueOnce(coordinates);

            //Act
            let result = await GeoLocationService.getGeoLocationAsync();
            let resultLatitude = result.lat;
            //Assert
            expect(resultLatitude).toEqual(coordinates.lat);
        });

        test('When GeoLocation IS NOT AVAILABLE, the function is called, NULL is returned', async function () {
            //Arrange
            let isAvailable = false;
            NavigatorGeoLocationHelper.browserGeoLocationIsAvailable = jest.fn().mockReturnValueOnce(isAvailable);
            let coordinates = {
                lat: '+123456',
                long: '-1234657'
            }
            NavigatorGeoLocationHelper.getBrowserCurrentGeoLocationAsync = jest.fn().mockResolvedValueOnce(coordinates);

            //Act
            let result = await GeoLocationService.getGeoLocationAsync();

            //Assert
            expect(result).toEqual(null);
        });
    });
});
