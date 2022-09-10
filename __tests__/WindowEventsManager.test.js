import { cleanup } from '@testing-library/react';
import WindowEventManager from "../src/middleware/WindowEventsManager.js";
import LocalStorageService from "../src/services/localStorage/LocalStorageService.js";
import SessionUpdateInspector from "../src/middleware/SessionUpdateInspector.js";


jest.mock('../src/services/localStorage/LocalStorageService.js');
jest.mock('../src/middleware/SessionUpdateInspector.js');


describe('File: WindowEventsManager.js', function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });
    afterEach(cleanup);
    describe('Function: resolveWindowNavigationEvent', function(){

        test('When the IntervalId is type STRING the functions are executed', function(){
            //Arrange
            delete global.window.performance;
            global.window = Object.create(window);
            global.window.performance = {
                getEntriesByType : function(type){
                    let mockResultObj = {
                        entryType:'navigation'
                    }
                    return [mockResultObj]
                }
            };

            let mockIntervalName = 'test';
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce( mockIntervalName );
            LocalStorageService.removeItemFromLocalStorage = jest.fn();
            SessionUpdateInspector.resolveUpdateExpiringSession = jest.fn();
            //Act
            WindowEventManager.resolveWindowNavigationEvent();
            //Assert
            expect( LocalStorageService.getItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( LocalStorageService.removeItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( SessionUpdateInspector.resolveUpdateExpiringSession ).toHaveBeenCalledTimes(1);

        });

        test('When the IntervalId is type OBJECT the functions are executed', function(){
            //Arrange
            delete global.window.performance;
            global.window = Object.create(window);
            global.window.performance = {
                getEntriesByType : function(type){
                    let mockResultObj = {
                        entryType:'navigation'
                    }
                    return [mockResultObj]
                }
            };

            let mockIntervalName = { name:'test' };
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce( mockIntervalName );
            LocalStorageService.removeItemFromLocalStorage = jest.fn();
            SessionUpdateInspector.resolveUpdateExpiringSession = jest.fn();
            //Act
            WindowEventManager.resolveWindowNavigationEvent();
            //Assert
            expect( LocalStorageService.getItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( LocalStorageService.removeItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( SessionUpdateInspector.resolveUpdateExpiringSession ).toHaveBeenCalledTimes(1);

        });


        test('When the IntervalId is undefined the functions are NOT executed', function(){
            //Arrange
            delete global.window.performance;
            global.window = Object.create(window);
            global.window.performance = {
                getEntriesByType : function(type){
                    let mockResultObj = {
                        entryType:'navigation'
                    }
                    return [mockResultObj]
                }
            };

            let mockIntervalName;
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce( mockIntervalName );
            LocalStorageService.removeItemFromLocalStorage = jest.fn();
            SessionUpdateInspector.resolveUpdateExpiringSession = jest.fn();
            //Act
            WindowEventManager.resolveWindowNavigationEvent();
            //Assert
            expect( LocalStorageService.getItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( LocalStorageService.removeItemFromLocalStorage ).toHaveBeenCalledTimes(0);
            expect( SessionUpdateInspector.resolveUpdateExpiringSession ).toHaveBeenCalledTimes(0);

        });



        test('When the IntervalId is a valid value, the functions are executed', function(){
            //Arrange
            delete global.window.performance;
            global.window = Object.create(window);
            global.window.performance = {
                getEntriesByType : function(type){
                    let mockResultObj = {
                        entryType:'navigation'
                    }
                    return [mockResultObj]
                }
            };

            let mockIntervalName = 'test-id';
            LocalStorageService.getItemFromLocalStorage = jest.fn().mockReturnValueOnce( mockIntervalName );
            LocalStorageService.removeItemFromLocalStorage = jest.fn();
            SessionUpdateInspector.resolveUpdateExpiringSession = jest.fn();
            //Act
            WindowEventManager.resolveWindowNavigationEvent();
            //Assert
            expect( LocalStorageService.getItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( LocalStorageService.removeItemFromLocalStorage ).toHaveBeenCalledTimes(1);
            expect( SessionUpdateInspector.resolveUpdateExpiringSession ).toHaveBeenCalledTimes(1);

        });

    });
})