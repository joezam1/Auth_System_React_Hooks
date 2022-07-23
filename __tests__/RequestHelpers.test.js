import { cleanup } from '@testing-library/react';
import RequestHelpers from '../src/services/httpProtocol/RequestHelpers.js';

xdescribe('File: RequestHelpers.js', function () {
    afterEach(cleanup);
    //NOTE: Test that JEST is working correctly
    //test('True is True', function () { expect(true).toBe(true); });

    var obj = {
        code: 1,
        description: "week",
        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        period: {
            month: {
                time: 'morning'
            }
        }
    }

    describe('Function: safeJsonParse', function () {
        test('Can parse a json Object',
            function () {
                var jsonObj = JSON.stringify(obj);
                var resultObj = RequestHelpers.safeJsonParse(jsonObj);
                var resultIsTypeObject = (typeof resultObj === 'object');
                var time = resultObj.period.month.time;
                expect(time).toBe('morning');
                expect(resultIsTypeObject).toBe(true);
            });


        test('Will return the original string input when is NOT a valid json object',
            function () {
                var originalString = "this is Just a String, not a json object";
                var result = RequestHelpers.safeJsonParse(originalString);
                expect(result).toBe(originalString);
                expect(result).toStrictEqual(originalString);
            });

        test('Will return the original object input when is NOT a valid json object',
            function () {
                //Arrange
                var invalidObj = +'[]' + obj;
                var jsonObj = JSON.stringify(invalidObj);
                //Act
                var resultObj = RequestHelpers.safeJsonParse(jsonObj);
                var resultIsTypeObject = (typeof resultObj === 'object');
                var time = resultObj.period;
                //Assert
                expect(time).toBe(undefined);
                expect(resultIsTypeObject).toBe(false);
                expect(resultObj).toStrictEqual(invalidObj);
            });
    });
    describe('Function: getUrlRedirectTo', function () {
        test('URL redirects to path specified',
            function () {
                //Arrange
                var windowLocation =   window.location;
                var originalWindowLocation =   window.location.origin;
                var pathName = window.location.pathname;
                let pathRedirectTo = '/testing-register';
                //Act
                var result = RequestHelpers.getUrlRedirectTo(pathRedirectTo);
                //Assert
                expect(result).not.toEqual(originalWindowLocation);
                expect(result).toContain('register');
            });
    });

});