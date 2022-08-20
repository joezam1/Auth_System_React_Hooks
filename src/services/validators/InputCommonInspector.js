import JsDataType from '../../library/stringLiterals/JsDataType.js';
import InputValidationSuffix from '../../library/stringLiterals/InputValidationSuffix.js';

//Test: DONE
const stringIsNullOrEmpty = function (input) {
    if (valueIsUndefined(input)) {
        return false;
    }
    let isValidType = (typeof input === JsDataType.STRING || typeof input === JsDataType.OBJECT);
    let isValidValue = (input === null || (input !== null && input.length === 0));

    if ((isValidType && isValidValue)) {
        return true;
    }
    return false;
}

//Test:DONE
const objectIsNullOrEmpty = function (obj) {
    let objType = (typeof (obj));
    let isObjectType = (typeof obj == JsDataType.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = typeof obj !== 'undefined';

    let isNullValue = (obj === null)

    let isObject = (isObjectType && !isArrayType && isNotUndefinedType);
    let isEmptyObj = (isObject && !isNullValue && (Object.keys(obj).length === 0));

    let result = (isObject && (isEmptyObj || isNullValue))
    return result;
}

//Test : DONE
const valueIsUndefined = function (value) {
    let objUndefinedType = typeof value === 'undefined';
    let valueIsUndefined = (value === undefined)
    let result = (objUndefinedType && valueIsUndefined);
    return result;
}

//Test: DONE
const errorKeyAndTargetKeyAreEqual = function (errorKey, targetKey) {
    let selectedErrorKey = errorKey;
    let clearedErrorKey = selectedErrorKey.replace(InputValidationSuffix.REQUIRED, '')
        .replace(InputValidationSuffix.INVALID, '')
        .replace(InputValidationSuffix.DATATYPE, '');
    let errorKeyLowerCase = clearedErrorKey.toLowerCase();
    let targetObjKeyLowerCase = targetKey.toLowerCase();
    let areEqual = (errorKeyLowerCase === (targetObjKeyLowerCase));
    return areEqual;
}

//Test: DONE
const stringIsValid = function (inputStr) {
    let isValidType = (typeof inputStr === JsDataType.STRING);
    let isNullOrEmpty = stringIsNullOrEmpty(inputStr);
    let isUndefined = valueIsUndefined(inputStr);
    if (isValidType && !isNullOrEmpty && !isUndefined) {
        return true;
    }
    return false;
}

//Test: DONE
const objectIsValid = function (obj) {
    let isObjectType = (typeof obj == JsDataType.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = typeof obj !== 'undefined';
    let isValidType = (isObjectType && !isArrayType && isNotUndefinedType);
    let isNullOrEmpty = objectIsNullOrEmpty(obj);
    let isUndefined = valueIsUndefined(obj);
    if (isValidType && !isNullOrEmpty && !isUndefined) {
        return true;
    }
    return false;
}

//Test: DONE
const inputExist = function(input){
    if(input !== null && !valueIsUndefined(input)){
            return true;
    }
    return false;
}



const service = Object.freeze({
    stringIsNullOrEmpty: stringIsNullOrEmpty,
    objectIsNullOrEmpty: objectIsNullOrEmpty,
    valueIsUndefined: valueIsUndefined,
    errorKeyAndTargetKeyAreEqual: errorKeyAndTargetKeyAreEqual,
    stringIsValid: stringIsValid,
    objectIsValid: objectIsValid,
    inputExist : inputExist
});

export default service