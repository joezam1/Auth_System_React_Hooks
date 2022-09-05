import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RouteConfig from '../configuration/routes/RouteConfig.js';

import CustomerOrders from '../src/webPages/private/customer/CustomerOrders.js';


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
    });
});