const TokenType = Object.freeze({
    sessionAuthentication: 0,
    jwtAccessToken: 1,
    jwtRefreshToken: 2,
    0: 'sessionAuthentication',
    1: 'jwtAccessToken',
    2: 'jwtRefreshToken'
});

export default TokenType;