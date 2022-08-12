import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RouteConfig from '../configuration/routes/RouteConfig.js';

import CustomerOrders from '../src/webPages/private/CustomerOrders.js';


describe('File: CustomerOrders.js', function(){
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Component CustomerOrders', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <CustomerOrders/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<CustomerOrders/>)).toMatchSnapshot();
        });


        test('Home Link Redirects Correctly', function(){
                const link = container.getByText( 'Home' );
                const link4 = container.getByTestId('link-customer-order-home-id');

                fireEvent.click(link);
                var initialPath = window.location.pathname;
                var pathname = link.pathname;
                expect(pathname).toBe(RouteConfig.home);
                expect(link).toBe(link4);
        });


        test('Customer Dashboard Link Redirects Correctly', function(){
            const link = container.getByText( 'Customer Dashboard' );
            const link4 = container.getByTestId('link-customer-order-dashboard-id');

            fireEvent.click(link);
            var initialPath = window.location.pathname;
            var pathname = link.pathname;
            expect(pathname).toBe(RouteConfig.privateCustomerDashboard);
            expect(link).toBe(link4);
    });

    });
});