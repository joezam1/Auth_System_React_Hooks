import React from 'react';

import CustomerDashboard from "../../src/webPages/private/CustomerDashboard";
import CustomerOrders from "../../src/webPages/private/CustomerOrders";
import LinkButtonPrivateRedirect from "../../src/components/LinkButtonPrivateRedirect";



const ComponentConfig = Object.freeze({
    _CustomerDashboard: <CustomerDashboard/>,
    _CustomerOrders : <CustomerOrders/>,
    _LinkButtonPrivateRedirect : <LinkButtonPrivateRedirect/>

});


export default ComponentConfig;