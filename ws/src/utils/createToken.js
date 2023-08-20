require('dotenv').config();
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const path = require('path');

let secretKey;

try {
    // Tenta ler a chave secreta do arquivo jwt.evaluation.key
    const keyPath = path.join(__dirname, 'jwt.evaluation.key');
    secretKey = readFileSync(keyPath, 'utf8');
} catch (error) {
    // Se houver um erro ao ler o arquivo, tenta usar a variável de ambiente SECRET_KEY
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
