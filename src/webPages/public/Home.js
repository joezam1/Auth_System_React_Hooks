import React, {useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import LocalStorageService from '../../services/localStorage/LocalStorageService.js';
import CookieProperty from '../../library/stringLiterals/CookieProperty.js';
import CookieService from '../../services/cookieStorage/CookieService.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';
import LinkButtonPrivateRedirect from '../../components/LinkButtonPrivateRedirect.js';


//Test: DONE
export default function Home(){
    const [userIsLoggedIn, setUserLogedIn] = useState(false);

    useEffect(()=>{
        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME );
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);
        if( InputCommonInspector.stringIsValid(cookieValue)){
            setUserLogedIn(true);
        }
    }, []);

    let privateComponent =  userIsLoggedIn ? <li> <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText=" Go to Customer " />  </li>  : '';

  return(
      <div className="home">
          This is home Section - Public Page
          <ul>
              {privateComponent}
              <li> <Link to={RouteConfig.authRegisterPath} data-testid="link-home-register-id">Register</Link></li>
              <li> <Link to={RouteConfig.authLoginPath} data-testid="link-home-login-id"> Login</Link></li>
          </ul>
      </div>
  );
}