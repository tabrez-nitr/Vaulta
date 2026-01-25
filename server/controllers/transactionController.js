import Transaction from "../models/Transactions.js";
import Page from "../models/Page.js";
import Transactions from "../models/Transactions.js";

//creat new transactions 
const createTransaction = async(req,res)=>{
    console.log(" 1 - add new transaction hit")
    try{

    // take req inputs from here 
    const {amount , type , note} = req.body;

    console.log("2 - amount , type , note",amount , type , note)
    //get the page id from the url 
    const {pageId} = req.params
    const userId = req.user.id

    console.log("3 - pageId",pageId)
    console.log("4 - userId",userId)
    //check if page exists and belong to the same user 
    const page = await Page.findOne({_id : pageId , userId})
   
    console.log("5 - page",page)
    if(!page){
        return res.status(404).json({message:"Page not found"})
    }

    console.log("6 - page",page)
     const transaction = new Transactions({
        amount,
        type,
        note,
        pageId
     })
     await transaction.save()
     console.log("7 - transaction",transaction)
     return res.status(201).json({message:"Transaction created Successfully",transaction})



    }
    catch(error){
       console.log("Transaction didn't save , ", error)
       return res.status(500).json({message: "Internal server error"})
    }
    
}



const getAllTransactions =async(req,res)=>{
    console.log("1 Get all transaction hit")
    try{
      // get input 
      const  {pageId} = req.params
      const userId = req.user.id
      console.log("2 pageId",pageId)
      console.log("3 userId",userId)
    
       // get user 
      const user = await Page.findOne({_id: pageId, userId})
      console.log("4 user",user)
      if(!user)
      {
        return res.status(404).json({message : "No such page exists"})
      }
       
      //get all trabsactions of one page 
      const transactions = await Transactions.find({pageId}).sort({createdAt : -1})

      console.log("transactions",transactions)
      return res.status(200).json({message: "Transactions fetched successfully", transactions})


    }catch(error){
        console.log(error)
        return res.status(404).json({message: "can not find transactions"})
    }
}


//delete transaction 
const deleteTransaction = async(req,res)=>{
    console.log()
    try{
        //get input 
        const {userId} = req.user._id;
        const {pageId , transactionId} = req.params;

        //check if page exists and belong to the same user 
        const page = await Page.findOne({_id : pageId , userId})

        if(!page){
            return res.status(404).json({message:"Page not found"})
        }
          
        //delete the req transaction 
        const deletedTransaction = await Transactions.findOneAndDelete({_id : transactionId})

        if(!deletedTransaction){
            return res.status(404).json({message:"Transaction not found"})
        }

        res.status(200).json({message:"Transaction deleted successfully"})


    }catch(error){
        console.log(error,"there was an error while deleting transaction")
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateTransaction = async(req,res)=>{
    try{

        //get input 
        const {userId} = req.user._id;
        const {pageId , transactionId} = req.params;

        //check if page exists and belong to the same user 
        const page = await Page.findOne({_id : pageId , userId})

        if(!page){
            return res.status(404).json({message:"Page not found"})
        }

        const {amount , type , note} = req.body;
        const updatedTransaction = await Transactions.findOneAndUpdate(
            {_id : transactionId, pageId : pageId},
            req.body,
            { 
                new: true, // IMPORTANT: Returns the modified document instead of the original
                runValidators: true // IMPORTANT: Ensures rules like "required" are still checked
            }
        )
        if(!updateTransaction)
            return res.status(404).json({message:"transaction was not found"})

         res.status(200).json({message: "transaction updated"})
        

    }catch(error)
    {
        console.log(error,"there was an error while updating transaction")
        return res.status(500).json({message: "Internal server error"})
    }
}
export {createTransaction, getAllTransactions , deleteTransaction , updateTransaction }