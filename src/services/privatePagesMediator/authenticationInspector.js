import React from 'react';
import { Navigate } from 'react-router-dom';

import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import cookieService from '../cookieStorage/cookieService.js';

const authenticationInspector = (function(){

    let redirectPrivateWebpagesMediator = function(redirectTo){
        let cookieSession = cookieService.getCookieFromDataStore();
        if(cookieSession !=null){
            return <Navigate to = { redirectTo } />
        }
        return <Navigate to = { RouteConfig.authLogoutPath } />
    }


    return {
        redirectPrivateWebpagesMediator : redirectPrivateWebpagesMediator
    }
})();

export default authenticationInspector;