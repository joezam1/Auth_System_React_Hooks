import JwtUpdateInspectorHelper from "../src/middleware/JwtUpdateInspectorHelper.js";
import JwtTokenService from '../src/services/authorization/JwtTokenService.js';


jest.mock('../src/services/authorization/JwtTokenService.js');


describe('File: JwtUpdateInspectorTest.js', function(){
    describe('Function: resolveJwtUpdate', function(){
        test('CAN resolve Jwt Token Update ', function(){
            //Arrange
            let mockRefreshToken = 'abc';
            JwtTokenService.getTokenFromLocalStorage = jest.fn().mockReturnValueOnce(mockRefreshToken);
            JwtTokenService.deleteTokenFromLocalStorage = jest.fn();
            JwtTokenService.saveTokenToLocalStorage = jest.fn();

            //Act
            let mockJwtoInfo = {
                jwtAccessToken:{
                    fieldValue: 'xyz'
                },
                jwtRefreshToken:{
                    fieldValue:'abc12'
                }
            };
            let result = JwtUpdateInspectorHelper.resolveJwtUpdate(mockJwtoInfo) ;
            //Assert
            expect(JwtTokenService.getTokenFromLocalStorage).toHaveBeenCalledTimes(1);
            expect(JwtTokenService.deleteTokenFromLocalStorage).toHaveBeenCalledTimes(2);
            expect(JwtTokenService.saveTokenToLocalStorage).toHaveBeenCalledTimes(2);

        });
    });
});