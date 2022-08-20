//Test:DONE
const nameIsValid = function(input){
    let singleNamePattern = /^[\s]*[a-zA-Z]+[\s]*$/
    let compoundNamePattern = /^[\s]*[a-zA-Z]+[\s]*[a-zA-Z]*[\s]*$/;
    let emptyStringNoSpacesPattern = /^(?![\s\S])/;
    let allNamePatterns = [singleNamePattern, compoundNamePattern, emptyStringNoSpacesPattern];
    let isValid = inputIsValid(allNamePatterns, input);
    return isValid;
}
//Test: DONE
const usernameIsValid = function(input){
    let usernamePatternLettersNum = /^[\s]*[a-zA-Z0-9]+[\s]*$/
    let emptyStringNoSpacesPattern = /^(?![\s\S])/;
    let allUsernamePatterns = [usernamePatternLettersNum, emptyStringNoSpacesPattern ];
    let isValid = inputIsValid(allUsernamePatterns,input);
    return isValid;
}
//Test: DONE
const emailIsValid = function(input){
    let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    let emptyStringNoSpacesPattern = /^(?![\s\S])/;
    let allEmailPatterns = [emailPattern, emptyStringNoSpacesPattern];

    let isValid = inputIsValid(allEmailPatterns, input);
    return isValid;
}
//Test: DONE
const passwordMinCharactersIsValid = function(input, minCharactersCount){
    var isValid = (input.length >= minCharactersCount);
    return isValid;
}
//Test: DONE
const passwordAndConfirmPasswordAreEqual = function(password, confirmPassword){
    var areEqual = (password === confirmPassword)
    return areEqual;
}


const service = Object.freeze({
    nameIsValid:nameIsValid,
    usernameIsValid:usernameIsValid,
    emailIsValid:emailIsValid,
    passwordMinCharactersIsValid:passwordMinCharactersIsValid,
    passwordAndConfirmPasswordAreEqual:passwordAndConfirmPasswordAreEqual
});

export default service;



//#REGION Private Functions

function inputIsValid(allInputPatterns, input){
    let valid = false;
    for(let a=0; a< allInputPatterns.length; a++)
    {
        let isInputValid = allInputPatterns[a].test(input);
        if(isInputValid){
            valid = true;
            break;
        }
    }
    return valid;
}

//#ENDREGION Private Functions