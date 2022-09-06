import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './scss/styleImporter.scss';
import WindowEventManager from './middleware/WindowEventsManager';


//All Routes
import RouteConfig from '../configuration/routes/RouteConfig.js';

//Public WebPage Components
import Home from './webPages/public/Home.js';
import Register from './webPages/public/Register.js';
import Login from './webPages/public/Login.js';
import Logout from './webPages/public/Logout.js';

//Private WebPage Components
//Customer Section
import CustomerDashboard from '../src/webPages/private/customer/CustomerDashboard.js';
import CustomerOrders from '../src/webPages/private/customer/CustomerOrders.js';
import SilverOffers from '../src/webPages/private/customer/SilverOffers.js';
import GoldOffers from './webPages/private/customer/GoldOffers';
import PremiumOffers from './webPages/private/customer/PremiumOffers';
import PremiumClubMember from './webPages/private/customer/PremiumClubMember';
//Test:DONE
export default function App() {

    WindowEventManager.resolveWindowNavigationEvent();

    return (<div className="app">
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteConfig.homePath} element={<Home />} />
                <Route exact path={RouteConfig.authRegisterPath} element={<Register/>}/>
                <Route exact path={RouteConfig.authLoginPath} element={<Login/>} />
                <Route exact path={RouteConfig.authLogoutPath} element={<Logout/>} />

                <Route exact path={RouteConfig.privateCustomerDashboardPath} element={<CustomerDashboard/>} />
                <Route exact path={RouteConfig.privateCustomerOrdersPath} element={<CustomerOrders/>} />
                <Route exact path={RouteConfig.privateCustomerSilverOffersPath} element={<SilverOffers/>} />
                <Route exact path={RouteConfig.privateCustomerGoldOffersPath} element={<GoldOffers/>}/>
                <Route exact path={RouteConfig.privateCustomerPremiumOffersPath} element={<PremiumOffers/>} />
                <Route exact path={RouteConfig.privateCustomerPremiumClubMemberPath} element={<PremiumClubMember/>} />

            </Routes>
        </BrowserRouter>

    </div>);
}