import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import PremiumClubMember from '../src/webPages/private/customer/PremiumClubMember.js';



describe('File: PremiumClubMember.js', function(){
    afterEach(cleanup);
    describe('Component PremiumClubMember', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <PremiumClubMember/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<PremiumClubMember/>)).toMatchSnapshot();
        });


    });
});