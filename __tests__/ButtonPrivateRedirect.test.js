import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import LinkButtonPrivateRedirect from "../src/components/LinkButtonPrivateRedirect";
import SessionValidatorService from "../src/services/privateWebPagesMediator/SessionValidatorService";
import RouteConfig from '../configuration/routes/RouteConfig.js';

jest.mock('../src/services/privateWebPagesMediator/SessionValidatorService.js')


describe('File: LinkButtonPrivateRedirect.js', function(){
    afterEach(cleanup);
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component: LinkButtonPrivateRedirect With Props', function(){

        test('It can take a snapshot', function(){
            let container1 = render( <MemoryRouter> <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test" /> </MemoryRouter>);
            expect(container1.asFragment(<LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test"/>)).toMatchSnapshot();
        });


        test('Button Triggers SessionValidatorService', function(){
            //Arrange
            let container2 = render( <MemoryRouter> <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboard} buttonText="test" /> </MemoryRouter>);
            const button = container2.getByTestId('button-private-redirect-id');
            SessionValidatorService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionValidatorService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(1);
        });
    });

    describe('Component: LinkButtonPrivateRedirect Without Props', function(){

        test('It can take a snapshot', function(){
            let container3 = render( <MemoryRouter> <LinkButtonPrivateRedirect /> </MemoryRouter>);
            expect(container3.asFragment(<LinkButtonPrivateRedirect/>)).toMatchSnapshot();
        });

        test('Button Triggers SessionValidatorService', function(){
            //Arrange
            let container4 = render( <MemoryRouter> <LinkButtonPrivateRedirect /> </MemoryRouter>);
             const button = container4.getByTestId('button-private-redirect-id');
            SessionValidatorService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionValidatorService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(0);
        });
    });
});
