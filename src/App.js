import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './scss/styleImporter.scss';
import WindowEventManager from './middleware/WindowEventsManager';

import RouteConfig from '../configuration/routes/RouteConfig.js';
import Home from './webPages/public/Home.js';
import Register from './webPages/public/Register.js';
import Login from './webPages/public/Login.js';
import Logout from './webPages/public/Logout.js';
import CustomerDashboard from './webPages/private/CustomerDashboard';
import CustomerOrders from './webPages/private/CustomerOrders';

import ComponentConfig from '../configuration/components/ComponentConfig';


//Test:DONE
export default function App() {

    //======================================================
    console.log('Home', Home);
    console.log('Register', Register());
    console.log('<Register/>', <Register/>);
    let registerComponent = <Register/>
    let registerName = registerComponent.type.name;
    console.log('componentName-<Register/>-registerName', registerName )

    let loginComponent = <Login/>;
    let loginComponentName = loginComponent.type.name;
    console.log('Login-function-Name', loginComponentName);
    //======================================================

    let linkButton = ComponentConfig._LinkButtonPrivateRedirect;
    let linkButtonName = linkButton.type.name;
    console.log('TEST-linkButtonName:', linkButtonName);

     //======================================================


    WindowEventManager.resolveWindowNavigationEvent();

    return (<div className="app">
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteConfig.home} element={<Home />} />
                <Route exact path={RouteConfig.authRegisterPath} element={<Register/>}/>
                <Route exact path={RouteConfig.authLoginPath} element={<Login/>} />
                <Route exact path={RouteConfig.authLogoutPath} element={<Logout/>} />
                <Route exact path={RouteConfig.privateCustomerDashboard} element={<CustomerDashboard/>} />
                <Route exact path={RouteConfig.privateCustomerOrders} element={<CustomerOrders/>} />
            </Routes>
        </BrowserRouter>

    </div>);
}