import ObjectModelInspector from './objectModelInspector.js';
import Helpers from '../../library/common/Helpers.js';
import InputCommonInspector from './InputCommonInspector.js';


//Test: DONE
let resolveUserFormValidation = function(userModel){
    let reportInputLength = ObjectModelInspector.inspectInputLength(userModel);
    let reportInputType = ObjectModelInspector.inspectInputType(userModel);
    let reportInputValue = ObjectModelInspector.inspectInputValue(userModel);

    let errorsReport = Object.assign({},reportInputType,reportInputLength,reportInputValue);
    return errorsReport;
}
//Test:DONE
let buildErrorMessagesReport = function(errorsReportForTargetObject, targetObject){
    let errorsSectionObjReport = {};
    let errors = errorsReportForTargetObject;
    for(let targetObjKey in targetObject){
        if(targetObject.hasOwnProperty(targetObjKey)){
            let errorSection = { objKey : '', objValue: '' };
            for(let errorKey in errors){
                if(errors.hasOwnProperty(errorKey)){
                    if(InputCommonInspector.errorKeyAndTargetKeyAreEqual(errorKey, targetObjKey)){
                        errorSection.objKey = targetObjKey + 'AllErrors';
                        let value = errors[errorKey];
                        errorSection.objValue += Helpers.getmessageFormatForDisplay(value) + Helpers.getHtmlBreakSeparator(value)
                    }
                }
            }
            if(!InputCommonInspector.stringIsNullOrEmpty(errorSection.objValue)){
                errorsSectionObjReport[errorSection.objKey] = errorSection.objValue;
            }
        }
    }
    return errorsSectionObjReport;
}

let validationManagerService = {
    resolveUserFormValidation : resolveUserFormValidation,
    buildErrorMessagesReport : buildErrorMessagesReport
}

export default validationManagerService;

//#REGION Private Functions

//#ENDREGION Private Functions
