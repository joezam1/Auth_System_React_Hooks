import SessionUpdateInspector from "../src/middleware/SessionUpdateInspector.js";
import CookieService from "../src/services/cookieStorage/CookieService.js";
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';

jest.mock('../src/services/cookieStorage/CookieService.js');
jest.mock('../src/services/localStorage/LocalStorageService.js');


describe('File SessionUpdateInspector', function(){
    describe('File: resolveUpdatingExpiringSession', function(){
        test('true is true', function(){

            //Arrange
            let cookieName = 'test';
            let cookieValue = null;
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);

            //Act
            let worker = null;
            SessionUpdateInspector.resolveUpdatingExpiringSession(worker);
            //Assert

            expect(LocalStorageService.getItemFromLocalStorage).toHaveBeenCalledTimes(1);
            expect(CookieService.getCookieFromDataStoreByName).toHaveBeenCalledTimes(1);

        });
    })
});