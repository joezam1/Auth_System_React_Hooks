import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserRegister from '../../viewModels/UserRegister.js';
import UserRole from '../../library/enumerations/UserRole.js';
import RequestMethodsService from '../../services/httpProtocol/RequestMethodsService.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import httpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import ValidationManager from '../../services/validators/ValidationService.js';
import NotificationService from '../../services/notifications/NotificationService.js';
import TokenType from '../../library/enumerations/TokenType.js';
import LocalStorageService from '../../services/localStorage/LocalStorageService.js';
import AntiforgeryTokenService from '../../services/csrfProtection/AntiForgeryTokenService.js';
import MonitorService from '../../services/monitoring/MonitorService.js';




//Test:DONE
export default function Register() {

    const [notificationInfo, setNotification] = useState('');
    const [isRegistered, setRegisterStatus] = useState(false);
    const [firstNameErrors, setFirstNameErrors] = useState('');
    const [lastNameErrors, setLastNameErrors] = useState('');
    const [usernameErrors, setUsernameErrors] = useState('');
    const [emailErrors, setEmailErrors] = useState('');
    const [passwordErrors, setPasswordErrors] = useState('');
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState('');
    const [antiforgeryToken, setAntiforgeryToken] = useState('');
    const [antiforgeryTokenClient, setAntiforgeryTokenClient] = useState('');


    let userInfo = null;


    useEffect(() => {

        MonitorService.capture('Register-componentName', Register.name);
        let tokenTypeName = TokenType[TokenType.antiforgeryToken];
        let csrfToken = LocalStorageService.getItemFromLocalStorage(tokenTypeName);
        setAntiforgeryToken(csrfToken);

        async function createCsrfToken() {
            let csrfToken = await AntiforgeryTokenService.createAntiForgeryTokenAsync();
            setAntiforgeryTokenClient(csrfToken);
        }

        createCsrfToken();
    }, []);




    let registerUserCallback = (response) => {
        MonitorService.capture('RegisterUserCallback-response', response);
        switch (response.status) {
            case httpResponseStatus._201created:
                let csrfToken = response.csrfToken;
                let csrfTokenName = TokenType[TokenType.antiforgeryToken];
                LocalStorageService.removeItemFromLocalStorage(csrfTokenName);
                LocalStorageService.setItemInLocalStorage(csrfTokenName, csrfToken);
                setNotificationPromise(NotificationService.registrationSuccess)
                    .then(setRegisterStatusPromise(true));
                break;

            case httpResponseStatus._401unauthorized:
                let responseObj = (typeof response.result === 'object')
                if (responseObj) {
                    setNotification(NotificationService.errorsInForm);
                    MonitorService.capture('userInfo', userInfo);
                    let errorMessagesReport = ValidationManager.buildErrorMessagesReport(response.result, userInfo);
                    setAllErrorMessages(errorMessagesReport);
                    break;
                }
                setNotification(response.result);
                break;

            case httpResponseStatus._400badRequest:
                setNotification(NotificationService.registrationFailed);
                break;

            default:
                setNotification(NotificationService.registrationNonProcessable);
                break;
        }
    }

    function setNotificationPromise(message) {
        let promise = new Promise(function (resolve, reject) {
            resolve(setNotification(message));
        });
        return promise;
    }

    function setRegisterStatusPromise(status) {
        let promise = new Promise(function (resolve, reject) {
            //NOTE: Wait 5 seconds to display the SUCCESS registering the account,
            //Then redirect the user to the Login Page
            setTimeout(function () { resolve(setRegisterStatus(status)); }, 5000);
        })
        return promise;
    }

    function processUserRegistration() {
        setNotification('');
        var form = document.getElementById('registerCustomerForm');
        if (form !== null) {
            MonitorService.capture('processUserRegistration-form', form);

            let dataModel = {
                firstName: (InputCommonInspector.objectIsValid(form[0])) ? form[0].value : '',
                lastName: (InputCommonInspector.objectIsValid(form[1])) ? form[1].value : '',
                username: (InputCommonInspector.objectIsValid(form[2])) ? form[2].value : '',
                email: (InputCommonInspector.objectIsValid(form[3])) ? form[3].value : '',
                password: (InputCommonInspector.objectIsValid(form[4])) ? form[4].value : '',
                confirmPassword: (InputCommonInspector.objectIsValid(form[5])) ? form[5].value : '',
                userRole: UserRole.BaseCustomer
            };
            var user = new UserRegister(dataModel);
            MonitorService.capture('processUserRegistration-user', user);
            userInfo = user;
            if (!inputsAreValid(user)) { return; }
            var registerUrl = EnvConfig.PROTOCOL + '://' + EnvConfig.TARGET_URL + ServerConfig.apiUsersRegisterPathPost;

            let _headers = {
                x_csrf_token: antiforgeryToken,
                x_csrf_token_client: antiforgeryTokenClient
            }
            RequestMethodsService.postMethod(registerUrl, dataModel, registerUserCallback, _headers);
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
        setFirstNameErrors(errorsReport.firstNameAllErrors);
        setLastNameErrors(errorsReport.lastNameAllErrors);
        setUsernameErrors(errorsReport.usernameAllErrors);
        setEmailErrors(errorsReport.emailAllErrors);
        setPasswordErrors(errorsReport.passwordAllErrors);
        setConfirmPasswordErrors(errorsReport.confirmPasswordAllErrors);
    }

    if (isRegistered) {
        return <Navigate to={RouteConfig.authLoginPath} />
    }

    return (
        <div className="register-section webpage">
            <div className='outerLayout'>
                <div className='header-container'>
                    <div className='header-title silverBorder'>
                        <div className='topNavigationBar'>
                            <div className='floatLeft margin10'>Registration Section</div>
                            <ul className='floatRight'>
                                <li className='inlineBlock btnCreate'> <Link to={RouteConfig.homePath} data-testid="link-register-home-id" className='noTextDecoration'> Home </Link> </li>
                                <li className='inlineBlock btnCreate'> <Link to={RouteConfig.authLoginPath} data-testid="link-register-login-id" className="noTextDecoration"> Login </Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <form action="/api/register" method="post" id="registerCustomerForm" className="form">
                <input type="text" name="firstName" placeholder="First Name" className="inputForm" onFocus={() => { setFirstNameErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: firstNameErrors }}></span>
                </div>
                <input type="text" name="lastName" placeholder="Last Name" className="inputForm" onFocus={() => { setLastNameErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: lastNameErrors }}></span>
                </div>
                <input type="text" name="username" placeholder="Username" className="inputForm" onFocus={() => { setUsernameErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: usernameErrors }}></span>
                </div>
                <input type="email" name="enail" placeholder="Email" className="inputForm" onFocus={() => { setEmailErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: emailErrors }}></span>
                </div>
                <input type="password" name="password" placeholder="Password" className="inputForm" onFocus={() => { setPasswordErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: passwordErrors }}></span>
                </div>
                <input type="password" name="confirmPassword" placeholder="Password" className="inputForm" onFocus={() => { setConfirmPasswordErrors(''); }} />
                <div className='textLeft margin10 danger'>
                    <span dangerouslySetInnerHTML={{ __html: confirmPasswordErrors }}></span>
                </div>

                <button type="button" name="button" onClick={() => { processUserRegistration(); }} value="Register" className="inputForm btnCreate " data-testid="register-customer-form-id">Register</button>
            </form>

            <p>{notificationInfo}</p>
        </div>);
}