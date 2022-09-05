import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import RouteConfig from '../../../../configuration/routes/RouteConfig.js'
import LinkButtonPrivateRedirect from '../../../components/LinkButtonPrivateRedirect.js'

//Test: DONE
export default function CustomerDashboard(){

    useEffect(()=>{

    }, []);


    return(
        <div className="section-Customer-dashboard">
            Customer Dashboard works ok!
            <br/>
            <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerOrdersPath} buttonText=" Go to Orders " />
            <br/>
            <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerSilverOffersPath} buttonText=" Go to Silver  Offers " />

            <br/>
            <Link to={RouteConfig.authLogoutPath}>Logout</Link>
        </div>
    )
}