import InputTypeInspector from '../validators/InputTypeInspector.js';
import LocalStorageHelper from './LocalStorageHelper.js';

const LocalStorageService = (function(){

    //Test: DONE
    const setItemInLocalStorage = function(key, value){
        if (InputTypeInspector.isTypeString(key) && (value)) {
            LocalStorageHelper.setItemStorage(key, value);
            return 'OK';
        }
        return null;
    }
    //Test: DONE
    const getItemFromLocalStorage = function(key){
        if (InputTypeInspector.isTypeString(key) ) {
            let result = LocalStorageHelper.getItemStorage (key);
            return result;
        }
        return null;
    }
    //Test: DONE
    const removeItemFromLocalStorage = function(key ){
        if (InputTypeInspector.isTypeString(key) ) {
            let result = LocalStorageHelper.removeItemStorage (key);
            return result;
        }
        return null;
    }
    //Test: DONE
    const clearAllItemsFromLocalStorage = function(){
        LocalStorageHelper.clearAllItemsStorage();
    }
    //Test: DONE
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