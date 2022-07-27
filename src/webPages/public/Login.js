import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import UserLoginViewModel from '../../viewModels/UserLogin.js';
import ValidationManager from '../../services/validators/ValidationService.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import httpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import RequestMethods from '../../services/httpProtocol/RequestMethods.js';
import CookieService from '../../services/cookieStorage/cookieService.js';
import authenticationInspector from '../../services/privatePagesMediator/authenticationInspector.js';

export default function Login(){
    const [ notificationInfo, setNotification ] = useState('');
    const [isLoggedIn, setUserLogin] = useState();
    const [ usernameErrors, setUsernameErrors ] = useState('');
    const [ passwordErrors, setPasswordErrors ] = useState('');
    let messageErrorsInForm = 'There are errors in the Form.';
    let messageLoginFailed = 'Error: Login Failed ';
    let messageLoginNonProcessable = 'Login non-processable: ';
    let userInfo = null;


    function loginUserCallback(response){
        console.log('loginUserCallback-response', response);
        switch(response.status){
            case httpResponseStatus._200ok:
                let name = response.result.name;
                let value = response.result.value;
                let properties = response.result.properties;
                CookieService.insertCookieInDataStore(name, value, properties)

                setUserLogin(true);
            break;

            case httpResponseStatus._401unauthorized:
                let responseObj = (typeof response.result === 'object')
                if(responseObj){
                    setNotification(messageErrorsInForm);
                    console.log('userInfo', userInfo);
                    let errorMessagesReport = ValidationManager.buildErrorMessagesReport(response.result, userInfo);
                    setAllErrorMessages(errorMessagesReport);
                    break;
                }
                setNotification(response.result);
            break;

            case httpResponseStatus._400badRequest:
                messageLoginFailed += messageLoginFailed + response.result;
                setNotification(messageLoginFailed);
            break;

            default:
                messageLoginNonProcessable += messageLoginNonProcessable + response.result;
                setNotification(messageLoginNonProcessable);
            break;
        }
    }


    function processUserLoginSession(){
        setNotification('');
        var form = document.getElementById('loginCustomerForm');
        if(form !==null) {
            console.log('processUserRegistration-form', form);
            var username = form[0].value;
            var password = form[1].value;
            var dataModel = {
                username : username,
                password : password
            }
            var userLogin = new UserLoginViewModel(dataModel);
            console.log('processUserRegistration-userLogin', userLogin);
            userInfo = userLogin;
            if( !inputsAreValid(userLogin)){ return; }

            var loginUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiUsersLoginPathPost;
            RequestMethods.postMethod(loginUrl, dataModel, loginUserCallback);
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
        var redirect = authenticationInspector.redirectPrivateWebpagesMediator(RouteConfig.privateCustomerDashboard )
         return redirect;
     }
    return(
        <div className="register-container">
               <h3>Login</h3>
               <span><Link to={RouteConfig.home}> Home </Link></span><br/>
               <span><Link to={RouteConfig.authRegisterPath}>Register</Link></span>
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