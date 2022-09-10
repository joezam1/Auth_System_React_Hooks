import React, {useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import LocalStorageService from '../../services/localStorage/LocalStorageService.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import CookieService from '../../services/cookieStorage/CookieService.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import LinkButtonPrivateRedirect from '../../components/LinkButtonPrivateRedirect.js';
import ResourcesInspector from '../../middleware/ResourcesInspector.js';


//Test: DONE
export default function Home(){
    const [userIsLoggedIn, setUserLogedIn] = useState(false);

    useEffect(()=>{
        ResourcesInspector.resolveLoadResources();
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME );
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
        if( InputCommonInspector.stringIsValid(cookieValue)){
            setUserLogedIn(true);
        }
    }, []);


  return(
    <div className="home webpage">
        <div className='outerLayout'>
            <div className='header-container'>
                <div className='header-title silverBorder'>
                   <div className='topNavigationBar'>
                    <div className='floatLeft margin10'>HOME</div>
                        <ul className='floatRight'>

                            <li className='inlineBlock btnCreate'> <Link to={RouteConfig.authRegisterPath} data-testid="link-home-register-id" className='noTextDecoration'>Register</Link></li>
                            <li className='inlineBlock btnCreate'> <Link to={RouteConfig.authLoginPath} data-testid="link-home-login-id" className='noTextDecoration'> Login</Link></li>
                        </ul>
                   </div>
                </div>
            </div>
        </div>
    </div>
  );
}