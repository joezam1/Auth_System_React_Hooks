import JwtUpdateInspector from "../src/middleware/JwtUpdateInspector";
import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';
import WebWorkerManager from '../src/backgroundWorkers/WebWorkerManager.js';
import JwtConfig from '../configuration/authorization/JwtConfig.js';

jest.useFakeTimers();
jest.spyOn(global,'setInterval');

jest.mock('../src/services/validators/InputCommonInspector.js');
jest.mock('../src/backgroundWorkers/WebWorkerManager.js');


describe('File: JwtUpdateInspector.js', function(){
    describe('Function: resolveUpdateExpiringJwtToken', function(){
        test('CAN resolve Update Expiring Jwt Token', function(){
            //Arrange
            InputCommonInspector.inputExist = jest.fn().mockReturnValueOnce(true);
            WebWorkerManager.startNewWorker = jest.fn();
            WebWorkerManager.sendMessageToWorker = jest.fn();
            WebWorkerManager.terminateActiveWorker = jest.fn();
            //Act
            let mockWebWorker = {};
            let result = JwtUpdateInspector.resolveUpdateExpiringJwtToken(mockWebWorker);
            //Assert
            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), JwtConfig.JWT_REFRESH_TOKEN_UPDATE_FREQUENCY_IN_MILLISECONDS);

        });
    });
});