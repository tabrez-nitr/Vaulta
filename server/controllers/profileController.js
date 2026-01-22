import User from "../models/User.js";
import Profile from "../models/profile.js";

const editProfile = async(req,res)=>{
    const {name , email , phoneNumber , profilePicture } = req.body;
    const userId = req.user._id;
    try{
        const user = await User.findOne({userId})
        if(!user)
            return res.status(404).json({message : "User not Found"})
        
        
        const updateUser = await Profile.findOneAndUpdate({userId},req.body,{new:true})
        await updateUser.save();
        return res.status(200).json({message: "Profile Updated Successfully"})

    }catch(error)
    {
        console.log("error in the edit profile controller ", error)
        return res.status(500).json({message: "internal server error"})
    }
}

const getProfile = async(req,res)=>{

    console.log("1 get profle hit")
    const userId = req.user.id;
    console.log("2 userId",userId)
    try{
        const user = await User.findById(userId)
        console.log("3 user",user)
        if(!user)
        {
            console.log("4 user not found")
            return res.status(404).json({message : "No User Exists"})
        }
        const profile = await Profile.findOne({ userId: new mongoose.Types.ObjectId(userId) });
        console.log("5 profile",profile)
        if(!profile){
            console.log("6 profile not found")
            return res.status(404).json({message : "No Profile Exists"})
        }
        console.log("7 profile found")
        return res.status(200).json({message : "Profile Fetched Successfully" , profile})

    }catch(error){
        console.log("error in fetching profile" , error)
        return res.status(500).json({message:"Unable to fetch the profile"})
    }
}

export {editProfile , getProfile}
