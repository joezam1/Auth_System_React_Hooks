import InputCommonInspector from '../src/services/validators/InputCommonInspector.js';



xdescribe('File: InputCommonInspector.js', () => {
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

        test('Property Object returns FALSE', function () {
            //Arrange
            let obj = { status: 200, statusText: "OK" };
            //Act
            let result = InputCommonInspector.objectIsNullOrEmpty(obj);
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
});