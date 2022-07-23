import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './scss/styleImporter.scss';

import RouteConfig from '../configuration/routes/RouteConfig.js';
import Home from './webPages/public/Home.js';
import Register from './webPages/public/Register.js';
import Login from './webPages/public/Login.js';

//Test:DONE
export default function App() {
    return (<div className="app">
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteConfig.home} element={<Home />} />
                <Route exact path={RouteConfig.authRegisterPath} element={<Register/>}/>
                <Route exact path={RouteConfig.authLoginPath} element={<Login/>} />
            </Routes>
        </BrowserRouter>

    </div>);
}