import IdleSessionInspector from "../src/middleware/IdleSessionInspector.js";


jest.mock('../src/middleware/IdleSessionInspector.js');


describe('File: IdleSessionInspector.js', function(){

    afterAll(()=>{
        jest.clearAllMocks();
    });
    describe('Function: scanIdleBroweserTime', function(){

        test('When the function is called the function setInterval is started', function(){
            //Arrange
            let mockResult = 'ok';
            IdleSessionInspector.scanIdleBrowserTime = jest.fn().mockReturnValueOnce(mockResult);
            //Act
            let result = IdleSessionInspector.scanIdleBrowserTime();
            //Assert
            expect(IdleSessionInspector.scanIdleBrowserTime).toBeCalledTimes(1);
        });
    })
});
