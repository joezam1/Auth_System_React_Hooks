import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import JsDataType from '../library/stringLiterals/JsDataType.js';


var userLoginViewModel = function(model){
    var username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };

    var password = {
        fieldValue: (model.password || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };

    return Object.freeze({
        username:username,
        password:password
    });
}
export default userLoginViewModel;