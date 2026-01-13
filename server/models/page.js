import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    title:{
        type : String,
        default : () => `Page ${Date.now()}`
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true

    }
})

export default mongoose.model('Page',pageSchema)
