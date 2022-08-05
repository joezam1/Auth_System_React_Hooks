import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Logout from '../src/webPages/public/Logout.js';

describe('File: Logout.js', function(){
    afterEach(cleanup);
    describe('Function return', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <Logout/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<Logout/>)).toMatchSnapshot();
        });

    });
});