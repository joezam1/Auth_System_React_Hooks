import DataTypes from '../../library/stringLiterals/JsDataTypes.js';
import InputValidationSuffixes from '../../library/stringLiterals/InputValidationSuffixes.js';

//Test: DONE
let stringIsNullOrEmpty = function(input){
    let isValidType = (typeof input === DataTypes.STRING || typeof input === DataTypes.OBJECT);
    let isValidValue = (input === null || (input !==null && input.length === 0));

    if( (isValidType && isValidValue)){
        return true;
    }
    return false;
}
//Test:DONE
let objectIsNullOrEmpty = function(obj){
    let isObject = ((typeof obj === DataTypes.OBJECT ) && !Array.isArray(obj) && typeof obj !== undefined && obj !== null );
    let isEmptyObj = ( isObject && Object.keys(obj).length === 0 );
    let isNullObj = ( obj === null)
    let result =  (isObject && (isEmptyObj || isNullObj))
    return result;
}

//Test: DONE
let errorKeyAndTargetKeyAreEqual = function(errorKey, targetKey){
    let selectedErrorKey = errorKey;
    let clearedErrorKey = selectedErrorKey.replace(InputValidationSuffixes.REQUIRED,'')
                                          .replace(InputValidationSuffixes.INVALID,'')
                                          .replace(InputValidationSuffixes.DATATYPE,'');
    let errorKeyLowerCase = clearedErrorKey.toLowerCase();
    let targetObjKeyLowerCase = targetKey.toLowerCase();
    let areEqual = (errorKeyLowerCase === (targetObjKeyLowerCase));
    return areEqual;
}

let inputCommonInspectorService = {
    stringIsNullOrEmpty : stringIsNullOrEmpty,
    objectIsNullOrEmpty : objectIsNullOrEmpty,
    errorKeyAndTargetKeyAreEqual : errorKeyAndTargetKeyAreEqual
}

export default inputCommonInspectorService