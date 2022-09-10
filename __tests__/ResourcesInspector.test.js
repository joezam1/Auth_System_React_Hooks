import ResourcesInspector from "../src/middleware/ResourcesInspector";
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';
import ResourcesWebWorkerManager from '../src/backgroundWorkers/ResourcesWebWorkerManager.js';

jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/backgroundWorkers/ResourcesWebWorkerManager.js');



describe('File ResourcesInspector.js', function(){
    beforeEach(()=>{
        jest.resetAllMocks();
    });
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: resolveLoadResources', function(){
        test('CAN resolve Loading Resources', function(){
            //Arrange
            LocalStorageService.removeItemFromLocalStorage = jest.fn();
            ResourcesWebWorkerManager.createNewWorker = jest.fn();
            ResourcesWebWorkerManager.sendMessageToWorker = jest.fn();
            //Act
            ResourcesInspector.resolveLoadResources();
            //Assert
            expect(LocalStorageService.removeItemFromLocalStorage).toHaveBeenCalledTimes(1);
            expect(ResourcesWebWorkerManager.createNewWorker).toHaveBeenCalledTimes(1);
            expect(ResourcesWebWorkerManager.sendMessageToWorker ).toHaveBeenCalledTimes(1);

        })
    });
});
