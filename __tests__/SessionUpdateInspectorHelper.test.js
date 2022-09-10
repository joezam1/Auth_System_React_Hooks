import SessionUpdateInspectorHelper from '../src/middleware/SessionUpdateInspectorHelper.js';
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import CookieService from '../src/services/cookieStorage/CookieService.js';


jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/services/cookieStorage/CookieService.js');


describe('File SessionUpdateInspectorHelper.js', function(){
    beforeEach(()=>{
        jest.resetAllMocks();
    });
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: resolveSessionUpdate', function(){
        test('CAM resolve Session Update', function(){
            //Arrange
            let _sessionInfo={
                sessionToken:{
                    fieldValue: 'adfadf'
                },
                expires:{
                    fieldValue:60000
                }
            }
            let mockCurrentSessionCookieName = 'cookie';
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValue(mockCurrentSessionCookieName);

            let mockCurrentSessionCookieValue = 'abc';
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValue(mockCurrentSessionCookieValue);
            CookieService.deleteCookieFromDataStoreByNameAndPath = jest.fn();
            CookieService.insertCookieInDataStore = jest.fn().mockReturnValue('ok');
            //Act
            let result = SessionUpdateInspectorHelper.resolveSessionUpdate(_sessionInfo);
            //Assert
            expect(result).toBe(true);
            expect( LocalStorageService.getItemFromLocalStorage ).toHaveBeenCalledTimes(3);
            expect( CookieService.getCookieFromDataStoreByName ).toHaveBeenCalledTimes(1);
            expect( CookieService.deleteCookieFromDataStoreByNameAndPath ).toHaveBeenCalledTimes(1);
            expect( CookieService.insertCookieInDataStore ).toHaveBeenCalledTimes(1);

        });
    });
});