import SessionValidatorService from '../src/services/privateWebPagesMediator/SessionValidatorService.js';
import CookieService from '../src/services/cookieStorage/CookieService.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import WebWorkerManager from '../src/backgroundWorkers/WebWorkerManager.js';
import Helpers from '../src/library/common/Helpers.js';

jest.mock('../src/services/cookieStorage/CookieService.js');
jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/backgroundWorkers/WebWorkerManager.js');
jest.mock('../src/library/common/Helpers.js');

describe('File: SessionValidatorService.js', function(){
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: redirectPrivateWebpagesMediator', function(){
        test('When COOKIE is found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = '123456';
            let urlRedirect = RouteConfig.home;
            LocalStorageService.setItemInLocalStorage = jest.fn().mockReturnValueOnce(0);
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            WebWorkerManager.startNewWorker = jest.fn();
            WebWorkerManager.sendMessageToWorker = jest.fn();
            Helpers.setUrlRedirect = jest.fn().mockReturnValueOnce(urlRedirect);

            //Act

            let result = SessionValidatorService.redirectPrivateWebpagesMediator(urlRedirect);

            //Assert
            expect(LocalStorageService.setItemInLocalStorage).toBeCalledTimes(1);
            expect(LocalStorageService.getItemFromLocalStorage).toBeCalledTimes(1);
            expect(WebWorkerManager.startNewWorker).toBeCalledTimes(1);
            expect(WebWorkerManager.sendMessageToWorker).toBeCalledTimes(1);


        });

        test('When COOKIE is NOT found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = null;
            LocalStorageService.setItemInLocalStorage = jest.fn().mockReturnValueOnce(0);
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            WebWorkerManager.startNewWorker = jest.fn();
            WebWorkerManager.sendMessageToWorker = jest.fn();
            let urlRedirect = RouteConfig.home;
            let logoutRedirect = RouteConfig.authLogoutPath;
            Helpers.setUrlRedirect = jest.fn().mockReturnValueOnce(logoutRedirect);
            //Act

            let result = SessionValidatorService.redirectPrivateWebpagesMediator(urlRedirect);

            //Assert
            expect(LocalStorageService.setItemInLocalStorage).toBeCalledTimes(1);
            expect(LocalStorageService.getItemFromLocalStorage).toBeCalledTimes(1);
            expect(WebWorkerManager.startNewWorker).toBeCalledTimes(0);
            expect(WebWorkerManager.sendMessageToWorker).toBeCalledTimes(0);

        })
    })
});
