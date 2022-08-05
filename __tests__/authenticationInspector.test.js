import AuthenticationInspector from '../src/services/privateWebPagesMediator/AuthenticationInspector.js';
import CookieService from '../src/services/cookieStorage/CookieService.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';

jest.mock('../src/services/cookieStorage/CookieService.js');

describe('File: AuthenticationInspector.js', function(){
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('redirectPrivateWebpagesMediator', function(){
        test('When COOKIE is found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = '123456';
            CookieService.getCookieName = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            let urlRedirect = RouteConfig.home;
            //Act

            let result = AuthenticationInspector.redirectPrivateWebpagesMediator(urlRedirect);
            let navigationObj = (result.type.name === 'Navigate');
            let navigationUrl = result.props.to;
            //Assert
            expect(navigationObj).toBe(true);
            expect(navigationUrl).toEqual(urlRedirect);
        });

        test('When COOKIE is NOT found the system redirects to pre-defined route', function(){
            //Arrange
            let cookieName = 'test-cookie'
            let cookieValue = null;
            CookieService.getCookieName = jest.fn().mockReturnValueOnce(cookieName);
            CookieService.getCookieFromDataStoreByName = jest.fn().mockReturnValueOnce(cookieValue);
            let urlRedirect = RouteConfig.home;
            let logoutRedirect = RouteConfig.authLogoutPath;
            //Act

            let result = AuthenticationInspector.redirectPrivateWebpagesMediator(urlRedirect);
            let navigationObj = (result.type.name === 'Navigate');
            let navigationUrl = result.props.to;
            //Assert
            expect(navigationObj).toBe(true);
            expect(navigationUrl).toEqual(logoutRedirect);
        })
    })
});
