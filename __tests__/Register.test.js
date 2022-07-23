import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Register from '../src/webPages/public/Register.js';


xdescribe('File: Register', function(){
    afterEach(cleanup);

    let container;
    beforeEach(()=>{
        container = render( <MemoryRouter> <Register/> </MemoryRouter>);
    });
    describe('Component Register', function(){
        test('It can take a snapshot', function(){
            expect(container.asFragment(<Register/>)).toMatchSnapshot();
        });

        test('Home Link Redirects Correctly', function(){
            const link = container.getByText( 'Home' );
            const link1 = container.getByRole('link');
            fireEvent.click(link);
            var initialPath = window.location.pathname;
            var pathname = link.pathname;
            expect(pathname).toBe('/');
            expect(link).toBe(link1);
    });
    });
});