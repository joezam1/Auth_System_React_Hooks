import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import UserLoginViewModel from '../../viewModels/UserLogin.js';
import UserLoginDataModel from '../../dataModels/UserLoginDataModel.js';
import ValidationManager from '../../services/validators/ValidationService.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import httpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import RequestMethodsService from '../../services/httpProtocol/RequestMethodsService.js';
import CookieService from '../../services/cookieStorage/CookieService.js';
import LocalStorageService from '../../services/localStorage/LocalStorageService.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import SessionAuthenticationService from '../../services/privateWebPagesMediator/SessionAuthenticationService.js';
import SessionUpdateInspector from '../../middleware/SessionUpdateInspector.js';
import IdleSessionInspector from '../../middleware/IdleSessionInspector.js';
import NotificationService from '../../services/notifications/NotificationService.js';
import GeolocationServices from '../../services/geoLocation/geoLocationService.js';
import DeviceDetectorService from '../../services/deviceDetection/DeviceDetectorService.js';
import TokenType from '../../library/enumerations/TokenType.js';
import JwtTokenService from '../../services/authorization/JwtTokenService.js';
import AntiforgeryTokenService from '../../services/csrfProtection/AntiForgeryTokenService.js';
import MonitorService from '../../services/monitoring/MonitorService.js';




//Test: DONE
export default function Login() {
    const [geoLocationInfo, setGeolocation] = useState();
    const [notificationInfo, setNotification] = useState('');
    const [isLoggedIn, setUserLogin] = useState(false);
    const [usernameErrors, setUsernameErrors] = useState('');
    const [passwordErrors, setPasswordErrors] = useState('');
    const [antiforgeryToken, setAntiforgeryToken] = useState('');
    const [antiforgeryTokenClient, setAntiforgeryTokenClient] = useState('');


    let userInfo = null;

    useEffect(() => {

        MonitorService.capture('login-componentName', Login.name);
        let tokenTypeName = TokenType[TokenType.antiforgeryToken];
        let csrfToken = LocalStorageService.getItemFromLocalStorage(tokenTypeName);
        setAntiforgeryToken(csrfToken);

        async function getGeolocation() {
            let result = await GeolocationServices.getGeoLocationAsync();
            setGeolocation(result);
        }
        async function createCsrfToken() {
            let csrfToken = await AntiforgeryTokenService.createAntiForgeryTokenAsync();
            setAntiforgeryTokenClient(csrfToken);
        }
        getGeolocation();
        createCsrfToken();
    }, []);


    function loginUserCallback(response) {
        MonitorService.capture('loginUserCallback-response', response);

        switch (response.status) {
            case httpResponseStatus._200ok:

                let data = response.result;
                let name = data.session.fieldValue.name;
                let value = data.session.fieldValue.value;
                let properties = data.session.fieldValue.properties;
                LocalStorageService.setItemInLocalStorage(CookieProperty.NAME, name);
                LocalStorageService.setItemInLocalStorage(CookieProperty.PATH, properties.path);
                let resultCookieStorage = CookieService.insertCookieInDataStore(name, value, properties);
                MonitorService.capture('resultCookieStorage', resultCookieStorage)
                JwtTokenService.saveTokenToLocalStorage(TokenType.jwtAccessToken, data.jwtAccessToken.fieldValue);
                JwtTokenService.saveTokenToLocalStorage(TokenType.jwtRefreshToken, data.jwtRefreshToken.fieldValue);
                let csrfTokenName = TokenType[TokenType.antiforgeryToken];
                LocalStorageService.removeItemFromLocalStorage(csrfTokenName);
                LocalStorageService.setItemInLocalStorage(csrfTokenName, data.csrfToken.fieldValue);
                IdleSessionInspector.scanIdleBrowserTime();
                SessionUpdateInspector.resolveUpdateExpiringSession();
                setUserLogin(true);

                break;

            case httpResponseStatus._401unauthorized:
                let responseObj = (typeof response.result === 'object')
                if (responseObj) {
                    setNotification(NotificationService.errorsInForm);
                    MonitorService.capture('userInfo: ', userInfo);
                    let errorMessagesReport = ValidationManager.buildErrorMessagesReport(response.result, userInfo);
                    setAllErrorMessages(errorMessagesReport);
                    break;
                }
                setNotification(response.result);
                break;

            case httpResponseStatus._400badRequest:
                MonitorService.capture('LOGIN: Failure Error: ', response);
                setNotification(NotificationService.loginFailed);
                break;

            default:
                setNotification(NotificationService.loginNonProcessable);
                break;
        }
    }


    function processUserLoginSession() {
        setNotification('');

        let form = document.getElementById('loginCustomerForm');
        if (form !== null) {
            MonitorService.capture('processUserRegistration-form', form);
            UserLoginDataModel.username = (InputCommonInspector.objectIsValid(form[0])) ? form[0].value : '';
            UserLoginDataModel.password = (InputCommonInspector.objectIsValid(form[1])) ? form[1].value : '',
                UserLoginDataModel.geoLocation = geoLocationInfo;
            UserLoginDataModel.userAgent = DeviceDetectorService.getUserAgent();
            UserLoginDataModel.deviceAndBrowser = DeviceDetectorService.getDeviceAndBrowserInfo();
            var userLogin = new UserLoginViewModel(UserLoginDataModel);
            MonitorService.capture('processUserRegistration-userLogin', userLogin);
            userInfo = userLogin;
            if (!inputsAreValid(userLogin)) { return; }

            MonitorService.capture('UserLoginDataModel:', UserLoginDataModel);
            var loginUrl = EnvConfig.PROTOCOL + '://' + EnvConfig.TARGET_URL + ServerConfig.apiUsersLoginPathPost;
            let headers = {
                x_csrf_token: antiforgeryToken,
                x_csrf_token_client: antiforgeryTokenClient
            }
            RequestMethodsService.postMethod(loginUrl, UserLoginDataModel, loginUserCallback, headers);
        }
    }

    function inputsAreValid(objModel) {
        let errorsReport = ValidationManager.resolveUserFormValidation(objModel);
        if (!InputCommonInspector.objectIsNullOrEmpty(errorsReport)) {
            setNotification(NotificationService.errorsInForm);
            let errorMessagesReport = ValidationManager.buildErrorMessagesReport(errorsReport, objModel);
            setAllErrorMessages(errorMessagesReport);
            return false;
        }

        return true;
    }

    function setAllErrorMessages(errorsReport) {
        setUsernameErrors(errorsReport.usernameAllErrors);
        setPasswordErrors(errorsReport.passwordAllErrors);
    }

    if (isLoggedIn) {
        MonitorService.capture('LOGIN-PAGE-isLoggedIn', isLoggedIn);
        SessionAuthenticationService.redirectPrivateWebpagesMediator(RouteConfig.privateCustomerDashboardPath)
    }
    return (
        <div className="login-section webpage">
            <div className='outerLayout'>
                <div className='header-container'>
                    <div className='header-title silverBorder'>
                        <div className='topNavigationBar'>
                            <div className='floatLeft margin10'>Login Section</div>
                            <ul className='floatRight'>
                                <li className='inlineBlock btnCreate'> <Link to={RouteConfig.homePath} data-testid="link-login-home-id" className='noTextDecoration'> Home </Link> </li>
                                <li className='inlineBlock btnCreate'> <Link to={RouteConfig.authRegisterPath} data-testid="link-login-register-id" className='noTextDecoration'>Register</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <form action="/api/login" method="post" id="loginCustomerForm" className="form">

                <input type="text" name="username" placeholder="Username" className="inputForm" onFocus={() => { setUsernameErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: usernameErrors }}></span>
                </div>

                <input type="password" name="password" placeholder="Password" className="inputForm" onFocus={() => { setPasswordErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: passwordErrors }}></span>
                </div>

                <button type="button" name="button" onClick={() => { processUserLoginSession(); }} value="submit" className="inputForm btnCreate ">Login</button>
            </form>

            <p>{notificationInfo}</p>

        </div>);
}