import validationManager from '../src/services/validators/ValidationManager.js';
import userModel from '../src/viewModels/User';
import inputCommonInspector from '../src/services/validators/InputCommonInspector.js';

describe('File: validationManager.js',()=>{

    describe('Function: resolveUserRegisterValidation',function(){
        test('Model is complete, The Errors reports is Empty', function(){
            //Arrange
            let userObject = {
                firstName:'John',
                middleName:'Frederic',
                lastName:'Solyman',
                username:'john101',
                email:'john@test.com',
                password:'abcde12345!@#$%',
                confirmPassword:'abcde12345!@#$%'

            }
            let user = new userModel(userObject);

            //Act
            let report = validationManager.resolveUserRegisterValidation(user);
            let objectIsEmpty = inputCommonInspector.objectIsNullOrEmpty(report);
            //Assert
            expect(objectIsEmpty).toBe(true);
        });

        test('Model is incomplete, The Errors reports the Errors', function(){
            //Arrange
            let userObject = {
                firstName:'John11',
                middleName:'',
                lastName:'Solyman',
                username:'john101',
                email:'john@test.com',
                password:'abcde12345!@#$%',
                confirmPassword:'abcde12345'

            }
            let user = new userModel(userObject);

            //Act
            let report = validationManager.resolveUserRegisterValidation(user);
            let objectIsEmpty = inputCommonInspector.objectIsNullOrEmpty(report);
            //Assert
            expect(report.firstName).not.toEqual('');
            expect(report.confirmPassword).not.toEqual('');
            expect(objectIsEmpty).toBe(false);
        });
    });

    describe('Function: buildErrorMessagesReport', function(){
        test('When Error Report properties match the target object properties a Report is built',function(){
            //Arrange
            let errorReport = {
                firsNameRequired : 'First name is empty',
                firstNameDataType : 'First Name must be of type string',
                firstNameInvalid : 'First Name is invalid',
                lasNameRequired : 'First name is empty',
                lastNameDataType : 'First Name must be of type string',
                lastNameInvalid : 'First Name is invalid'
            }
            let userObject = {
                firstName:'John',
                middleName:'Frederic',
                lastName:'Solyman',
                username:'john101',
                email:'john@test.com',
                password:'abcde12345!@#$%',
                confirmPassword:'abcde12345!@#$%'

            }
            let user = new userModel(userObject);

            //Act
            let resultErrorsReport = validationManager.buildErrorMessagesReport(errorReport,user);

            let result = inputCommonInspector.objectIsNullOrEmpty(resultErrorsReport);
            //Assert
            expect(result).toBe(false);
        });

        test('When Error Report properties DO NOT match the target object properties a Report is NOT built',function(){
            //Arrange
            let errorReport = {
                systemRequired : 'First name is empty',
                systemDataType : 'First Name must be of type string',
                systemInvalid : 'First Name is invalid',
                laserRequired : 'First name is empty',
                laserDataType : 'First Name must be of type string',
                laserInvalid : 'First Name is invalid'
            }
            let userObject = {
                firstName:'John',
                middleName:'Frederic',
                lastName:'Solyman',
                username:'john101',
                email:'john@test.com',
                password:'abcde12345!@#$%',
                confirmPassword:'abcde12345!@#$%'

            }
            let user = new userModel(userObject);

            //Act
            let resultErrorsReport = validationManager.buildErrorMessagesReport(errorReport,user);

            let result = inputCommonInspector.objectIsNullOrEmpty(resultErrorsReport);
            //Assert
            expect(result).toBe(true);
        });
    });

});