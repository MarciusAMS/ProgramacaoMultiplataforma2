const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/utils');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não informado!' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Token inválido!' });
        }

        req.user = decoded; 
        next();
    });
};