import DataTypes from '../../library/stringLiterals/JsDataTypes.js';
import InputValidationSuffixes from '../../library/stringLiterals/InputValidationSuffixes.js';

//Test: DONE
let stringIsNullOrEmpty = function(input){
    if(valueIsUndefined(input)) {
        return false;
    }
    let isValidType = (typeof input === DataTypes.STRING || typeof input === DataTypes.OBJECT);
    let isValidValue = (input === null || (input !==null && input.length === 0));

    if( (isValidType && isValidValue)){
        return true;
    }
    return false;
}
//Test:DONE
// let isObject = ((typeof obj === DataTypes.OBJECT ) && !Array.isArray(obj) && typeof obj !== undefined && obj !== null );
let objectIsNullOrEmpty = function(obj){
    let isObjectType = (typeof obj == DataTypes.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = typeof obj !== 'undefined';

    let isNullValue = ( obj === null)

    let isObject = ( isObjectType && !isArrayType && isNotUndefinedType );
    let isEmptyObj = ( isObject && !isNullValue && Object.keys(obj).length === 0 );

    let result =  (isObject && (isEmptyObj || isNullValue))
    return result;
}

//Test : DONE
let valueIsUndefined = function(value){
    let objUndefinedType = typeof value === 'undefined';
    let valueIsUndefined = (value === undefined)
    let result = (objUndefinedType && valueIsUndefined);
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


function stringIsValid(inputStr){
    let isNullOrEmpty = stringIsNullOrEmpty(inputStr);
    let isUndefined = valueIsUndefined(inputStr);
    if(isNullOrEmpty || isUndefined) {
        return false;
    }
    return true;
}


function objectIsValid(obj){
    let isNullOrEmpty = objectIsNullOrEmpty(obj);
    let isUndefined = valueIsUndefined(obj);
    if(isNullOrEmpty || isUndefined) {
        return false;
    }
    return true;
}


let service = Object.freeze({
    stringIsNullOrEmpty : stringIsNullOrEmpty,
    objectIsNullOrEmpty : objectIsNullOrEmpty,
    valueIsUndefined : valueIsUndefined,
    errorKeyAndTargetKeyAreEqual : errorKeyAndTargetKeyAreEqual,
    stringIsValid : stringIsValid,
    objectIsValid : objectIsValid
});

export default service