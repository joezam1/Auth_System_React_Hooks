import React from 'react';
import { Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';
import LinkButtonPrivateRedirect from '../../components/LinkButtonPrivateRedirect.js';


//Test: DONE
export default function CustomerDashboard(){

    return(
        <div className="section-Customer-dashboard">
            Customer Dashboard works ok!
            <br/>
            <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerOrders} buttonText=" Go to Orders " />

            <br/>
            <Link to={RouteConfig.authLogoutPath}>Logout</Link>
        </div>
    )
}