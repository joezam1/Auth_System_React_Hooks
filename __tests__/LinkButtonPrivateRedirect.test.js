import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import LinkButtonPrivateRedirect from '../src/components/LinkButtonPrivateRedirect.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import InputTypeInspector from '../src/services/validators/InputTypeInspector.js';
import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';
import SessionValidatorService from '../src/services/privateWebPagesMediator/SessionValidatorService.js'


jest.mock('../src/services/validators/InputTypeInspector.js');
jest.mock('../src/services/validators/InputCommonInspector.js');
jest.mock('../src/services/privateWebPagesMediator/SessionValidatorService.js');


describe('File: LinkButtonPrivateRedirect.js', function(){
    afterEach(cleanup);
    describe('Component LinkButtonPrivateRedirect', function(){
        let container;
        beforeEach(()=>{
            container = render( <MemoryRouter> <LinkButtonPrivateRedirect/>  </MemoryRouter>  );
        });

        test('It should take a snapshot', function(){
            expect(container.asFragment(<LinkButtonPrivateRedirect/>)).toMatchSnapshot();
        });


        test('Button Link Redirects Correctly', function(){
            //Arrange
            InputTypeInspector.isTypeString = jest.fn().mockReturnValueOnce(true);
            InputCommonInspector.stringIsValid = jest.fn().mockReturnValueOnce(true);
            SessionValidatorService.redirectPrivateWebpagesMediator = jest.fn();
            //Act
            const button = container.getByTestId('button-private-redirect-id');
            fireEvent.click(button);
            //Assert
            expect(InputTypeInspector.isTypeString ).toHaveBeenCalledTimes(1);
            expect(InputCommonInspector.stringIsValid).toHaveBeenCalledTimes(1);
            expect(SessionValidatorService.redirectPrivateWebpagesMediator).toHaveBeenCalledTimes(1);
        });
    });
});