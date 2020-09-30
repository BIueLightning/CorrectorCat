const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. You might need to log in again.');
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_AUTH_TOKEN_SECRET);
        console.log(req.user);
    } catch (err) {
        console.log(err);
        return res.status(403).send('Access denied, no permission.');
    }
    next();
}

module.exports = auth;