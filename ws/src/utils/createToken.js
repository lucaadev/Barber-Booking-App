require('dotenv').config();
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const path = require('path');

let secretKey;

try {
    const keyPath = path.join(__dirname, 'jwt.evaluation.key');
    secretKey = readFileSync(keyPath, 'utf8');
} catch (error) {
    secretKey = process.env.SECRET_KEY;
}

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
