import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';



describe('File: InputCommonInspector.js', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });
    //test('True is True', ()=>{ expect(true).toBe(true); });

    describe('Function: stringIsNullOrEmpty', function () {
        test('Empty string returns TRUE', function () {
            //Arrange
            let emptyString = '';
            //Act
            var result = InputCommonInspector.stringIsNullOrEmpty(emptyString);
            //Assert
            expect(result).toBe(true);
        });

        test('NULL string returns TRUE', function () {
            //Arrange
            let nullString = null;
            //Act
            var result = InputCommonInspector.stringIsNullOrEmpty(nullString);
            //Assert
            expect(result).toBe(true);
        });

        test('Empty object returns FALSE', function () {
            //Arrange
            let emptyObj = {};
            //Act
            var result = InputCommonInspector.stringIsNullOrEmpty(emptyObj);
            //Assert
            expect(result).toBe(false);
        });

        test('string with Value returns FALSE', function () {
            //Arrange
            let simpleString = 'this is a string';
            //Act
            var result = InputCommonInspector.stringIsNullOrEmpty(simpleString);
            //Assert
            expect(result).toBe(false);
        });

        test('string written null returns FALSE', function () {
            //Arrange
            let simpleString = 'null';
            //Act
            var result = InputCommonInspector.stringIsNullOrEmpty(simpleString);
            //Assert
            expect(result).toBe(false);
        });
    });

    describe('Function: objectIsNullOrEmpty', function () {
        test('Empty Object returns TRUE', function () {
            //Arrange
            let emptyObj = {};
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(emptyObj);
            //Assert
            expect(result).toBe(true);
        });

        test('NULL Object returns TRUE', function () {
            //Arrange
            let nullObj = null;
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(nullObj);
            //Assert
            expect(result).toBe(true);
        });

        test('UNDEFINED variable NOT UNASIGNED returns FALSE', function () {
            //Arrange
            let undefinedObj;
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(undefinedObj);
            //Assert
            expect(result).toBe(false);
        });

        test('UNDEFINED Value asigned returns FALSE', function () {
            //Arrange
            let undefinedObj = undefined;
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(undefinedObj);
            //Assert
            expect(result).toBe(false);
        });

        test('Property Object returns FALSE', function () {
            //Arrange
            let obj = { status: 200, statusText: "OK" };
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(obj);
            //Assert
            expect(result).toBe(false);
        });
    });

    describe('Function: valueIsUndefined', function(){
        test('UNDEFINED variable NOT UNASIGNED returns TRUE', function () {
            //Arrange
            let undefinedObj;
            //Act
            let result = InputCommonInspector.valueIsUndefined(undefinedObj);
            //Assert
            expect(result).toBe(true);
        });

        test('UNDEFINED Value asigned returns TRUE', function () {
            //Arrange
            let undefinedObj = undefined;
            //Act
            let result = InputCommonInspector.valueIsUndefined(undefinedObj);
            //Assert
            expect(result).toBe(true);
        });

        test('Empty Object returns FALSE', function () {
            //Arrange
            let emptyObj = {};
            //Act
            let result = InputCommonInspector.valueIsUndefined(emptyObj);
            //Assert
            expect(result).toBe(false);
        });

        test('NULL Object returns FALSE', function () {
            //Arrange
            let nullObj = null;
            //Act
            let result = InputCommonInspector.valueIsUndefined(nullObj);
            //Assert
            expect(result).toBe(false);
        });

        test('Property Object returns FALSE', function () {
            //Arrange
            let obj = { status: 200, statusText: "OK" };
            //Act
            let result = InputCommonInspector.valueIsUndefined(obj);
            //Assert
            expect(result).toBe(false);
        });
    });
    describe('Function: errorKeyAndTargetKeyAreEqual ',function(){

        test('When Error key and Target Key are equal, Result is TRUE', function(){
            //Arrange
            let errorReport ={
                firstNameRequired:'is required'
            }
            let targetObject ={
                firstName: 'John'
            }
            //Act
            let resultComparisson = false;
            for(let targetKey in targetObject){
                for(let errorKey in errorReport){
                    resultComparisson = InputCommonInspector.errorKeyAndTargetKeyAreEqual(errorKey,targetKey);
                }
            }
            //Assert
            expect(resultComparisson).toBe(true);
        })

        test('When Error key and Target Key are Different, Result is FALSE', function(){
            //Arrange
            let targetKey = 'username';
            let errorKey = 'firstNameRequired';
            //Act
            let resultComparisson = InputCommonInspector.errorKeyAndTargetKeyAreEqual(errorKey,targetKey);
            //Assert
            expect(resultComparisson).toBe(false);
        })
    });


    describe('Function: stringIsValid', function(){
        test('variable with numeric value returns FALSE', function(){
            //Arrange
            let value = 15;
            //Act
            let result = InputCommonInspector.stringIsValid(value);
            //Assert
            expect(result).toBe(false);
        })

        test('variable with string value returns TRUE', function(){
            //Arrange
            let value = '15';
            let typeResult = (typeof(value));
            //Act
            let result = InputCommonInspector.stringIsValid(value);
            //Assert
            expect(result).toBe(true);
        })

        test('variable not defined returns FALSE', function(){
            //Arrange
            let value;
            //Act
            let result = InputCommonInspector.stringIsValid(value);
            //Assert
            expect(result).toBe(false);
        })
    });

    describe('Function: objectIsValid', function(){
        test('Object with properties will return TRUE',function(){

            //Arrange
            let value = {name:'John'};
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(true);

        });

        test('Input Array Object returns FALSE', function(){
            //Arrange
            let jsObj = ['item1', 1, {code:1}];
            //Act
            let result = InputCommonInspector.objectIsValid(jsObj);
            //Assert
            expect(result).toBe(false);
        });

        test('Object with NO properties will return FALSE',function(){

            //Arrange
            let value = {};
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(false);

        });

        test('Object with NULL value will return FALSE',function(){

            //Arrange
            let value = null;
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(false);

        });

        test('Object with UNDEDFINED value will return FALSE',function(){

            //Arrange
            let value = undefined;
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(false);

        });

        test('Object NOT DEDFINED will return FALSE',function(){

            //Arrange
            let value;
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(false);

        });

        test('Object with Only INHERITED/PROTYPED PROPERTIES AND NOT OWN PROPERTIES will return FALSE',function(){

            //Arrange
            let value = new Object();
            value.__proto__.name = 'John';
            value.__proto__.age = 35;
            //Act
            let result = InputCommonInspector.objectIsValid(value);
            //Assert
            expect(result).toBe(false);

        });
    });

});