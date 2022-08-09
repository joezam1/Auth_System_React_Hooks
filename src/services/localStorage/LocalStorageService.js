import InputTypeInspector from '../validators/InputTypeInspector.js';
import InputCommonInspector from '../validators/InputCommonInspector.js';
import LocalStorageHelper from './LocalStorageHelper.js';

const LocalStorageService = (function(){

    const setItemInLocalStorage = function(key, value){
        if (InputTypeInspector.isTypeString(key) && InputCommonInspector.objectIsValid(value)) {
            LocalStorageHelper.setItemStorage(key, value);
            return 'OK';
        }
        return null;
    }

    const getItemFromLocalStorage = function(key){
        if (InputTypeInspector.isTypeString(key) ) {
            let result = LocalStorageHelper.getItemStorage (key);
            return result;
        }
        return null;
    }

    const removeItemFromLocalStorage = function(key ){
        if (InputTypeInspector.isTypeString(key) ) {
            let result = LocalStorageHelper.removeItemStorage (key);
            return result;
        }
        return null;
    }

    const clearAllItemsFromLocalStorage = function(){
        LocalStorageHelper.clearAllItemsStorage();
    }

    const getItemKeyFromLocalStorage = function(index){
        let result = LocalStorageHelper.getKeyNameStorage(index);
        return result;
    }


    return Object.freeze({
        setItemInLocalStorage : setItemInLocalStorage,
        getItemFromLocalStorage : getItemFromLocalStorage,
        getItemKeyFromLocalStorage : getItemKeyFromLocalStorage,
        removeItemFromLocalStorage : removeItemFromLocalStorage,
        clearAllItemsFromLocalStorage : clearAllItemsFromLocalStorage
    });
})();

export default LocalStorageService;