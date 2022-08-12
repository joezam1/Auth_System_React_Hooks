import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import ButtonPrivateRedirect from "../src/components/ButtonPrivateRedirect";
import SessionValidatorService from "../src/services/privateWebPagesMediator/SessionValidatorService";
import RouteConfig from '../configuration/routes/RouteConfig.js';

jest.mock('../src/services/privateWebPagesMediator/SessionValidatorService.js')


describe('File: ButtonPrivateRedirect.js', function(){
    afterEach(cleanup);
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component: ButtonPrivateRedirect With Props', function(){

        test('It can take a snapshot', function(){
            let container1 = render( <MemoryRouter> <ButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test" /> </MemoryRouter>);
            expect(container1.asFragment(<ButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test"/>)).toMatchSnapshot();
        });


        test('Button Triggers SessionValidatorService', function(){
            //Arrange
            let container2 = render( <MemoryRouter> <ButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test" /> </MemoryRouter>);
            const button = container2.getByTestId('button-private-redirect-id');
            SessionValidatorService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionValidatorService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(1);
        });
    });

    describe('Component: ButtonPrivateRedirect Without Props', function(){

        test('It can take a snapshot', function(){
            let container3 = render( <MemoryRouter> <ButtonPrivateRedirect /> </MemoryRouter>);
            expect(container3.asFragment(<ButtonPrivateRedirect/>)).toMatchSnapshot();
        });

        test('Button Triggers SessionValidatorService', function(){
            //Arrange
            let container4 = render( <MemoryRouter> <ButtonPrivateRedirect /> </MemoryRouter>);
             const button = container4.getByTestId('button-private-redirect-id');
            SessionValidatorService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionValidatorService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(0);
        });
    });
});
