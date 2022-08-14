import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import JsDataType from '../library/stringLiterals/JsDataType.js';


var userRegisterViewModel = function(model){
    var firstName ={
        fieldValue: (model.firstName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    var middleName = {
        fieldValue: (model.middleName || '') ,
        fieldStatus:formFieldStatus.Optional,
        fieldDataType: JsDataType.STRING
    };
    var lastName = {
        fieldValue: (model.lastName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    var username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    var email = {
        fieldValue: (model.email || '' ),
        fieldStatus:formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    var password = {
        fieldValue: (model.password || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };
    var confirmPassword = {
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