import CookieService from '../src/services/cookieStorage/CookieService.js';
import CookieHelper from '../src/services/cookieStorage/CookieHelper.js';
jest.mock('../src/services/cookieStorage/CookieHelper.js')

describe('File: CookieService.js',function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });

    describe('Function: setCookieName',function(){
        test('Cookie Name can be set OK', function(){
            //Arrange
            let cookieName = 'test';
            //Act
            CookieService.setCookieName(cookieName);

            //Assert
            let result = CookieService.getCookieName();
            expect(result).toEqual(cookieName);
        });

    });

    describe('Function: getCookieName',function(){
        test('Get function returns the correct value', function(){
            //Arrange
            let cookieName = 'testing-cookieName-123';
            CookieService.setCookieName(cookieName);
            //Act
            let result = CookieService.getCookieName();

            //Assert
            expect(result).toEqual(cookieName);
        });

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
            expect(result).toEqual('OK');
            expect(CookieHelper.setCookie).toHaveBeenCalledTimes(1);
        })
    });

    describe('Function: getCookieFromDataStoreByName',function(){
        test('Selected Cookie by Name returns OK',function(){
            //Arrange
            let cookieName = 'testabc';
            let cookieValue = '123456';
            CookieHelper.getCookieByName = jest.fn().mockReturnValueOnce(cookieValue);
            //Act
            let cookieResult = CookieService.getCookieFromDataStoreByName(cookieName);
            console.log('cookieResult', cookieResult);
            //Assert
            expect(cookieResult).toEqual(cookieValue);
            expect(CookieHelper.getCookieByName).toHaveBeenCalledTimes(1);
        });
    });

    describe('Function: deleteCookieFromDataStoreByName', function(){
        test('Function is called once OK', function(){
            //Arrange
            let name = 'test';
            let deleteResult = 'OK';
            CookieHelper.deleteCookieByName = jest.fn().mockReturnValueOnce(deleteResult);
            //Act
            let deletionResult = CookieService.deleteCookieFromDataStoreByName(name);
            //Assert
            expect(deletionResult).toEqual(deleteResult);
            expect(CookieHelper.deleteCookieByName).toHaveBeenCalledTimes(1);
        });
    });
});