import LocalStorageServide from '../src/services/localStorage/LocalStorageHelper.js';
import LocalStorageHelper from '../src/services/localStorage/LocalStorageHelper.js';
import LocalStorageService from '../src/services/localStorage/LocalStorageService.js';

jest.mock('../src/services/localStorage/LocalStorageHelper.js');

describe('File: LocalStorageService', function(){

    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Function: setItemInLocalStorage', function(){
        test('Item can be added to the local storage db in the browser successfully', function(){
            //Arrange

            LocalStorageHelper.setItemStorage = jest.fn();
            let key = 'item-test';
            let value = 'item-value';
            //Act
            let result = LocalStorageService.setItemInLocalStorage(key, value);

            //Assert
            expect(result).toBe('OK');
            expect(LocalStorageHelper.setItemStorage).toHaveBeenCalledTimes(1);
        });

        test('When Item is NULL it is not added to the local storage db', function(){
            //Arrange

            LocalStorageHelper.setItemStorage = jest.fn();
            let key = 'item-test';
            let value = null;
            //Act
            let result = LocalStorageService.setItemInLocalStorage(key, value);

            //Assert
            expect(result).toEqual(null);
            expect(LocalStorageHelper.setItemStorage).toHaveBeenCalledTimes(0);
        });

    });

    describe('Function: getItemFromLocalStorage',function(){

        test('When Item Is type STRING it can be retrieved from the local storage db in the browser successfully', function(){
            //Arrange

            let returnedValue = 'item-stored';
            LocalStorageHelper.getItemStorage = jest.fn().mockReturnValueOnce(returnedValue);
            let key = 'item-test';
            let value = 'item-value';
            //Act
            let result = LocalStorageService.getItemFromLocalStorage(key, value);

            //Assert
            expect(result).toBe(returnedValue);
            expect(LocalStorageHelper.getItemStorage).toHaveBeenCalledTimes(1);
        });

        test('When Item Is type OBJECT it doesnt retrieve any value from the local storage db', function(){
            //Arrange

            let returnedValue = 'item-stored';
            LocalStorageHelper.getItemStorage = jest.fn().mockReturnValueOnce(returnedValue);
            let key = {};
            //Act
            let result = LocalStorageService.getItemFromLocalStorage(key);

            //Assert
            expect(result).toEqual(null);
            expect(LocalStorageHelper.getItemStorage).toHaveBeenCalledTimes(0);
        });
    });

    describe('Function: removeItemFromLocalStorage',function(){

        test('When key is type STRING the item is removed successfully', function(){
            //Arrange

            LocalStorageHelper.removeItemStorage = jest.fn();
            let key = 'item-test';
            //Act
            let result = LocalStorageService.removeItemFromLocalStorage(key);

            //Assert
            expect(result).toBe(undefined);
            expect(LocalStorageHelper.removeItemStorage).toHaveBeenCalledTimes(1);

        });

        test('When key is type OBJECT, NO item is removed from the local storage DB', function(){
            //Arrange

            LocalStorageHelper.removeItemStorage = jest.fn();
            let key = {val:'item-test'};
            //Act
            let result = LocalStorageService.removeItemFromLocalStorage(key);

            //Assert
            expect(result).toEqual(null);
            expect(LocalStorageHelper.removeItemStorage).toHaveBeenCalledTimes(0);

        });
    });

    describe('function: clearAllItemsFromLocalStorage',function(){

        test('When the function is called all items are removed from the local storage DB', function(){
            //Arrange
            LocalStorageHelper.clearAllItemsStorage = jest.fn();
            //Act
            LocalStorageService.clearAllItemsFromLocalStorage();
            //Assert
            expect(LocalStorageHelper.clearAllItemsStorage).toHaveBeenCalledTimes(1);

        });
    });

    describe('Function: getItemKeyFromLocalStorage', function(){
        test('When function is called the item is returned from Local Storage db', function(){

            //Arrange
            let index = 'test';
            let returnedValue = '123456789';
            LocalStorageHelper.getKeyNameStorage = jest.fn().mockReturnValueOnce(returnedValue);
            //Act
            let result = LocalStorageService.getItemKeyFromLocalStorage(index);
            //Assert
            expect(result).toEqual(returnedValue);
            expect(LocalStorageHelper.getKeyNameStorage).toHaveBeenCalledTimes(1);
        });
    });
});
