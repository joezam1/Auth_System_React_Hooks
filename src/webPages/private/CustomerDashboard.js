import React from 'react';
import { Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';


export default function CustomerDashboard(){

    return(
        <div className="section-Customer-dashboard">
            Customer Dashboard works ok!
            <br/>
            <Link to={RouteConfig.authLogoutPath}>Logout</Link>
        </div>
    )
}