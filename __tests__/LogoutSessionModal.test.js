import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import LogoutSessionModal from "../src/components/modals/LogoutSessionModal.js";


describe('File: LogoutSessionModal.js', function(){
    afterEach(cleanup);
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component: LogoutSessionModal', function(){

        test('It can take a snapshot', function(){
            let container = render( <MemoryRouter> <LogoutSessionModal /> </MemoryRouter>);
            expect(container.asFragment(<LogoutSessionModal/> )).toMatchSnapshot();
        });
    });
});
