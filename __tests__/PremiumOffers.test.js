import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import PremiumOffers from '../src/webPages/private/customer/PremiumOffers.js';



describe('File: PremiumOffers.js', function(){
    afterEach(cleanup);
    describe('Component PremiumOffers', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <PremiumOffers/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<PremiumOffers/>)).toMatchSnapshot();
        });


    });
});