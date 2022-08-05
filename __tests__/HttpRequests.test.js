import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchMethod } from '../src/services/httpProtocol/HttpRequests.js';

jest.mock('../src/services/httpProtocol/HttpRequests.js', ()=>({
    fetchMethod:jest.fn()
}));


afterEach(()=>{
    jest.clearAllMocks();
});


describe('File: HttpRequests',function(){
    afterEach(cleanup);
    describe('Function: fetchMedhod',function(){

        test('fetchMethod has been called',
            function(){
                //Arrange
                fetchMethod.mockImplementation((url, options, responseCallback) =>{
                    var response ={status:200, statusText:'OK'}
                    responseCallback(response);
                })
                let url = 'http://localhost';
                let options = {};
                let responseCallback = function(response){
                    expect(response.status).toEqual(200);
                }

                //Act
                fetchMethod(url, options, responseCallback);

                expect(fetchMethod).toHaveBeenCalledTimes(1);
            });
    });
});
