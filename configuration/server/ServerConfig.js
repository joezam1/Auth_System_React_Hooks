const serverRouteConfiguration = Object.freeze({
    homeResourcesGet:'/api/home/resources',
    apiUsersRegisterPathPost : '/api/users/register',
    apiUsersLoginPathPost: '/api/users/login',
    apiUserslogoutPathPost: '/api/users/logout',
    apiSessionsUpdatePut:'/api/sessions/update',
    apiSessionsSessionTokenGet:'/api/sessions/sessiontoken',
    apiJsonWebTokenUpdatePut:'/api/jsonwebtokens/update',
});

export default serverRouteConfiguration;