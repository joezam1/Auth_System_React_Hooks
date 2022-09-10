import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import GoldOffers from '../src/webPages/private/customer/GoldOffers.js';



describe('File: GoldOffers.js', function(){
    afterEach(cleanup);
    describe('Component GoldOffers', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <GoldOffers/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<GoldOffers/>)).toMatchSnapshot();
        });


    });
});