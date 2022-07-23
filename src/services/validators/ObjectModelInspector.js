import Helpers from '../../library/common/Helpers.js';
import InputCommonInspector from './InputCommonInspector.js';
import InputTypeInspector from './InputTypeInspector.js';
import InputDataInspector from './InputValueInspector.js';

import ValidationConfig from '../../../configuration/validation/ValidationConfig.js';
import FormFieldStatus from '../../library/enumerations/FormFieldStatus.js';
import DataTypes from '../../library/stringLiterals/JsDataTypes.js';
import InputValidationSuffixes from '../../library/stringLiterals/InputValidationSuffixes.js';

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
            inputLengthReport[`${key + InputValidationSuffixes.REQUIRED}`] = `${allCapitalLettersKey} is empty. ${allCapitalLettersKey} is Required.`;
        }
    }

    return inputLengthReport;
}

//Test: DONE
let inspectInputType = function(objViewModel){
    let reportTypeErrors = {};
    for(let key in objViewModel){

        if(objViewModel.hasOwnProperty(key)){
            let selectedDataType = objViewModel[key].fieldDataType;

            switch(selectedDataType){
                case DataTypes.STRING:
                if(!InputTypeInspector.isTypeString(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffixes.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case DataTypes.DATE:
                if(!InputTypeInspector.isDate(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffixes.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case DataTypes.NUMBER:
                if(!InputTypeInspector.isTypeNumber(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key  + InputValidationSuffixes.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case DataTypes.BOOLEAN:
                if(!InputTypeInspector.isTypeBoolean(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key  + InputValidationSuffixes.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case DataTypes.OBJECT:
                if(!InputTypeInspector.isTypeObject(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + InputValidationSuffixes.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;
            }
        }
    }

    return reportTypeErrors;
}

//Test: DONE
function inspectInputValue(objViewModel){
    let dataReportErrors = {};
    let selectedPassword = '';
    for(let key in objViewModel){
        if(objViewModel.hasOwnProperty(key)){
            if(key.toLowerCase() === ('username')){
                let valueUsername = objViewModel[key].fieldValue;
                if(!InputDataInspector.usernameIsValid(valueUsername)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffixes.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase().includes('name')){
                let valueName = objViewModel[key].fieldValue;
                if(!InputDataInspector.nameIsValid(valueName)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffixes.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase().includes('email')){
                let valueEmail = objViewModel[key].fieldValue;
                if(!InputDataInspector.emailIsValid(valueEmail)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffixes.INVALID}`] = `${allCapitalLettersKey} is Invalid.`;
                }
            }

            else if(key.toLowerCase() === ('password')){
                selectedPassword = objViewModel[key].fieldValue;
                if(!InputDataInspector.passwordMinCharactersIsValid(selectedPassword, ValidationConfig.passwordMinCharacters)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffixes.INVALID}`] = `${allCapitalLettersKey} must have ${ValidationConfig.passwordMinCharacters} minimum characters.`;
                }
            }

            else if(key.toLowerCase() === ('confirmpassword')){
                let selectedConfirmPasswordValue = objViewModel[key].fieldValue;
                if(!InputDataInspector.passwordAndConfirmPasswordAreEqual(selectedPassword , selectedConfirmPasswordValue)){
                    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + InputValidationSuffixes.INVALID}`] = `Password and ${allCapitalLettersKey} are not the same.`;
                }
            }
        }
    }

    return dataReportErrors;
}

const service = {
    inspectInputLength : inspectInputLength,
    inspectInputType : inspectInputType,
    inspectInputValue : inspectInputValue
}

export default service;

//#REGION Private Functions
function getReportErrorInputType(userViewModel,key){
    let allCapitalLettersKey = Helpers.formatStringFirstLetterCapital( key );
    let reportValue =  `${allCapitalLettersKey} must be of type ${userViewModel[key].fieldDataType}.`;

    return reportValue;
}

//#ENDREGION Private Functions
