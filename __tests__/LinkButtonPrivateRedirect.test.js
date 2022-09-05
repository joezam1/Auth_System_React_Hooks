import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import LinkButtonPrivateRedirect from '../src/components/LinkButtonPrivateRedirect.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import SessionAuthenticationService from '../src/services/privateWebPagesMediator/SessionAuthenticationService'

jest.mock('../src/services/privateWebPagesMediator/SessionAuthenticationService.js');


describe('File: LinkButtonPrivateRedirect.js', function(){
    afterEach(cleanup);
    beforeEach(()=>{
        jest.resetAllMocks();
    });
    afterAll(()=>{jest.resetAllMocks(); });

    describe('Component LinkButtonPrivateRedirect', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <LinkButtonPrivateRedirect/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<LinkButtonPrivateRedirect/>)).toMatchSnapshot();
        });



    });


    describe('Component: LinkButtonPrivateRedirect With Props', function(){

        test('It can take a snapshot', function(){
            let container1 = render( <MemoryRouter> <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText="test" /> </MemoryRouter>);
            expect(container1.asFragment(<LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText="test"/>)).toMatchSnapshot();
        });


        test('Button Triggers SessionAuthenticationService', function(){
            //Arrange
            let container2 = render( <MemoryRouter> <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText="test" /> </MemoryRouter>);
            const button = container2.getByTestId('button-private-redirect-id');
            SessionAuthenticationService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionAuthenticationService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(1);
        });
    });

    describe('Component: LinkButtonPrivateRedirect Without Props', function(){

        test('It can take a snapshot', function(){
            let container3 = render( <MemoryRouter> <LinkButtonPrivateRedirect /> </MemoryRouter>);
            expect(container3.asFragment(<LinkButtonPrivateRedirect/>)).toMatchSnapshot();
        });

        test('ON CLICK Button DOES NOT Trigger SessionAuthenticationService', function(){
            //Arrange
            let container4 = render( <MemoryRouter> <LinkButtonPrivateRedirect /> </MemoryRouter>);
             const button = container4.getByTestId('button-private-redirect-id');
             SessionAuthenticationService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            fireEvent.click(button);
            //Assert
            expect( SessionAuthenticationService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(0);
        });

    });
});