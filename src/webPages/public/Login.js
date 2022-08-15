import React, {useState, useEffect} from 'react';
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
import SessionValidatorService from '../../services/privateWebPagesMediator/SessionValidatorService.js';

import fetchWorkerScript from '../../backgroundWorkers/FetchWorker.js';
import SessionRefreshInspector from '../../middleware/SessionRefreshInspector.js';
import IdleSessionInspector from '../../middleware/IdleSessionInspector.js';
import NotificationService from '../../services/notifications/NotificationService.js';
import GeolocationServices from '../../services/geoLocation/geoLocationService.js';
import DeviceDetectorService from '../../services/deviceDetection/DeviceDetectorService.js';





export default function Login(){
    const [geoLocationInfo, setGeolocation] = useState();
    const [ notificationInfo, setNotification ] = useState('');
    const [isLoggedIn, setUserLogin] = useState(false);
    const [ usernameErrors, setUsernameErrors ] = useState('');
    const [ passwordErrors, setPasswordErrors ] = useState('');


    let userInfo = null;

    useEffect(()=>{

        async function getGeolocation(){
            let result = await GeolocationServices.getGeolocationAsync();
            setGeolocation(result);
        }
        getGeolocation();

    },[]);


    function loginUserCallback(response){
        console.log('loginUserCallback-response', response);

        switch(response.status){
            case httpResponseStatus._200ok:
                let name = response.result.name;
                let value = response.result.value;
                let properties = response.result.properties;
                LocalStorageService.setItemInLocalStorage(CookieProperty.NAME, name);
                LocalStorageService.setItemInLocalStorage(CookieProperty.PATH, properties.path);
                CookieService.insertCookieInDataStore(name, value, properties);
                //IdleSessionInspector.scanIdleBrowserTime();
                //SessionRefreshInspector.resolveRefreshingExpiringSession(fetchWorkerScript);
                //setUserLogin(true);

            break;

            case httpResponseStatus._401unauthorized:
                let responseObj = (typeof response.result === 'object')
                if(responseObj){
                    setNotification( NotificationService.errorsInForm );
                    console.log('userInfo', userInfo);
                    let errorMessagesReport = ValidationManager.buildErrorMessagesReport(response.result, userInfo);
                    setAllErrorMessages(errorMessagesReport);
                    break;
                }
                setNotification( response.result );
            break;

            case httpResponseStatus._400badRequest:
                setNotification( NotificationService.loginFailed );
            break;

            default:
                setNotification( NotificationService.loginNonProcessable  );
            break;
        }
    }


    function processUserLoginSession(){
        setNotification('');

        let form = document.getElementById('loginCustomerForm');
        if(form !==null) {
            console.log('processUserRegistration-form', form);
            UserLoginDataModel.username = (InputCommonInspector.objectIsValid(form[0]) ) ? form[0].value : '';
            UserLoginDataModel.password = (InputCommonInspector.objectIsValid(form[1]) ) ? form[1].value : '',
            UserLoginDataModel.geoLocation = geoLocationInfo;
            UserLoginDataModel.userAgent = window.navigator.userAgent;
            UserLoginDataModel.deviceAndBrowser = DeviceDetectorService.getDeviceAndBrowserInfo();
            var userLogin = new UserLoginViewModel(UserLoginDataModel);
            console.log('processUserRegistration-userLogin', userLogin);
            userInfo = userLogin;
            if( !inputsAreValid(userLogin)){ return; }

            console.log('UserLoginDataModel:', UserLoginDataModel);
            var loginUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiUsersLoginPathPost;
            RequestMethodsService.postMethod(loginUrl, UserLoginDataModel, loginUserCallback);
        }
    }

    function inputsAreValid(objModel){
        let errorsReport = ValidationManager.resolveUserFormValidation(objModel);
        if(!InputCommonInspector.objectIsNullOrEmpty(errorsReport)){
            setNotification(messageErrorsInForm);
            let errorMessagesReport = ValidationManager.buildErrorMessagesReport(errorsReport, objModel);
            setAllErrorMessages(errorMessagesReport);
            return false;
        }

        return true;
    }

    function setAllErrorMessages(errorsReport){
        setUsernameErrors(errorsReport.usernameAllErrors);
        setPasswordErrors(errorsReport.passwordAllErrors);
    }

    if (isLoggedIn) {
        SessionValidatorService.redirectPrivateWebpagesMediator(RouteConfig.privateCustomerDashboard )
    }
    return(
        <div className="register-container">
               <h3>Login</h3>
               <span><Link to={RouteConfig.home} data-testid="link-login-home-id"> Home </Link></span><br/>
               <span><Link to={RouteConfig.authRegisterPath} data-testid="link-login-register-id">Register</Link></span>
               <br />
               <fieldset>
                   <form action="/api/login" method="post" id="loginCustomerForm" className="form">

                       <input type="text" name="username" placeholder="Insert your username" className="row" onFocus={()=>{setUsernameErrors('');}}/>
                       <div className='text-left'>
                           <span dangerouslySetInnerHTML={{ __html: usernameErrors }}></span>
                       </div>

                       <input type="password" name="password" placeholder="insert your password" className="row" onFocus={()=>{setPasswordErrors('');}}/>
                       <div className='text-left'>
                           <span dangerouslySetInnerHTML={{ __html: passwordErrors }}></span>
                       </div>

                       <button type="button" name="button" onClick={() => { processUserLoginSession(); } } value="submit" className="row">Submit</button>
                   </form>
               </fieldset>
           <p>{notificationInfo}</p>

       </div>);
}