import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Register from '../src/webPages/public/Register.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import RequestMethodsService from '../src/services/httpProtocol/RequestMethodsService.js';
import ValidationService from '../src/services/validators/ValidationService.js';

jest.mock('../src/services/httpProtocol/RequestMethodsService.js');
jest.mock('../src/services/validators/validationService.js');

describe('File: Register.js', function(){
    afterEach(cleanup);
    afterAll(()=>{
        jest.resetAllMocks();
    });
    let container;
    beforeEach(()=>{
        container = render( <MemoryRouter> <Register/> </MemoryRouter>);
    });
    describe('Component: Register', function(){
        test('It can take a snapshot', function(){
            expect(container.asFragment(<Register/>)).toMatchSnapshot();
        });

        test('Home Link Redirects Correctly', function(){
            const link = container.getByText( 'Home' );
            const link1 = container.getByTestId ('link-register-home-id');
            fireEvent.click(link);
            var initialPath = window.location.pathname;
            var pathname = link.pathname;
            expect(pathname).toBe(RouteConfig.home);
            expect(link).toBe(link1);
        });

        test('Login Link Redirects Correctly', function(){
            const link = container.getByText( 'Login' );
            const link1 = container.getByTestId ('link-register-login-id');
            fireEvent.click(link);
            var initialPath = window.location.pathname;
            var pathname = link.pathname;
            expect(pathname).toBe(RouteConfig.authLoginPath);
            expect(link).toBe(link1);
        });

        test('submit button Triggers form', function(){
            //Arrange
            const submitButton = container.getByTestId('register-customer-form-id');
            const resultMock = 'OK';
            const resultValidationMock = {};
            ValidationService.resolveUserFormValidation = jest.fn().mockReturnValueOnce(resultValidationMock);
            RequestMethodsService.postMethod = jest.fn().mockReturnValueOnce(resultMock);
            //Act

            fireEvent.click(submitButton);
            //Assert
            expect(RequestMethodsService.postMethod).toHaveBeenCalledTimes(1);
            expect(ValidationService.resolveUserFormValidation).toHaveBeenCalledTimes(1);
        });
    });
});