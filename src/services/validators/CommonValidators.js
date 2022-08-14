'use strict'
import JsDataType from '../../library/stringLiterals/JsDataType.js';


//Test:DONE
var isValidJson = function(input){
    if(typeof input !== JsDataType.STRING)
    {
        return false;
    }
    try{
        JSON.parse(input);
    }
    catch(error){
        return false;
    }
    return true;
}

var service = Object.freeze({
    isValidJson:isValidJson
});

export default service;