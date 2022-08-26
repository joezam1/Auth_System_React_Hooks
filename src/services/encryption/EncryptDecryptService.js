import CryptoJS from 'crypto-js';

import CryptoJsConfig from'../../../configuration/encryption/CryptoJsConfig.js';
import InputTypeInspector from'../validators/InputTypeInspector.js';


const EncryptDecryptService = (function () {



    const encryptWithAES = function (plainText) {
        if (!InputTypeInspector.isTypeString(plainText)) {
            return plainText;
        }

        let encrypted = CryptoJS.AES.encrypt(plainText, CryptoJsConfig.PASSPHRASE).toString();
        return encrypted;
    };


    const decryptWithAES = (cipherText) => {
        if (!InputTypeInspector.isTypeString(cipherText)) {
            return cipherText;
        }

        const bytes = CryptoJS.AES.decrypt(cipherText, CryptoJsConfig.PASSPHRASE);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };


    return Object.freeze({
        encryptWithAES: encryptWithAES,
        decryptWithAES: decryptWithAES
    });

})();

export default EncryptDecryptService;