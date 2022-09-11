import CookieService from '../src/services/cookieStorage/CookieService.js';
import CookieHelper from '../src/services/cookieStorage/CookieHelper.js';
import MonitorService from '../src/services/monitoring/MonitorService.js';


jest.mock('../src/services/cookieStorage/CookieHelper.js')

describe('File: CookieService.js',function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });

    describe('Function: insertCookieInDataStore', function(){
        test('When we provide the correct values, the information is stored as cookie', function(){
            //Arrange
            let mockResult = 'OK';
            CookieHelper.setCookie = jest.fn().mockReturnValueOnce(mockResult);
            let cookie = {
                name: 'test',
                value:'123',
                properties:{
                    path:'/',
                    maxAge:900000
                }
            }
            //Act
            let result = CookieService.insertCookieInDataStore(cookie.name,cookie.value,cookie.properties);
            //Assert
            expect(result).toEqual('ok');
            expect(CookieHelper.setCookie).toHaveBeenCalledTimes(1);
        })
    });

    describe('Function: getCookieFromDataStoreByName',function(){
        test('Selected Cookie by Name returns OK',function(){
            //Arrange
            let cookieName = 'testabc';
            let cookieValue = '123456';
            CookieHelper.getCookieValueByName = jest.fn().mockReturnValueOnce(cookieValue);
            //Act
            let cookieResult = CookieService.getCookieFromDataStoreByName(cookieName);
            MonitorService.capture('cookieResult', cookieResult);
            //Assert
            expect(cookieResult).toEqual(cookieValue);
            expect(CookieHelper.getCookieValueByName).toHaveBeenCalledTimes(1);
        });
    });

    describe('Function: deleteCookieFromDataStoreByNameAndPath', function(){
        test('Function is called once OK', function(){
            //Arrange
            let name = 'test';
            let path = '/';
            let deleteResult = 'OK';
            CookieHelper.deleteCookieByNameSecurely = jest.fn().mockReturnValueOnce(deleteResult);
            //Act
            let deletionResult = CookieService.deleteCookieFromDataStoreByNameAndPath(name,path);
            //Assert
            expect(deletionResult).toEqual(deleteResult);
            expect(CookieHelper.deleteCookieByNameSecurely).toHaveBeenCalledTimes(1);
        });
    });

    describe('Function: sessionCookieIsExpired', function(){
        test('when UTC Date is in the PAST it returns TRUE', function(){
            //Arragne
            let selectedDateNow = new Date();
            let timestamp2DaysEarlier = selectedDateNow.setDate(selectedDateNow.getDate() - 2);
            var date2DaysEarlierUTC =  new Date( timestamp2DaysEarlier + (selectedDateNow.getTimezoneOffset()*60000));
            //Act
            let result = CookieService.sessionCookieIsExpired(date2DaysEarlierUTC);

            //Assert
            expect(result).toBe(true);

        });

        test('when UTC Date is in the FUTURE it returns FALSE', function(){
            //Arragne
            let selectedDateNow = new Date();
            let timestamp2DaysEarlier = selectedDateNow.setDate(selectedDateNow.getDate()  + 3);
            var date3DaysLatierUTC =  new Date( timestamp2DaysEarlier + (selectedDateNow.getTimezoneOffset()*60000));
            //Act
            let result = CookieService.sessionCookieIsExpired(date3DaysLatierUTC);

            //Assert
            expect(result).toBe(false);

        });
    });

});