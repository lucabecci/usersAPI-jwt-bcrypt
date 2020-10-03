const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next) {
    //nos fijamos si el usuario tiene el token
    const token = req.headers['x-access-token'];
    //si no lo tiene devuelve 401
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    //si lo tiene devuelve los datos de ese usuario
    //decodificamos el token
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next()
}

module.exports = verifyToken;