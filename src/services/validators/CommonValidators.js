'use strict'
import JsDataType from '../../library/stringLiterals/JsDataType.js';


//Test:DONE
const isValidJson = function(input){
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

//Test:DONE
let safeJsonParse = function (input) {
    var value = input;
    if (isValidJson(input)) {
        value = JSON.parse(input);
    }
    return value;
}


const service = Object.freeze({
    isValidJson:isValidJson,
    safeJsonParse : safeJsonParse
});

export default service;