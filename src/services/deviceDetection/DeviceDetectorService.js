'use strict';

import NavigatorHelper from './NavigatorHelper.js';

const DeviceDetectorService = (function(){

    const navigatorModule = {
        options: [],
        header: NavigatorHelper.getNavigatorData(),
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ]
    };


    const getDeviceAndBrowserInfo = function(){
        let userAgent = navigatorModule.header;
        let os = matchItem(userAgent, navigatorModule.dataos);
        let browser = matchItem(userAgent, navigatorModule.databrowser);
        let appVersion = NavigatorHelper.getAppVersion();
        let platform = NavigatorHelper.getPlatform();
        let vendor = NavigatorHelper.getVendor();

        return {
            os: os,
            browser: browser,
            appVersion :appVersion,
            platform : platform,
            vendor : vendor
        };
    }
    //Test: DONE
    const getUserAgent = function(){
        let userAgent = NavigatorHelper.getUserAgent();
        return userAgent;
    }
    //Test: DONE
    return Object.freeze({
        getDeviceAndBrowserInfo : getDeviceAndBrowserInfo,
        getUserAgent : getUserAgent
    });


})();

export default DeviceDetectorService;


//#REGION Private Functions

function matchItem(string, data) {
    let i = 0;
    let j = 0;
    let html = '';
    let regex;
    let regexv;
    let match;
    let matches;
    let version;

    for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);
        if (match) {
            regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
            matches = string.match(regexv);
            version = '';
            if (matches) { if (matches[1]) { matches = matches[1]; } }
            if (matches) {
                matches = matches.split(/[._]+/);
                for (j = 0; j < matches.length; j += 1) {
                    if (j === 0) {
                        version += matches[j] + '.';
                    } else {
                        version += matches[j];
                    }
                }
            } else {
                version = '0';
            }
            return {
                name: data[i].name,
                version: parseFloat(version)
            };
        }
    }
    return {
        name: 'unknown',
        version: 0
    };
}

//#ENDREGION Private Functions