import Helpers from '../../library/common/Helpers.js';
import InputCommonInspector from './InputCommonInspector.js';
import InputTypeInspector from './InputTypeInspector.js';
import InputDataInspector from './InputValueInspector.js';

import ValidationConfig from '../../../configuration/validation/ValidationConfig.js';
import FormFieldStatus from '../../library/enumerations/FormFieldStatus.js';
import JsDataType from '../../library/stringLiterals/JsDataType.js';
import InputValidationSuffix from '../../library/stringLiterals/InputValidationSuffix.js';

//Test: DONE
const inspectInputLength = function(objViewModel){
    let inputLengthReport = {};
    for(var key in objViewModel){
        if(!objViewModel.hasOwnProperty(key)){
            continue;
        }
        let value = objViewModel[key].fieldValue;
        let fieldStatus = objViewModel[key].fieldStatus;

        if(fieldStatus === FormFieldStatus.Required && InputCommonInspector.stringIsNullOrEmpty(value)){
            let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
            inputLengthReport[`${key + InputValidationSuffix.REQUIRED}`] = `${allCapitalLettersKey} is empty. ${allCapitalLettersKey} is Required.`;
        }
    }

    return inputLengthReport;
}

//Test: DONE
const inspectInputType = function(objViewModel){
    let reportTypeErrors = {};
    for(let key in objViewModel){

        if(objViewModel.hasOwnProperty(key)){
            let selectedDataType = objViewModel[key].fieldDataType;

            switch(selectedDataType){
                case JsDataType.STRING:
                if(!InputTypeInspector.isTypeString(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case JsDataType.DATE:
                if(!InputTypeInspector.isDate(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case JsDataType.NUMBER:
                if(!InputTypeInspector.isTypeNumber(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key  + InputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case JsDataType.BOOLEAN:
                if(!InputTypeInspector.isTypeBoolean(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key  + InputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case JsDataType.OBJECT:
                if(!InputTypeInspector.isTypeObject(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;
            }
        }
    }

    return reportTypeErrors;
}

//Test: DONE
const inspectInputValue = function(objViewModel){
    let dataReportErrors = {};
    let selectedPassword = '';
    for(let key in objViewModel){
        if(objViewModel.hasOwnProperty(key)){
            if(key.toLowerCase() === ('username')){
                let valueUsername = objViewModel[key].fieldValue;
                if(!InputDataInspector.usernameIsValid(valueUsername)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase().includes('name')){
                let valueName = objViewModel[key].fieldValue;
                if(!InputDataInspector.nameIsValid(valueName)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase().includes('email')){
                let valueEmail = objViewModel[key].fieldValue;
                if(!InputDataInspector.emailIsValid(valueEmail)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase() === ('password')){
                selectedPassword = objViewModel[key].fieldValue;
                if(!InputDataInspector.passwordMinCharactersIsValid(selectedPassword, ValidationConfig.passwordMinCharacters)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} must have ${ValidationConfig.passwordMinCharacters} minimum characters.`;
                }
            }

            else if(key.toLowerCase() === ('confirmpassword')){
                let selectedConfirmPasswordValue = objViewModel[key].fieldValue;
                if(!InputDataInspector.passwordAndConfirmPasswordAreEqual(selectedPassword , selectedConfirmPasswordValue)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffix.INVALID}`] = `Password and ${allCapitalLettersKey} are not the same.`;
                }
            }
        }
    }

    return dataReportErrors;
}

const service = Object.freeze({
    inspectInputLength : inspectInputLength,
    inspectInputType : inspectInputType,
    inspectInputValue : inspectInputValue
});

export default service;

//#REGION Private Functions
function getReportErrorInputType(userViewModel,key){
    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital( key );
    let reportValue =  `${allCapitalLettersKey} must be of type ${userViewModel[key].fieldDataType}.`;

    return reportValue;
}

//#ENDREGION Private Functions
