import SessionUpdateInspector from "../src/middleware/SessionUpdateInspector.js";
import CookieService from "../src/services/cookieStorage/CookieService.js";
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import WebWorkerManager from '../src/backgroundWorkers/WebWorkerManager.js';
import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';
import SessionConfig from '../configuration/authentication/SessionConfig.js';


jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

jest.mock('../src/services/cookieStorage/CookieService.js');
jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/backgroundWorkers/WebWorkerManager.js');
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

            WebWorkerManager.startNewWorker = jest.fn();
            WebWorkerManager.sendMessageToWorker = jest.fn();
            WebWorkerManager.terminateActiveWorker = jest.fn();
            //Act
            let worker = null;
            SessionUpdateInspector.resolveUpdateExpiringSession(worker);
            //Assert
            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), SessionConfig.SESSION_UPDATE_FREQUENCY_IN_MILLISECONDS);

            expect(LocalStorageService.getItemFromLocalStorage).toHaveBeenCalledTimes(1);
            expect(CookieService.getCookieFromDataStoreByName).toHaveBeenCalledTimes(1);

        });
    })
});