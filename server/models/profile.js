
import mongoose from 'mongoose'
import { type } from 'os'

const ProfileSchema = new mongoose.Schema({

    name : {
        type : String, 
    },
    email : {
        type : String,
    },
    phoneNumber : {
        type : Number
    },
    profilePicture : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

const Profile = mongoose.model("Profile",ProfileSchema)