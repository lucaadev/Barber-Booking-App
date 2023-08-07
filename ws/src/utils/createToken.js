const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');

const secretKey = readFileSync('./jwt.evaluation.key', 'utf8');

const configJWT = {
    expiresIn: '30d',
    algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign({ payload }, secretKey, configJWT);

const createToken = (data) => { 
    const token = generateToken(data);
    return { token, ...data };
};

module.exports = { createToken, configJWT };