import React from "react";
import { render, cleanup } from '@testing-library/react';
import App from '../src/App.js';



describe('File: App.js', function(){
    afterEach(cleanup);
    afterEach(() => {
        jest.clearAllMocks();
    });
    //NOTE: Test that JEST is working correctly
    //test('True is True', function () { expect(true).toBe(true); });

    test('Function App it should take a snapshot', function(){
        var container = render(<App/>);
        expect(container.asFragment(<App/>)).toMatchSnapshot();
    });
});