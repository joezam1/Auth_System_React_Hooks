import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestMethods from '../src/services/httpProtocol/RequestMethods.js';
import { fetchMethod } from '../src/services/httpProtocol/HttpRequests.js';



jest.mock('../src/services/httpProtocol/HttpRequests.js', () => ({
    fetchMethod: jest.fn()
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('File: RequestMethods.js', function () {
    afterEach(cleanup);
    //NOTE: Test that JEST is working correctly
    //test('True is True', function () { expect(true).toBe(true); });

    describe('Function: getMethod with Mock', function () {
        test('getMethod calls fetchMethod once', function () {

            //Arrange
            let url = 'http://localhost';

            fetchMethod.mockImplementation((url, options, responseCallback) => {
                var response = { status: 200, statusText: 'OK' }
                responseCallback(response);
            })
            function responseGetCallback(response) {
                expect(response.status).toEqual(200);
            }
            //Act
            RequestMethods.getMethod(url, responseGetCallback, null);
            //Assert
            expect(fetchMethod).toHaveBeenCalledTimes(1);
        });
    });

    describe('Function: postMethod', function () {
        test('postMethod Calls FetchMethod only once', function () {
            //Arrange
            let url = 'http://localhost';
            let payloadModel = {
                firstName: 'Thomas',
                lastName: 'Jones'
            }

            fetchMethod.mockImplementation((url, options, responseCallback) => {
                var response = { status: 200, statusText: 'OK' }
                responseCallback(response);
            })

            function responsePostCallback(response) {
                expect(response.status).toEqual(200);
            }
            //Act
            RequestMethods.postMethod(url, payloadModel, responsePostCallback, null);

            //Assert
            expect(fetchMethod).toHaveBeenCalledTimes(1);
        });
    })
});