import React from 'react';

//Private Webpages Components
//Customer
import CustomerDashboard from "../../src/webPages/private/customer/CustomerDashboard.js";
import CustomerOrders from "../../src/webPages/private/customer/CustomerOrders.js";
import SilverOffers from '../../src/webPages/private/customer/SilverOffers.js';
import GoldOffers from '../../src/webPages/private/customer/GoldOffers.js';
import PremiumOffers from '../../src/webPages/private/customer/PremiumOffers.js';
import PremiumClubMember from '../../src/webPages/private/customer/PremiumClubMember.js';
//Store


//Private Functional Components

import LinkButtonPrivateRedirect from "../../src/components/LinkButtonPrivateRedirect";



const ComponentConfig = Object.freeze({
    _CustomerDashboard: <CustomerDashboard/>,
    _CustomerOrders : <CustomerOrders/>,
    _SilverOffers: <SilverOffers/>,
    _GoldOffers: <GoldOffers/>,
    _PremiumOffers: <PremiumOffers/>,
    _PremiumClubMember: <PremiumClubMember/>,
    _LinkButtonPrivateRedirect : <LinkButtonPrivateRedirect/>

});


export default ComponentConfig;