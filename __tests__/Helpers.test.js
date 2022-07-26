import helpers from '../src/library/common/Helpers.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';



describe('File: Helpers.js',function(){

    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: removeLeadingAndTrailinsSpaces',function(){

        test('Input with Spaces will have them removed',function(){
            //Arrange
            let inputWithSpaces = '  input with spaces    ';
            let inputWithSpacesLength = inputWithSpaces.length;
            //Act
            let noSpacesInput = helpers.removeLeadingAndTrailinsSpaces(inputWithSpaces);
            let inputNoSpacesLength = noSpacesInput.length;
            //Assert
            let spacesRemovedCount = inputWithSpacesLength - inputNoSpacesLength;
            expect(spacesRemovedCount).toBeGreaterThan(0);
        });
    });

    describe('Function: getDateUTCFormat', function(){
        test('Common LOCALE Date gets converted to UTC-Date', function(){
            //Arrange
            let localeDate = new Date();
            let localeDateUtc = localeDate.toISOString().replace('T', ' ').substring(0, 19);

            //Act
            let utcDate = helpers.getDateUTCFormat(localeDate);

            //Assert
            expect(utcDate).toEqual(localeDateUtc);
        });
    });

    describe('Function: createPropertiesArrayFromObjectProperties',function(){
        test('object can be transformed in Array of objects', function(){

            //Arrange
            let obj = {
                name:'Tom',
                phone:'04123456789'
            }
            let objArray = ['Tom','04123456789' ]
            //Act
            let result = helpers.createPropertiesArrayFromObjectProperties(obj);
            //Assert
            expect(result).toEqual(objArray);
        });
    });

    describe('Function: formatStringFirstLetterCapital', function(){
        test('camel case string is formatted as First Letter is Capital', function(){
            //Arrange
            let camelCaseInput = 'inputInCamelCaseFormat';
            let expectedResult = 'Input In Camel Case Format'
            //Act
            let resultInput = helpers.formatStringFirstLetterCapital(camelCaseInput);
            //Assert
            expect(resultInput).toEqual(expectedResult);
        });
        test('simple sentence all small letters will have their first letter capitalized', function(){
            //Arrange
            let camelCaseInput = 'input in small letters';
            let expectedResult = 'Input In Small Letters';
            //Act
            let resultInput = helpers.formatStringFirstLetterCapital(camelCaseInput);
            //Assert
            expect(resultInput).toEqual(expectedResult);
        });
        test('mixed sentence with small letters and cammel case will be spaced and their first letter capitalized', function(){
            //Arrange
            let camelCaseInputAndSpacedSmallLetters = 'mixedWords in small letters andCamelCase letters';
            let expectedResult = 'Mixed Words In Small Letters And Camel Case Letters';
            //Act
            let resultInput = helpers.formatStringFirstLetterCapital(camelCaseInputAndSpacedSmallLetters);
            //Assert
            expect(resultInput).toEqual(expectedResult);
        })
        test('Input of types different from STRING will not be processed and returned as they are originally', function(){

            //Arrange
            let input = {sentence:'this isATest'};
            let expectedResult = {sentence:'this isATest'};;
            //Act
            let resultInput = helpers.formatStringFirstLetterCapital(input);
            //Assert
            expect(resultInput).toEqual(expectedResult);
        })
    })

    describe('Function: getHtmlBreakSeparator',function(){

        test('When the input is VALID, the HTML Separator is generated', function(){
            //Arrange
            let input = 'any text';
            let expectedSeparator = '<br/>';
            //Act
            let result = helpers.getHtmlBreakSeparator(input);
            //Assert
            expect(result).toEqual(expectedSeparator);
        });

        test('When the input is EMPTY, the HTML Separator is NOT generated', function(){
            //Arrange
            let input = null;
            let expectedSeparator = '';
            //Act
            let result = helpers.getHtmlBreakSeparator(input);
            //Assert
            expect(result).toBe(expectedSeparator);
        });
    });

    describe('Function: getmessageFormatForDisplay', function(){
        test('When the input has some VALID VALUE, The Input is returned for Display', function(){
            //Arrange
            let input = 'any text';
            let expectedResult =input;
            //Act
            let result = helpers.getmessageFormatForDisplay(input);
            //Assert
            expect(result).toEqual(expectedResult);
        });

        test('When the input has some VALID VALUE, The Input is returned for Display', function(){
            //Arrange
            let input = null;
            let expectedResult ='';
            //Act
            let result = helpers.getmessageFormatForDisplay(input);
            //Assert
            expect(result).toEqual(expectedResult);
        });
    });

    describe('Function: setUrlRedirect', function(){
        test('When we provide redirection path, the object window.location.href is called OK', function(){
            //Arrange
            delete global.window.location;
            global.window = Object.create(window);
            global.window.location = {
                ancestorOrigins: null,
                hash: null,
                host: 'localhost',
                port: '80',
                protocol: 'http:',
                hostname: 'localhost',
                href: null,
                origin: 'http://localhost',
                pathname: null,
                search: null,
                assign: null,
                reload: null,
                replace: null,
            };
            let redirectLocation = RouteConfig.privateCustomerDashboardPath;
            let finalUrl = global.window.location.protocol + '//'+global.window.location.host +''+ redirectLocation;
            //Act

            helpers.setUrlRedirect(redirectLocation);
            //Assert
            expect(window.location.href).toEqual(finalUrl);
        })
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
                var result = helpers.getUrlRedirectTo(pathRedirectTo);
                //Assert
                expect(result).not.toEqual(originalWindowLocation);
                expect(result).toContain('register');
            });
    });



    describe('Function: convertLocaleDateToUTCDate', function () {
        test('When Locale Date is provided, it is converted to UTC Date', function () {
            //Arrange
            let dateNowLocale = new Date();

            let utcYear = dateNowLocale.getUTCFullYear();
            let utcMonth = dateNowLocale.getUTCMonth();
            let utcDay = dateNowLocale.getUTCDay();
            let utcDate = dateNowLocale.getUTCDate();
            let utcHours = dateNowLocale.getUTCHours();
            let utcMinutes = dateNowLocale.getUTCMinutes();
            let utcSeconds = dateNowLocale.getUTCSeconds();

            //Act
            let dateNowUTC = helpers.convertLocaleDateToUTCDate(dateNowLocale);

            let dateNowUTCYear = dateNowUTC.getFullYear();
            let dateNowUTCMonth = dateNowUTC.getMonth();
            let dateNowUTCDay = dateNowUTC.getDay();
            let dateNowUTCDate = dateNowUTC.getDate();
            let dateNowUTCHours = dateNowUTC.getHours();
            let dateNowUTCMinutes = dateNowUTC.getMinutes();
            let dateNowUTCSeconds = dateNowUTC.getSeconds();

            //Assert
            expect(utcYear).toEqual(dateNowUTCYear);
            expect(utcMonth).toEqual(dateNowUTCMonth);
            expect(utcDay).toEqual(dateNowUTCDay);
            expect(utcDate).toEqual(dateNowUTCDate);
            expect(utcHours).toEqual(dateNowUTCHours);
            expect(utcMinutes).toEqual(dateNowUTCMinutes);
            expect(utcSeconds).toEqual(dateNowUTCSeconds);

        });
    });
});
