import User from "../models/User.js";
import Profile from "../models/profile.js"
import { hashPassword,comparePassword } from "../services/hashService.js";
import { generateToken } from "../services/jwtService.js";

// register new user 

const register = async(req,res)=>{
    console.log("register auth hit")
    try{
        console.log("inside try block ")
        const {name , email , password} = req.body;
        console.log(name,email,password)
         
        // check if user already exists 
        const existingUser = await User.findOne({email})
        console.log(existingUser)
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        
        // hash password and then store it 
        const hashedPassword = await hashPassword(password)
        console.log(hashedPassword)
        
        //create new user 
        const user = new User({name,email,password:hashedPassword})
        // save this to db
        console.log(user)
        const newuser = await user.save()
        
        const profile = new Profile({name,email,userId : user._id})
        console.log(profile)

        const newprofile = await profile.save()
        console.log(newprofile)

        const fetchprofile = await Profile.findOne({userId : user._id})
        console.log(fetchprofile)
        
        
        res.status(201).json({message:"User registered successfully"})

    }
    catch(error){
        console.log("error in the register controller ", error)
       return res.status(500).json({message:"Internal server error"})
    }
}


const login = async(req,res)=>{
    console.log("login route hit ")
    try{
       const {email , password} = req.body;
       console.log(email,password)
       const user = await User.findOne({email})
       console.log(user)
       if(!user)
        return res.status(400).json({message : "user not found"})
        
       //compare hassed password 
       const isPasswordMatched = await comparePassword(password,user.password)
       console.log(isPasswordMatched)
       if(!isPasswordMatched)
        return res.status(400).json({message : "Invalid Credentials"})
       
       // create token using JWT 
       const token = generateToken({id:user._id,email : user.email});
         //create cookie 
         res.cookie("token",token,{
            httpOnly: true, // Javascript cannot read this (Security!)
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
         })
       return  res.json({message:"Login successful", user:{name : user.name , id : user._id, email : user.email}})

    }catch(error){ 
      return   res.status(500).json({message:"Internal server error"})
    }
}


//logout the user 
const logout = async(req,res)=>{
    console.log("logout route hit ")
   
    try{
            res.clearCookie('token',{
            httpOnly : true,
            secure : true,
            sameSite : 'strict'
         }) 
         return res.json({message : "Logout successful"})

    }catch(error){
        return res.status(500).json({message : "Internal server error"})
    }
}

export {register,login,logout}