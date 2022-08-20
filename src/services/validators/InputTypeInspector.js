import JsDataType from '../../library/stringLiterals/JsDataType.js';

//Test: DONE
const isTypeString = function (input) {
    let result = (typeof input === JsDataType.STRING);
    return result;
}
//Test: DONE
const isTypeBoolean = function (input) {
    let result = (typeof input === JsDataType.BOOLEAN)
    return result;
}
//Test: DONE
const isTypeNumber = function (input) {
    let isNumeric = !isNaN(input);
    let isTypeNumber = (typeof input === JsDataType.NUMBER);
    let result = (isNumeric && isTypeNumber)
    return result;
}
//Test: DONE
const isTypeInteger = function (input) {
    let isNumeric = isTypeNumber(input);
    let isInteger = ((input - Math.floor(input)) === 0)
    let result = (isNumeric && isInteger)
    return result;
}
//test: DONE
const isTypeDecimal = function (input) {
    let isNumeric = isTypeNumber(input);
    let isDecimal = ((input - Math.floor(input)) !== 0)
    let result = (isNumeric && isDecimal)
    return result;
}
//Test: DONE
const isTypeNull = function (input) {
    let result = (typeof input === JsDataType.OBJECT && input !== undefined && input === null && !Array.isArray(input) && input !== JsDataType.NULL)
    return result;
}
//Test: DONE
const isTypeFunction = function (input) {
    let result = (typeof input ===JsDataType.FUNCTION)
    return result;
}
//Test: DONE
const isTypeObject = function (input) {
    let result = (typeof input ===JsDataType.OBJECT && input !== undefined && input !== null && !Array.isArray(input) && input !==JsDataType.NULL)
    return result;
}
//Test: DONE
const isDate = function(input){
    let inputData = input;
    if(typeof input === JsDataType.STRING ){
        let result = Date.parse(input)
        inputData =(isNaN(result))? result : new Date(result);
    }
    let result = (inputData instanceof Date);

    return result;
}

const service = Object.freeze({
    isTypeString: isTypeString,
    isTypeBoolean: isTypeBoolean,
    isTypeNumber: isTypeNumber,
    isTypeInteger: isTypeInteger,
    isTypeDecimal: isTypeDecimal,
    isTypeNull: isTypeNull,
    isTypeFunction: isTypeFunction,
    isTypeObject: isTypeObject,
    isDate : isDate
});

export default service;