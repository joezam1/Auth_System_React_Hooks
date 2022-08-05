
let setItemStorage = function (key, value) {
    if(typeof(Storage) !== 'undefined'){
        window.localStorage.setItem(key, value);
    }
}

let getItemStorage = function(key){
    return window.localStorage.getItem(key);
}

let getKeyNameStorage = function(index){
    let keyName = window.localStorage.key(index);
    return keyName;
}

let removeItemStorage = function(key){
    window.localStorage.removeItem(key);
}

let clearAllItemsStorage = function(){
    window.localStorage.clear();
}

const service = {
    setItemStorage: setItemStorage,
    getItemStorage: getItemStorage,
    getKeyNameStorage: getKeyNameStorage,
    removeItemStorage: removeItemStorage,
    clearAllItemsStorage: clearAllItemsStorage
}
export default service;