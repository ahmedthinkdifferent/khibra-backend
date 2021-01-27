require("dotenv").config();
const jwt = require("jsonwebtoken");

class JwtService {

    static generateJwt(user) {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        return jwt.sign(user, secretKey, {expiresIn: '720h'});
    }


    static authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) res.status(401).send({message: "UN_AUTHORIZED"});

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) res.status(403).send({message: "FORBIDDEN"});
            req.user = user;
            next();
        });
    }
}

module.exports = JwtService;

