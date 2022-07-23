import React from 'react';
import {Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';

export default function Home(){
  return(
      <div className="home">
          This is home Section - Public Page
          <ul>
              <li> <Link to={RouteConfig.authRegisterPath}>Register</Link></li>
              <li> <Link to={RouteConfig.authLoginPath}> Login</Link></li>
          </ul>
      </div>
  );
}