const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req,res,next){
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if(token == null)
    return res.status(403);
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err)
        res.status(404);
        req.user=user;
        next();
    });
}
module.exports = verifyToken;