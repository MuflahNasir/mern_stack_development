const config = require("config")
const jwt = require("jsonwebtoken")

function auth (req, res, next) {
    const token = req.header("x-auth-token")

    if(!token) return res.status(401).json({ msg: "Unauthorized User" })

    try{
        //verify token

        const decode = jwt.verify(token, config.get("jetSecret"))

        //add user from payload

        req.user = decode
        next();
    } catch(e) {
        res.status(400).json({ msg: "Token is not valid" })
    }
}

module.exports = auth