import React, { useState } from 'react';
import { Link , Navigate } from 'react-router-dom';
import User from '../../viewModels/UserRegister.js';
import UserRoles from '../../library/enumerations/UserRoles.js';
import RequestMethods from '../../services/httpProtocol/RequestMethods.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import httpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import ValidationManager from '../../services/validators/ValidationService.js'

export default function Register(){

    const [ notificationInfo, setNotification ] = useState('');
    const [ isRegistered, setRegisterStatus] = useState(false);
    const [ firstNameErrors, setFirstNameErrors ] = useState('');
    const [ lastNameErrors, setLastNameErrors ]= useState('');
    const [ usernameErrors, setUsernameErrors ] = useState('');
    const [ emailErrors, setEmailErrors ] = useState('');
    const [ passwordErrors, setPasswordErrors ] = useState('');
    const [ confirmPasswordErrors, setConfirmPasswordErrors ] = useState('');
    let messageRegistrationSuccess = 'Account Registered. You can now Login.';
    let messageErrorsInForm = 'There are errors in the Form.';
    let messageRegistrationFailed = 'Error: Registration Failed ';
    let messageRegistrationNonProcessable = 'Registration non-processable: ';
    let userInfo = null;


    let registerUserCallback = (response) =>{
        console.log('RegisterUserCallback-response', response);
        switch(response.status){
            case httpResponseStatus._201created:
                setNotificationPromise(messageRegistrationSuccess)
                .then(setRegisterStatusPromise(true));
            break;

            case httpResponseStatus._401unauthorized:
                let responseObj = (typeof response.result === 'object')
                if(responseObj){
                    setNotification(messageErrorsInRegistrationForm);
                    console.log('userInfo', userInfo);
                    let errorMessagesReport = ValidationManager.buildErrorMessagesReport(response.result, userInfo);
                    setAllErrorMessages(errorMessagesReport);
                    break;
                }
                setNotification(response.result);
            break;

            case httpResponseStatus._400badRequest:
                messageRegistrationFailed += messageRegistrationFailed + response.result;
                setNotification(messageRegistrationFailed);
            break;

            default:
                messageRegistrationNonProcessable += messageRegistrationNonProcessable+ response.result;
                setNotification(messageRegistrationNonProcessable);
            break;
        }
    }

    function setNotificationPromise(message){
        let promise = new Promise(function (resolve, reject){
            resolve(setNotification(message));
        });
        return promise;
    }

    function setRegisterStatusPromise(status){
        let promise = new Promise(function(resolve, reject){
            //NOTE: Wait 5 seconds to display the SUCCESS registering the account,
            //Then redirect the user to the Login Page
            setTimeout(function(){
                resolve(setRegisterStatus(status));
            }, 5000);

        })
        return promise;
    }

    function processUserRegistration(){
        setNotification('');
        var form = document.getElementById('registerCustomerForm');
        if(form !==null) {
            console.log('processUserRegistration-form', form);
            let dataModel = {
                firstName : form[0].value,
                lastName : form[1].value,
                username : form[2].value,
                email : form[3].value,
                password : form[4].value,
                confirmPassword : form[5].value,
                userRole : UserRoles.Customer
            };
            var user = new User(dataModel);
            console.log('processUserRegistration-user', user);
            userInfo = user;
            if( !inputsAreValid(user) ){ return; }
            var registerUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiUsersRegisterPathPost;
            RequestMethods.postMethod(registerUrl, dataModel, registerUserCallback);
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
        setFirstNameErrors(errorsReport.firstNameAllErrors);
        setLastNameErrors(errorsReport.lastNameAllErrors);
        setUsernameErrors(errorsReport.usernameAllErrors);
        setEmailErrors(errorsReport.emailAllErrors);
        setPasswordErrors(errorsReport.passwordAllErrors);
        setConfirmPasswordErrors(errorsReport.confirmPasswordAllErrors);
    }

    if(isRegistered){
        return <Navigate to = {RouteConfig.authLoginPath} />
    }

    return(
     <div className="register-container">
            <h3>Register</h3>
            <span><Link to={ RouteConfig.home } > Home </Link></span>
            <br/>
            <span><Link to={ RouteConfig.authLoginPath }> Login </Link></span>
            <br />
            <fieldset>
                <form action="/api/register" method="post" id="registerCustomerForm" className="form">
                    <input type="text" name="firstName" placeholder="Insert your first Name" className="row" onFocus={()=>{ setFirstNameErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: firstNameErrors }}></span>
                    </div>
                    <input type="text" name="lastName" placeholder="Insert your last Name" className="row" onFocus={()=>{setLastNameErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: lastNameErrors }}></span>
                    </div>
                    <input type="text" name="username" placeholder="Insert your username" className="row" onFocus={()=>{setUsernameErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: usernameErrors }}></span>
                    </div>
                    <input type="email" name="enail" placeholder="Insert your email" className="row" onFocus={()=>{setEmailErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: emailErrors }}></span>
                    </div>
                    <input type="password" name="password" placeholder="insert your password" className="row" onFocus={()=>{setPasswordErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: passwordErrors }}></span>
                    </div>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" className="row" onFocus={()=>{setConfirmPasswordErrors('');}}/>
                    <div className='text-left'>
                        <span dangerouslySetInnerHTML={{ __html: confirmPasswordErrors }}></span>
                    </div>

                    <button type="button" name="button" onClick={() => { processUserRegistration(); } } value="submit" className="row">Submit</button>
                </form>
            </fieldset>
        <p>{notificationInfo}</p>
    </div>);
}