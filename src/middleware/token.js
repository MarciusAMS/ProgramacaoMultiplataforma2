const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/utils');

module.exports = (req, res, next) => {
    try {
        // se usar bearer: bearer <token>
        //const token = req.headers.authorization.split(" ")[1];
        // se não usar bearer:
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            mensagem: 'Falha na autenticação'
        });
    }
}