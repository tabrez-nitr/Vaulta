import User from "../models/User";
import { hashPassword,comparePassword } from "../services/hashService";
import { generateToken } from "../services/jwtService";

// register new user 

const register = async(req,res)=>{
    try{
        const {name , email , password} = req.body;
        // check if user already exists 
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        
        // hash password and then store it 
        const hashedPassword = await hashPassword(password)
        
        //create new user 
        const user = new User({name,email,hashedPassword})
        // save this to db
        await user.save()

        res.status(201).json({message:"User registered successfully"})

    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}


const login = async(req,res)=>{
    try{
       const {email , password} = req.body;
       const user = await User.findOne({email})
       if(!user)
        return res.status(400).json({message : "user not found"})
        
       //compare hassed password 
       const isPasswordMatched = await comparePassword(password,user.hashedPassword)
       if(!isPasswordMatched)
        return res.status(400).json({message : "Invalid Credentials"})
       
       // create token using JWT 
       const token = generateToken({id:user._id,email : user.email});

       res.json({message:"Login successful",token})

    }catch(error){ 
        res.status(500).json({message:"Internal server error"})
    }
}

export {register,login}