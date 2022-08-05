import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import CookieService from '../../services/cookieStorage/CookieService.js';
import CookieProperties from "../../library/stringLiterals/CookieProperties.js";
import LocalStorageService from "../../services/localStorage/LocalStorageService.js";
import RequestMethods from '../../services/httpProtocol/RequestMethods.js';
import ServerConfig from '../../../configuration/server/ServerConfig.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';
import HttpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import NotificationService from "../../services/notifications/NotificationService.js";
import InputCommonInspector from "../../services/validators/InputCommonInspector.js";

export default function Logout(){

    const [ notificationInfo, setNotification ] = useState('');
    const [ isLoggedOut, setLogoutStatus] = useState(false);

    useEffect(()=>{
        let cookieName =  LocalStorageService.getItemFromLocalStorage(CookieProperties.NAME);
        let cookiePath = LocalStorageService.getItemFromLocalStorage(CookieProperties.PATH);
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
        if( InputCommonInspector.stringIsValid( cookieValue) ){
            let resultCookie = CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName, cookiePath);
            LocalStorageService.removeItemFromLocalStorage(CookieProperties.NAME);
            LocalStorageService.removeItemFromLocalStorage(CookieProperties.PATH);
            let intervalTimerId = LocalStorageService.getItemFromLocalStorage( SessionConfig.SESSION_TIMER_ID );
            clearInterval(intervalTimerId);
            LocalStorageService.removeItemFromLocalStorage(SessionConfig.SESSION_TIMER_ID);
            processUserLogoutSession(cookieValue);
        }
    },[]);

    function logoutUserCallback(response){
        console.log('logoutUserCallback-response:', response);
        switch(response.status){

            case HttpResponseStatus._200ok:
                setNotification(messageLogoutSuccess);
                delayRedirect();
            break;

            case HttpResponseStatus._401unauthorized:
                setNotification(NotificationService.logoutUnauthorized);
                delayRedirect();
            break;

            case HttpResponseStatus._400badRequest:
                let messageLogoutFailed = NotificationService.logoutFailed + response.result;
                setNotification( messageLogoutFailed );
            break;

            default:
                let messageLogoutNonProcessable = NotificationService.logoutNonProcessable + response.result;
                setNotification(messageLogoutNonProcessable);
            break;
        }

    }

    function delayRedirect(){
        setTimeout(function(){ setLogoutStatus(true);
        }, SessionConfig.SESSION_DEFAULT_DELAYS_IN_NOTIFICATIONS);
    }

    function processUserLogoutSession( sessionCookieValue){

        let logoutUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiUserslogoutPathPost;
        let dataModel = {
            session: sessionCookieValue
        }
        let selectedHeaders = {
            x_session_id : sessionCookieValue
        }
        RequestMethods.deleteMethod(logoutUrl, dataModel, logoutUserCallback, selectedHeaders);
    }

    if(isLoggedOut){
        return <Navigate to = {RouteConfig.home} />
    }

    return(<div className="logout-section">
            <p>You are Logged Out</p> <span> | </span><Link to={RouteConfig.home}>Go Home</Link>
            <br/>
            <div> {notificationInfo}</div>
    </div>)
}