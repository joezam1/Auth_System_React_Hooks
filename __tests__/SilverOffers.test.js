import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import SilverOffers from '../src/webPages/private/customer/Silveroffers.js';


describe('File: SilverOffers.js', function(){
    afterEach(cleanup);
    describe('Component SilverOffers', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <SilverOffers/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<SilverOffers/>)).toMatchSnapshot();
        });


    });
});