import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import JsDataType from '../library/stringLiterals/JsDataType.js';


let userRegisterViewModel = function(model){
    let firstName ={
        fieldValue: (model.firstName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    let middleName = {
        fieldValue: (model.middleName || '') ,
        fieldStatus:formFieldStatus.Optional,
        fieldDataType: JsDataType.STRING
    };
    let lastName = {
        fieldValue: (model.lastName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    let username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    let email = {
        fieldValue: (model.email || '' ),
        fieldStatus:formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    let password = {
        fieldValue: (model.password || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    let confirmPassword = {
        fieldValue: (model.confirmPassword || ''),
        fieldStatus:formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };

    return Object.freeze({
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        username:username,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    });

}
export default userRegisterViewModel;