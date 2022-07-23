import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Home from '../src/webPages/public/Home.js';


xdescribe('File: Home.js', function(){
    afterEach(cleanup);
    describe('Component Home', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <Home/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){

            expect(container.asFragment(<Home/>)).toMatchSnapshot();
        });


        test('Register Link Redirects Correctly', function(){
                const link = container.getByText( 'Register' );
                const link1 = container.getByRole('link');
                fireEvent.click(link);
                var initialPath = window.location.pathname;
                var pathname = link.pathname;
                expect(pathname).toBe('/auth/register');
                expect(link).toBe(link1);
        });

    });
});