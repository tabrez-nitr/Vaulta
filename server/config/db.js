import mongoose from "mongoose";

//connect with mongodb database

const connectDB = async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI)
         console.log("MongoDB connected")
    }
    catch(error){
        console.log("MONGODB CONNECTION ERROR",error)
    }
}

export default connectDB