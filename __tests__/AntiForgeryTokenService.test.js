import AntiforgeryTokenService from '../src/services/csrfProtection/antiForgeryTokenService.js';



describe('File antiForgeryTokenService.js', function(){

    beforeEach(()=>{
        jest.resetAllMocks();
    });
    afterAll(()=>{
        jest.resetAllMocks();
    });
    describe('Function: createAntiForgeryTokenAsync', function(){
        test('CAN create AntiForgery Token', async function(){
            //Arrange
            //Act
            let csrfExpiringToken = await AntiforgeryTokenService.createAntiForgeryTokenAsync();
            let csrfExpiringTokenLength = csrfExpiringToken.length;
            //Assert
            expect(csrfExpiringTokenLength).not.toEqual(null);

        });


    });
    describe('Function: verifyAntiForgeryTokenIsValidAsync', function(){

        test('CAN Verify AntiForgery Token', async function(){
            //Arrange
            //Act
            let csrfToken = await AntiforgeryTokenService.createAntiForgeryTokenAsync();
            let isValid = await AntiforgeryTokenService.verifyAntiForgeryTokenIsValidAsync(csrfToken);
            //Assert
            expect(isValid).toEqual(true);

        });

    });

});
