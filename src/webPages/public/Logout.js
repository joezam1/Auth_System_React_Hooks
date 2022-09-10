import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import CookieService from '../../services/cookieStorage/CookieService.js';
import LocalStorageService from "../../services/localStorage/LocalStorageService.js";
import RequestMethodsService from '../../services/httpProtocol/RequestMethodsService.js';
import NotificationService from "../../services/notifications/NotificationService.js";
import InputCommonInspector from "../../services/validators/InputCommonInspector.js";

import ServerConfig from '../../../configuration/server/ServerConfig.js';
import EnvConfig from '../../../configuration/environment/EnvConfig.js';
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';

import HttpResponseStatus from '../../library/enumerations/HttpResponseStatus.js';
import IntervalIdName from "../../library/enumerations/IntervalIdName.js";
import WindowLocationProperty from '../../library/stringLiterals/WindowLocationProperty.js';
import CookieProperty from "../../library/stringLiterals/CookieProperty.js";
import ModalRenderingService from '../../services/reactRendering/ModalRenderingService.js';
import ModalWindowName from '../../library/enumerations/ModalWindowName.js';
import TokenType from "../../library/enumerations/TokenType.js";


//Tet: DONE
export default function Logout(){

    const [ notificationInfo, setNotification ] = useState('');
    const [ isLoggedOut, setLogoutStatus] = useState(false);
    let _countdown = 5;

    useEffect(()=>{
        let cookieName =  LocalStorageService.getItemFromLocalStorage(CookieProperty.NAME);
        let cookiePath =  LocalStorageService.getItemFromLocalStorage(CookieProperty.PATH);
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName , cookiePath);
        let _accessTokenName = TokenType[TokenType.jwtAccessToken];
        let _refreshTokenName = TokenType[TokenType.jwtRefreshToken];
        let _csrfTokenName = TokenType[TokenType.antiforgeryToken];
        let _accessToken = LocalStorageService.getItemFromLocalStorage ( _accessTokenName );
        let _refreshToken =  LocalStorageService.getItemFromLocalStorage( _refreshTokenName );
        let _antiForgeryToken = LocalStorageService.getItemFromLocalStorage( _csrfTokenName );
        if( InputCommonInspector.stringIsValid( cookieValue) ){
            removeAllSessionInformation(cookieName, cookiePath)
            removeAllJwtTokensInformation( _accessTokenName, _refreshTokenName );
            removeAllAntiForgeryTokensInformation( _csrfTokenName );

            processUserLogoutSession(cookieValue , _accessToken , _refreshToken, _antiForgeryToken );
        }
    },[]);

    function logoutUserCallback(response){
        console.log('logoutUserCallback-response:', response);

        ModalRenderingService.startRendering(ModalWindowName.logoutSession);
        switch(response.status){

            case HttpResponseStatus._200ok:
                let success = NotificationService.logoutSuccess + ' in ' + _countdown + ' seconds.';
                setNotification(success );
                delayRedirect();
            break;

            case HttpResponseStatus._401unauthorized:
                setNotification(NotificationService.logoutUnauthorized);
                delayRedirect();
            break;

            case HttpResponseStatus._403forbidden:
                setNotification(NotificationService.logoutForbidden);
                delayRedirect();
            break;

            case HttpResponseStatus._400badRequest:
                setNotification( NotificationService.logoutFailed );
            break;

            default:
                setNotification( NotificationService.logoutNonProcessable);
            break;
        }

    }

    function delayRedirect(){
        console.log('_countdown-BEFORE : ',_countdown);
        let intervalId = setInterval(function(){
        _countdown--;
        console.log('_countdown-AFTER : ',_countdown);
        LocalStorageService.setItemInLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE , _countdown);
            if(_countdown === 0 ){
                setLogoutStatus(true);
                clearInterval(intervalId);
                LocalStorageService.removeItemFromLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE);
            }

        }, SessionConfig.ONE_SECOND_IN_MILLISECONDS);
    }

    function removeAllSessionInformation( cookieName,cookiePath ){
        //Session
        CookieService.deleteCookieFromDataStoreByNameAndPath(cookieName, cookiePath);
        LocalStorageService.removeItemFromLocalStorage(CookieProperty.NAME);
        LocalStorageService.removeItemFromLocalStorage(CookieProperty.PATH);

        let intervalTimerIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId]
        let intervalTimerId = LocalStorageService.getItemFromLocalStorage( intervalTimerIdName );
        clearInterval(intervalTimerId);
        LocalStorageService.removeItemFromLocalStorage( intervalTimerIdName );

        let intervalIdleBrowserIdName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
        let idleIntervalId = LocalStorageService.getItemFromLocalStorage(intervalIdleBrowserIdName);
        clearInterval(idleIntervalId);
        LocalStorageService.removeItemFromLocalStorage( idleIntervalId );

        LocalStorageService.removeItemFromLocalStorage(SessionConfig.IDLE_SESSION_COUNTDOWN_VALUE);
        LocalStorageService.removeItemFromLocalStorage ( WindowLocationProperty.REDIRECT )
    }

    function removeAllJwtTokensInformation( accessTokenName, refreshTokenName){
         //==JWT
         LocalStorageService.removeItemFromLocalStorage ( accessTokenName);
         LocalStorageService.removeItemFromLocalStorage( refreshTokenName);
         let jwtIntervalIdName = IntervalIdName[IntervalIdName.jwtTokenUpdateIntervalId];
         let jwtUpdateIntervalId = LocalStorageService.getItemFromLocalStorage ( jwtIntervalIdName );
         clearInterval(jwtUpdateIntervalId);
         LocalStorageService.removeItemFromLocalStorage(jwtIntervalIdName);
    }

    function removeAllAntiForgeryTokensInformation(antiforgeryTokenName){
        LocalStorageService.removeItemFromLocalStorage( antiforgeryTokenName);
    }
    function processUserLogoutSession( sessionCookieValue , jwtAccessToken , jwtRefreshToken , antiforgeryToken){

        let logoutUrl = EnvConfig.PROTOCOL +'://' + EnvConfig.TARGET_URL + ServerConfig.apiUserslogoutPathPost;
        let dataModel = {
            session: sessionCookieValue,
            userAgent : window.navigator.userAgent
        }
        let selectedHeaders = {
            x_session_id : sessionCookieValue,
            Authorization : 'Bearer '+ jwtAccessToken,
            Refresh_token : jwtRefreshToken,
            x_csrf_token: antiforgeryToken,
        }


        RequestMethodsService.deleteMethod(logoutUrl, dataModel, logoutUserCallback, selectedHeaders);
    }

    if(isLoggedOut){
        ModalRenderingService.stopRendering();
        return <Navigate to = {RouteConfig.homePath} />
    }

    return(<div className="logout-section">
            <p>You are Logged Out <span> | </span><Link to={RouteConfig.homePath}>Go Home</Link> </p>
            <br/>
            <div> {notificationInfo}</div>
    </div>)
}