import SessionAuthenticationService from '../src/services/privateWebPagesMediator/SessionAuthenticationService.js';
import CookieService from '../src/services/cookieStorage/CookieService.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import SessionAuthenticationWebWorkerManager from '../src/backgroundWorkers/SessionAuthenticationWebWorkerManager.js';
import Helpers from '../src/library/common/Helpers.js';

jest.mock('../src/services/cookieStorage/CookieService.js');
jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/backgroundWorkers/SessionAuthenticationWebWorkerManager.js');
jest.mock('../src/library/common/Helpers.js');

describe('File: SessionAuthenticationService.js', function(){
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: redirectPrivateWebpagesMediator', function(){
        test('When COOKIE is found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = '123456';
            let urlRedirect = RouteConfig.homePath;
            LocalStorageService.setItemInLocalStorage = jest.fn().mockReturnValueOnce(0);
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            SessionAuthenticationWebWorkerManager.createNewWorker = jest.fn();
            SessionAuthenticationWebWorkerManager.sendMessageToWorker = jest.fn();
            Helpers.setUrlRedirect = jest.fn().mockReturnValueOnce(urlRedirect);

            //Act

            let result = SessionAuthenticationService.redirectPrivateWebpagesMediator(urlRedirect);

            //Assert
            expect(LocalStorageService.setItemInLocalStorage).toBeCalledTimes(1);
            expect(LocalStorageService.getItemFromLocalStorage).toBeCalledTimes(2);
            expect(SessionAuthenticationWebWorkerManager.createNewWorker).toBeCalledTimes(1);
            expect(SessionAuthenticationWebWorkerManager.sendMessageToWorker).toBeCalledTimes(1);


        });

        test('When COOKIE is NOT found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = null;
            LocalStorageService.setItemInLocalStorage = jest.fn().mockReturnValueOnce(0);
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            SessionAuthenticationWebWorkerManager.createNewWorker = jest.fn();
            SessionAuthenticationWebWorkerManager.sendMessageToWorker = jest.fn();
            let urlRedirect = RouteConfig.homePath;
            let logoutRedirect = RouteConfig.authLogoutPath;
            Helpers.setUrlRedirect = jest.fn().mockReturnValueOnce(logoutRedirect);
            //Act

            let result = SessionAuthenticationService.redirectPrivateWebpagesMediator(urlRedirect);

            //Assert
            expect(LocalStorageService.setItemInLocalStorage).toBeCalledTimes(1);
            expect(LocalStorageService.getItemFromLocalStorage).toBeCalledTimes(2);
            expect(SessionAuthenticationWebWorkerManager.createNewWorker).toBeCalledTimes(0);
            expect(SessionAuthenticationWebWorkerManager.sendMessageToWorker).toBeCalledTimes(0);

        })
    })
});
