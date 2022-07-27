import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import DataTypes from '../library/stringLiterals/JsDataTypes.js';


var userRegisterViewModel = function(model){
    var firstName ={
        fieldValue: (model.firstName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };
    var middleName = {
        fieldValue: (model.middleName || '') ,
        fieldStatus:formFieldStatus.Optional,
        fieldDataType: DataTypes.STRING
    };
    var lastName = {
        fieldValue: (model.lastName || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };
    var username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };
    var email = {
        fieldValue: (model.email || '' ),
        fieldStatus:formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };
    var password = {
        fieldValue: (model.password || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };
    var confirmPassword = {
        fieldValue: (model.confirmPassword || ''),
        fieldStatus:formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };

    return {
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        username:username,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    }

}
export default userRegisterViewModel;