import JsDataType from '../stringLiterals/JsDataType.js';
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
let getHtmlBreakSeparator = function(input){
    let inputIsValid = InputCommonInspector.stringIsValid(input);
    return (inputIsValid ? '<br/>' : '');
}
//Test: DONE
let getmessageFormatForDisplay = function(input){
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
let getUrlRedirectTo = function(redirectTo){
    var protocol = window.location.protocol;
    var host = window.location.host;
    var pathName = window.location.pathname;
    var search = window.location.search;
    var urlReferrer = protocol + "//" + host + "/" + pathName + search;
    var urlRedirect = protocol + "//" + host + redirectTo;
    return urlRedirect;
}

//Test: DONE
const convertLocaleDateToUTCDate = function(localeDAteAsDate ){
    //To convert to UTC datetime by subtracting the current Timezone offset
    let utcDate =  new Date(localeDAteAsDate.getTime() + (localeDAteAsDate.getTimezoneOffset()*60000));
    return utcDate;
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
    convertLocaleDateToUTCDate : convertLocaleDateToUTCDate
});

export default service;

//#REGION Private Functions

//#ENDREGION Private Functions