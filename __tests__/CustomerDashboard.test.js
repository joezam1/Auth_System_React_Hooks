import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RouteConfig from '../configuration/routes/RouteConfig.js';

import CustomerDashboard from '../src/webPages/private/CustomerDashboard.js';


describe('File: CustomerDashboard.js', function(){
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Component CustomerDashboard', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <CustomerDashboard/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<CustomerDashboard/>)).toMatchSnapshot();
        });


        test('Logout Link Redirects Correctly', function(){
                const link = container.getByText( 'Logout' );
                const link3 = container.getByRole('link');
                fireEvent.click(link);
                var initialPath = window.location.pathname;
                var pathname = link.pathname;
                expect(pathname).toBe(RouteConfig.authLogoutPath);
                expect(link).toBe(link3);
        });

    });
});