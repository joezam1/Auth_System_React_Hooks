const passwordMinCharacters = 3;
const passwordSaltRounds = 8;


let service = Object.freeze({
    passwordMinCharacters:passwordMinCharacters,
    passwordSaltRounds:passwordSaltRounds
});

module.exports = service;