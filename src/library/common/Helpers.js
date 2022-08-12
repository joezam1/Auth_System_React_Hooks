import DataTypes from '../stringLiterals/JsDataTypes.js';
import CommonValidators from '../../services/validators/CommonValidators.js';
import InputCommonInspector from '../../services/validators/InputCommonInspector.js';

//Test: DONE
let removeLeadingAndTrailinsSpaces = function(input){
    let inputNoSpaces = input;
    if(typeof input === DataTypes.STRING){
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
    if(typeof input === DataTypes.STRING){
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
    let protocol = window.location.protocol;
    let host = window.location.host
    let pathName = window.location.pathname;
    let search = window.location.search
    let referrerUrl = protocol  + "//" + host + "/" + pathName + search
    let nextUrlRedirect = protocol  + "//" + host + redirectTo;
    window.location.href = nextUrlRedirect;
}

let service= Object.freeze({
    removeLeadingAndTrailinsSpaces : removeLeadingAndTrailinsSpaces,
    getDateUTCFormat : getDateUTCFormat,
    createPropertiesArrayFromObjectProperties : createPropertiesArrayFromObjectProperties,
    formatStringFirstLetterCapital : formatStringFirstLetterCapital,
    getHtmlBreakSeparator : getHtmlBreakSeparator,
    getmessageFormatForDisplay : getmessageFormatForDisplay,
    setUrlRedirect : setUrlRedirect

});

export default service;