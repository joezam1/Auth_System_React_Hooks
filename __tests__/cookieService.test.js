import cookieService from '../src/services/cookieStorage/cookieService.js';

describe('File: cookieService.js',function(){
    describe('Function: insertCookieInDataStore', function(){

        test('When we provide the correct values, the information is stored as cookie', function(){
            debugger;
            //Arrange
            let cookie = {
                name: 'test',
                value:'123',
                properties:{
                    path:'/',
                    maxAge:900000
                }
            }
            //Act
            let result = cookieService.insertCookieInDataStore(cookie.name,cookie.value,cookie.properties);
            //Assert
            expect(result).toEqual('OK');
        })
    });
});