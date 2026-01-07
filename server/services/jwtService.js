import jwt from "jsonwebtoken";

const generateToken = (payLoad) =>{
    return jwt.sign(payLoad,process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
}

const verifyToken = (token) =>{
    return jwt.verify(token , process.env.JWT_SECRET)
}

export {generateToken,verifyToken}