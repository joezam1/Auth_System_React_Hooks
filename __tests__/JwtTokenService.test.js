import JwtTokenService from '../src/services/authorization/JwtTokenService.js';
//import helpers from '../src/library/common/Helpers.js';
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import TokenType from '../src/library/enumerations/TokenType.js';

jest.mock('../src/services/localStorage/LocalStorageService.js');


describe('File JwtTokenService.js', function(){
    describe('Function: getPayloadFromDecodedJWT', function(){
        test('CAN get Payload From Decoded JWT', function(){
            //Arrange
            let encodedToken = 'eyJhbGciOiJIUzI1NiJ9.VTJGc2RHVmtYMThOVXByMmhaa24vcTZSa2RIQ1MxL0VYUHNUdGY1a3pBc29wQXBQTnMydmU4WlQ1UHZnUERuV2I2K1R5VjRid0hGR2lCOGlkZkROZzA1cTlCVCs5a0hwbHZWcVlTMFFFMUN6aWtPYXZBanRLME9pdnNEdGM0M0ZyWjh5ZGE3a29oMWpmYkNDZlNPWEI5UzdDMWlZeHlPNVR0RzJia3JrQ3drb005aXJ1NVhhNWtLa0E5MDRqRFlzM2xrU0t4NlFhUTQvbWRDNnJMTXNXUVYvV1Q5bVZNdEtMdXE0c1dZbTk4TT0.OeV1Ab7qwauXBG1PDy8erHDxEHGOTtbZxFeW86p23xQ';

            //Act
            let resultPayload = JwtTokenService.getPayloadFromDecodedJWT(encodedToken);
            //Assert
            expect(resultPayload).not.toEqual(null);
        });
    });

    describe('Function: isJwtExpired', function(){
        test('When token UTCDate Expired is in the FUTURE the function returns FALSE', function(){

            //Arrange
            let localeDateNow = new Date();
            let localeDateTomorrowTime = localeDateNow.setDate(localeDateNow.getDate() + 1);

            let localeDateTomorrow = new Date(localeDateTomorrowTime);
            //Act

            let resultTest = JwtTokenService.isJwtExpired (localeDateTomorrow);
            //Assert
            expect(resultTest).toEqual(false);
        });

        test('When token UTCDate Expired is in the PAST the function returns TRUE', function(){

            //Arrange

            let localeDateNow = new Date();
            let localeDateYesterdayTime = localeDateNow.setDate(localeDateNow.getDate() - 1);

            let localeDateYesterday = new Date(localeDateYesterdayTime);
            //Act

            let resultTest = JwtTokenService.isJwtExpired(localeDateYesterday);
            //Assert
            expect(resultTest).toEqual(true);
        });
    });


    describe('Function: decryptEncryptedJwtPayload', function(){
        test('CAN decrypt an Encrypted Jwt Payload', function(){
            //Arrange
            let fingerprint = '336e38a5-778b-494a-9965-f818f35bac23';
            let encodedToken = 'eyJhbGciOiJIUzI1NiJ9.VTJGc2RHVmtYMThOVXByMmhaa24vcTZSa2RIQ1MxL0VYUHNUdGY1a3pBc29wQXBQTnMydmU4WlQ1UHZnUERuV2I2K1R5VjRid0hGR2lCOGlkZkROZzA1cTlCVCs5a0hwbHZWcVlTMFFFMUN6aWtPYXZBanRLME9pdnNEdGM0M0ZyWjh5ZGE3a29oMWpmYkNDZlNPWEI5UzdDMWlZeHlPNVR0RzJia3JrQ3drb005aXJ1NVhhNWtLa0E5MDRqRFlzM2xrU0t4NlFhUTQvbWRDNnJMTXNXUVYvV1Q5bVZNdEtMdXE0c1dZbTk4TT0.OeV1Ab7qwauXBG1PDy8erHDxEHGOTtbZxFeW86p23xQ';
            //let resultEncryptedPayload = JwtTokenService.getPayloadFromDecodedJWT(encodedToken);
            //Act
            let decryptedPayload = JwtTokenService.decryptEncryptedJwtPayload(encodedToken);
            let decryptedPayloadFingerprint = decryptedPayload.sessionFingerprint;
            //Assert
            expect(decryptedPayload).not.toEqual(null);
            expect(decryptedPayloadFingerprint).toEqual(fingerprint);
        });
    });

    describe('Function: saveTokenToLocalStorage', function(){
        test('CAN save Token To LocalStorage', function(){

            //Arrange

            LocalStorageService.setItemInLocalStorage = jest.fn();
            let accessToken = 'abc';
            //Act
            let result = JwtTokenService.saveTokenToLocalStorage(TokenType.jwtAccessToken, accessToken);
            //Assert
            expect(LocalStorageService.setItemInLocalStorage).toHaveBeenCalledTimes(1);
        });
    });


    describe('Function: getTokenFromLocalStorage', function(){
        test('CAN get Token From LocalStorage', function(){

            //Arrange

            LocalStorageService.getItemFromLocalStorage = jest.fn();

            //Act
            let result = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtAccessToken);
            //Assert
            expect(LocalStorageService.getItemFromLocalStorage).toHaveBeenCalledTimes(1);
        });
    });


    describe('Function: deleteTokenFromLocalStorage', function(){
        test('CAN delete Token From LocalStorage', function(){

            //Arrange

            LocalStorageService.removeItemFromLocalStorage = jest.fn();

            //Act
            let result = JwtTokenService.deleteTokenFromLocalStorage(TokenType.jwtAccessToken);
            //Assert
            expect(LocalStorageService.removeItemFromLocalStorage).toHaveBeenCalledTimes(1);
        });
    });


});
