import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import IdleSessionModal from "../src/components/modals/IdleSessionModal.js";


describe('File: IdleSessionModal.js', function(){
    afterEach(cleanup);
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component: IdleSessionModal', function(){

        test('It can take a snapshot', function(){
            let container = render( <MemoryRouter> <IdleSessionModal /> </MemoryRouter>);
            expect(container.asFragment(<IdleSessionModal/> )).toMatchSnapshot();
        });
    });
});
