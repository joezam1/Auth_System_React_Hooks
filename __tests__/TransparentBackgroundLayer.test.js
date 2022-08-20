import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import TransparentBackgroundLayer from "../src/components/modals/TransparentBackgroundLayer.js";


describe('File: TransparentBackgroundLayer.js', function(){
    afterEach(cleanup);
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component: TransparentBackgroundLayer', function(){

        test('It can take a snapshot', function(){
            let container1 = render( <MemoryRouter> <TransparentBackgroundLayer /> </MemoryRouter>);
            expect(container1.asFragment(<TransparentBackgroundLayer/> )).toMatchSnapshot();
        });
    });
});
