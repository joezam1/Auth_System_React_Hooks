import SessionUpdateInspector from "../src/middleware/SessionUpdateInspector.js";
import CookieService from "../src/services/cookieStorage/CookieService.js";
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import SessionUpdateWebWorkerManager from '../src/backgroundWorkers/SessionUpdateWebWorkerManager.js';
import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';


jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

jest.mock('../src/services/cookieStorage/CookieService.js');
jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/backgroundWorkers/SessionUpdateWebWorkerManager.js');
jest.mock('../src/services/validators/InputCommonInspector.js');


describe('File SessionUpdateInspector', function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('File: resolveUpdateExpiringSession', function(){
        test('CAN resolve Update Expiring Session ', function(){

            //Arrange
            let cookieName = 'test';
            let cookieValue = null;
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            InputCommonInspector.stringIsValid = jest.fn().mockReturnValueOnce(true);

            SessionUpdateWebWorkerManager.createNewWorker = jest.fn();
            SessionUpdateWebWorkerManager.sendMessageToWorker = jest.fn();
            SessionUpdateWebWorkerManager.terminateActiveWorker = jest.fn();
            //Act
            let worker = null;
            SessionUpdateInspector.resolveUpdateExpiringSession(worker);
            //Assert
            expect(setInterval).toHaveBeenCalledTimes(0);

            expect(LocalStorageService.getItemFromLocalStorage).toHaveBeenCalledTimes(1);
            expect(CookieService.getCookieFromDataStoreByName).toHaveBeenCalledTimes(1);

        });
    })
});