import formFieldStatus from '../library/enumerations/FormFieldStatus.js';
import JsDataType from '../library/stringLiterals/JsDataType.js';


let userLoginViewModel = function(model){
    let username = {
        fieldValue: (model.username || ''),
        fieldStatus: formFieldStatus.Required,
        fieldDataType: JsDataType.STRING
    };

    let password = {
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