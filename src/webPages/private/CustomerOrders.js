import React from 'react';
import { Link } from 'react-router-dom';
import RouteConfig from '../../../configuration/routes/RouteConfig.js';


export default function CustomerOrders(){
    return(<div className='customer-orders-section'>

        <span>This is the customer Orders Section.</span>
        <br/>
        <h3>Go To</h3>
               <span><Link to={RouteConfig.home} data-testid="link-customer-order-home-id"> Home </Link></span>
               <br/>
               <span><Link to={RouteConfig.privateCustomerDashboard} data-testid="link-customer-order-dashboard-id">Customer Dashboard</Link></span>
               <br />
    </div>)
}