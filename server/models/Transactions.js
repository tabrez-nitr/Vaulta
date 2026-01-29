import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ['debit' , 'credit'],
        required : true
    },
    note: {
       type : String , 
       required : true
    },
    pageId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Page",
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
   
    
}, {timestamps : true})

export default mongoose.model("Transaction",transactionSchema)