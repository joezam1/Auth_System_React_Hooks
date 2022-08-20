import ModalRenderingService from "../src/services/reactRendering/ModalRenderingService";
import ReactRenderer from '../src/services/reactRendering/ReactRenderer.js';
import ModalWindowName from '../src/library/enumerations/ModalWindowName.js'

jest.mock('../src/services/reactRendering/ReactRenderer.js');


describe('File: ModalRenderingService.js', function(){
    afterAll(()=>{
        jest.resetAllMocks();
    })
    describe('Function: startRendering', function(){
        test('When the function is called React STARTS rendering the component', function(){
            //Arrange
            let isMounted = true;
            ReactRenderer.componentIsMounted = jest.fn().mockReturnValueOnce(isMounted);
            ReactRenderer.startRendering = jest.fn();
            //Act
            ModalRenderingService.startRendering(ModalWindowName.idleSession);
            //Assert
            expect(ReactRenderer.componentIsMounted).toHaveBeenCalledTimes(1);
            expect(ReactRenderer.startRendering).toHaveBeenCalledTimes(1);
        })
    });

    describe('Function: stopRendering', function(){
        test('When the function is called React STOPS rendering the component', function(){
            //Arrange
            let isMounted = true;
            ReactRenderer.componentIsMounted = jest.fn().mockReturnValueOnce(isMounted);
            ReactRenderer.stopRenderingUsingSeparateThread = jest.fn();
            //Act
            ModalRenderingService.stopRendering();
            //Assert
            expect(ReactRenderer.componentIsMounted).toHaveBeenCalledTimes(1);
            expect(ReactRenderer.stopRenderingUsingSeparateThread).toHaveBeenCalledTimes(1);
        })
    });

})
