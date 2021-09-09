const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if(token == null)
    return res.status(403);
    jwt.verify(token,"this is secret key",(err,user)=>{
        if(err)
        res.status(404);
        req.user=user;
        next();
    });
}
module.exports = verifyToken;
// const createToken = async()=>{
//     const token = await jwt.sign({name:"Sanjay Bharti"},"i am sanjay bharti");
//     console.log(token);
//     const verify = jwt.verify(token,"i am sanjay bharti");
//     console.log(verify);
// }
// createToken();