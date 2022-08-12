'use strict'
import DataTypes from '../../library/stringLiterals/JsDataTypes.js';


//Test:DONE
var isValidJson = function(input){
    if(typeof input !== DataTypes.STRING)
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