import React from "react";
import LinkButtonPrivateRedirect from "../../../components/LinkButtonPrivateRedirect";
import RouteConfig from '../../../../configuration/routes/RouteConfig.js';

export default function SilverOffers(){

    return(<div className="customer-silver-offers-section">
        This is the silver offers section
        <br />
        <h3>Go To</h3>

        <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText=" Customer Dashboard " />
        <br />
    </div>)
}