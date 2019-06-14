const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access Denied. No Token Provided");
    try {
        console.log(token);
        console.log(config.get('env.jwt.jwtPrivateKey'));

        const decoded = jwt.verify(token, config.get('env.jwt.jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch (e) {
        res.status(400).send("Invalid Token")
    }
}

