import DeviceDetectorService from '../src/services/deviceDetection/DeviceDetectorService.js';
import NavigatorHelper from '../src/services/deviceDetection/NavigatorHelper.js';

jest.mock('../src/services/geoLocation/NavigatorGeoLocationHelper.js' );


describe('File DeviceDetectorService.js', function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: getdeviceAndBrowserInfo',function(){
        test('When the function is called Data is provided: ', function(){
            //Arrange
            let appVersion = 'mozilla 5.0 ver.16.5230';
            let navigatorData = 'Apple-mackbook-v4578';
            let platform = 'this is a test';
            let vendor = 'mozilla';
            let userAgent = 'mozilla firefox Browser';

            NavigatorHelper.getNavigatorData = jest.fn().mockReturnValueOnce(navigatorData);
            NavigatorHelper.getAppVersion = jest.fn().mockReturnValueOnce(appVersion);
            NavigatorHelper.getPlatform = jest.fn().mockReturnValueOnce(platform);
            NavigatorHelper.getVendor = jest.fn().mockReturnValueOnce(vendor);
            NavigatorHelper.getUserAgent = jest.fn().mockReturnValueOnce(userAgent);
            //Act
            let result = DeviceDetectorService.getDeviceAndBrowserInfo();
            let resultVendor = result.vendor;
            //Assert
            expect(resultVendor).toEqual(vendor);
            expect(NavigatorHelper.getPlatform).toHaveBeenCalledTimes(1);
        });
    });


    describe('Function: getUserAgent',function(){
        test('When the function is called User Agent Data is provided: ', function(){
            //Arrange
            let userAgent = 'mozilla firefox Browser';
            NavigatorHelper.getUserAgent = jest.fn().mockReturnValueOnce(userAgent);
            //Act
            let result = DeviceDetectorService.getUserAgent();

            //Assert
            expect(result).toEqual(userAgent);
            expect(NavigatorHelper.getUserAgent).toHaveBeenCalledTimes(1);
        });
    });
});
