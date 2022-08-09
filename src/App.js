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

//Test:DONE
export default function App() {

    WindowEventManager.resolveWindowNavigationEvent();
/*if (window.performance) {
    console.log('FILE: APP.js');
    console.log('window.performance.performance.navigationTiming', window.PerformanceNavigationTiming)
    const allEntries = performance.getEntries();
    console.log('allEntries', allEntries);

    const entriesA = performance.getEntriesByType("navigation");
    console.log('navigation-entries', entriesA);
    console.log('navigation-entry-type', entriesA[0].entryType);

    if(entriesA[0].entryType === 'navigation'){
        console.log('navigation-EVENT-LOADED');
    }
    const entriesB = performance.getEntriesByType("resource");
    console.log('navigation-entry-type', entriesB[0].entryType);


    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info( "Reload detected" );
    } else {
      console.info( "Reload not detected");
    }
  } else {
    console.info("window.performance is not supported");
  }
*/
    return (<div className="app">
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteConfig.home} element={<Home />} />
                <Route exact path={RouteConfig.authRegisterPath} element={<Register/>}/>
                <Route exact path={RouteConfig.authLoginPath} element={<Login/>} />
                <Route exact path={RouteConfig.authLogoutPath} element={<Logout/>} />
                <Route exact path={RouteConfig.privateCustomerDashboard} element={<CustomerDashboard/>} />
            </Routes>
        </BrowserRouter>

    </div>);
}