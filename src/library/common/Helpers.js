import JsDataType from '../stringLiterals/JsDataType.js';
import CommonValidators from '../../services/validators/CommonValidators.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';

//Test: DONE
let removeLeadingAndTrailinsSpaces = function(input){
    let inputNoSpaces = input;
    if(typeof input === JsDataType.STRING){
        inputNoSpaces = input.trim();
    }
    return inputNoSpaces;
}
//Test: DONE
let getDateUTCFormat = function(selectedLocaleDate){
    let dateNowUTC = selectedLocaleDate.toISOString();
    let dateNowUTCDateTimeFormat = dateNowUTC.replace('T', ' ').substring(0,19);

    return dateNowUTCDateTimeFormat;
}
//Test: DONE
let createPropertiesArrayFromObjectProperties = function(obj){
    let properties = [];
    for(const key in obj){
        let newObj =  obj[key];
        properties.push(newObj);
    }
    return properties;
}
//Test: DONE
let formatStringFirstLetterCapital = function(input){

    let newInput = input;
    let allInputsArray = [];
    if(typeof input === JsDataType.STRING){
        let spacedCamelCase = input.replace(/[A-Z]/g, ' $&').trim();
        let normalizedInputArray = spacedCamelCase.split(' ');
        for(let a = 0; a < normalizedInputArray.length; a++){
            let charAtZeroUppercase = normalizedInputArray[a].charAt(0).toUpperCase();
            let capitalFirstLetter = normalizedInputArray[a].replace(normalizedInputArray[a].charAt(0), charAtZeroUppercase);
            allInputsArray.push(capitalFirstLetter);
        }

        newInput = allInputsArray.join(' ');
    }

    return newInput;

}
//Test: DONE
function getHtmlBreakSeparator(input){
    let inputIsValid = InputCommonInspector.stringIsValid(input);
    return (inputIsValid ? '<br/>' : '');
}
//Test: DONE
function getmessageFormatForDisplay(input){
    if(InputCommonInspector.stringIsValid(input)){
        return input;
    }
    return '';
}
//Test: DONE
let setUrlRedirect = function(redirectTo){
    let urlRedirect = getUrlRedirectTo( redirectTo );
    window.location.href = urlRedirect;
}

//Test:DONE
var getUrlRedirectTo = function(redirectTo){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var pathName = window.location.pathname;
    var search = window.location.search;
    var urlReferrer = protocol + "//" + host + "/" + pathName + search;
    var urlRedirect = protocol + "//" + host + redirectTo;
    return urlRedirect;
}

//Test:DONE
var safeJsonParse = function (input) {
    var value = input;
    if (CommonValidators.isValidJson(input)) {
        value = JSON.parse(input);
    }
    return value;
}

let service= Object.freeze({
    removeLeadingAndTrailinsSpaces : removeLeadingAndTrailinsSpaces,
    getDateUTCFormat : getDateUTCFormat,
    createPropertiesArrayFromObjectProperties : createPropertiesArrayFromObjectProperties,
    formatStringFirstLetterCapital : formatStringFirstLetterCapital,
    getHtmlBreakSeparator : getHtmlBreakSeparator,
    getmessageFormatForDisplay : getmessageFormatForDisplay,
    setUrlRedirect : setUrlRedirect,
    getUrlRedirectTo : getUrlRedirectTo,
    safeJsonParse : safeJsonParse
});

export default service;