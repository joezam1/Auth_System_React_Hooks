import { cleanup } from '@testing-library/react';

describe('File: TransparentLayer.js', function () {
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    //NOTE: Test that JEST is working correctly
    test('True is True', function () { expect(true).toBe(true); });



});