import IdleSessionInspector from "../src/middleware/IdleSessionInspector.js";
import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';
import SessionConfig from '../configuration/authentication/SessionConfig.js';

jest.mock('../src/services/validators/InputCommonInspector.js');
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');


describe('File: IdleSessionInspector.js', function(){

    afterAll(()=>{
        jest.clearAllMocks();
    });

    describe( 'Function: scanIdleBroweserTime', function(){
        test('CAN call function setInterval',function(){
            //Arrange
            InputCommonInspector.stringIsValid = jest.fn().mockReturnValueOnce(true);
            //Act
            let result = IdleSessionInspector.scanIdleBrowserTime();
            //Assert
            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), SessionConfig.ONE_SECOND_IN_MILLISECONDS);
        });
    });
});
