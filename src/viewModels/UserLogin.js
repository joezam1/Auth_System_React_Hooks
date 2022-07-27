import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import DataTypes from '../library/stringLiterals/JsDataTypes.js';


var userLoginViewModel = function(model){
    var username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };

    var password = {
        fieldValue: (model.password || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: DataTypes.STRING
    };

    return {
        username:username,
        password:password
    }
}
export default userLoginViewModel;