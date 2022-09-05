import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RouteConfig from '../configuration/routes/RouteConfig.js';

import Login from '../src/webPages/public/Login.js';


describe('File: Login.js', function(){
    afterEach(cleanup);
    describe('Component Login', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <Login/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<Login/>)).toMatchSnapshot();
        });


        test('Home Link Redirects Correctly', function(){
                const link = container.getByText( 'Home' );
                const link1 = container.getByTestId('link-login-home-id');
                fireEvent.click(link);
                var initialPath = window.location.pathname;
                var pathname = link.pathname;
                expect(pathname).toBe(RouteConfig.homePath);
                expect(link).toBe(link1);
        });


        test('Register Link Redirects Correctly', function(){
            const link = container.getByText( 'Register' );
            const link2 = container.getByTestId('link-login-register-id');
            fireEvent.click(link);
            var initialPath = window.location.pathname;
            var pathname = link.pathname;
            expect(pathname).toBe(RouteConfig.authRegisterPath);
            expect(link).toBe(link2);
    });

    });
});