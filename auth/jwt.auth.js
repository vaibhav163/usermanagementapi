const jwt = require("jsonwebtoken");

const secretKey =  process.env.SECRET_KEY

const createToken = (user)=>{
    try{
        const token = jwt.sign(
            //payload
            {
                email:user.email,
                id:user.id
            },
            secretKey,
            //options
            {
                expiresIn:"1d",
                issuer:"user_management_api"
            }
        )
        return token;
    }
    catch(err){
        throw new Error(err);
    }
}

const verifyToken=(req,res,next)=>{
    try{
        const tokenString=req.headers.authorization;
        if(!tokenString){
            res.json({
                message:"token not found"
            })
        }
        const token =tokenString.split(" ")[1];
        const decoded=jwt.verify(token,secretKey);
        if(!decoded){
            res.json({
                message:"the token you provided is incorrect"
            })
        }
    }
    catch(err){
        res.send("error ")

    }
}

module.exports = {
    createToken
}