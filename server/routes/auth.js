//middleware
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { // no token
            return res.status(401).json({ error: true, message: "No token provided"});
        }
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: true, message: "Invalid or expired token" });
            }
            req.user = decoded;
            next();
        });
    }catch (error){
        res.status(401).json({error: true, message: "Authentication failed!" });
    }
}