import bcrypt from "bcryptjs";

const hashPassword = async(plainPassword)=>{
    // bcrypt.hash generates a hashed version of the password
   // The number 10 is the salt rounds, which affects the hashing complexity
    return await bcrypt.hash(plainPassword,10)
}

const comparePassword = async(plainPassword,hashedPassword)=>{
    //compares it and returns either true or false 
    return await bcrypt.compare(plainPassword,hashedPassword)
}

export {hashPassword,comparePassword}