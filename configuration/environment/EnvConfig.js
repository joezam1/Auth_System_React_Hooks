
console.log('envConfig.process.env.NODE_ENV', process.env.NODE_ENV);

var REACT_APP_NODE_ENV = '';
var REACT_APP_PROTOCOL = '';
var REACT_APP_HOST = '';
var REACT_APP_PORT = '';
var REACT_APP_TARGET_URL = '';



if(process.env.NODE_ENV  =='development'){
    REACT_APP_NODE_ENV = 'development';
    REACT_APP_PROTOCOL = 'http';
    REACT_APP_HOST= 'localhost';
    REACT_APP_PORT= '8080';
    REACT_APP_TARGET_URL= 'localhost:3500';

}
else if(process.env.NODE_ENV==='production'){
    REACT_APP_NODE_ENV= 'production';
    REACT_APP_PROTOCOL = 'https';
    REACT_APP_HOST= 'myreactproduction.com'
    REACT_APP_PORT= '';
    REACT_APP_TARGET_URL= 'authserverproduction.com'
}

var envConfig = Object.freeze({
    NODE_ENV : REACT_APP_NODE_ENV,
    PROTOCOL : REACT_APP_PROTOCOL,
    HOST : REACT_APP_HOST,
    PORT : REACT_APP_PORT,
    TARGET_URL :REACT_APP_TARGET_URL
});

console.log('envConfig', envConfig);
module.exports = envConfig;
