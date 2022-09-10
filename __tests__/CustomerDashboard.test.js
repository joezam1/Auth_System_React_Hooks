import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RouteConfig from '../configuration/routes/RouteConfig.js';

import CustomerDashboard from '../src/webPages/private/customer/CustomerDashboard.js';
import ComponentAuthorizationService from '../src/services/privateWebPagesMediator/ComponentAuthorizationService.js';
import RolePermission from '../src/library/stringLiterals/RolePermission.js';




jest.mock('../src/services/privateWebPagesMediator/ComponentAuthorizationService.js')

describe('File: CustomerDashboard.js', function(){
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Component CustomerDashboard', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <CustomerDashboard/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<CustomerDashboard/>)).toMatchSnapshot();
        });


        test('Logout Link Redirects Correctly', function(){

            //Arrange
            let mockUserInfo = {
                username:'tom01',
                roles:[9,2],
            }
            ComponentAuthorizationService.getUserInfo = jest.fn().mockReturnValue(mockUserInfo);
            ComponentAuthorizationService.roleIsAuthorized = jest.fn().mockReturnValue(true);
            let mockPermissions = [RolePermission.READ];
            ComponentAuthorizationService.getAllApprovedPermissions = jest.fn().mockReturnValue(mockPermissions);
                const link = container.getByText( 'Logout' );
                const link3 = container.getByRole('link');
                fireEvent.click(link);
                var initialPath = window.location.pathname;
                var pathname = link.pathname;
                expect(pathname).toBe(RouteConfig.authLogoutPath);
                expect(link).toBe(link3);
        });

    });
});