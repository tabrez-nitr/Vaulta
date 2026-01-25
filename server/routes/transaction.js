import router from 'express'
import * as TransactionController from '../controllers/transactionController.js'

const transactionRouter = router()


transactionRouter.get('/',(req,res)=>{
    console.log("testing route hit ")
    return res.status(200).json({message : "testing route hit"})
})
//create new transaction 
transactionRouter.post('/add/:pageId',TransactionController.createTransaction)
//get all transactions of a page
transactionRouter.get('/getTransactions/:pageId',TransactionController.getAllTransactions)
//delete a transaction from a page 
transactionRouter.delete('/deleteTransaction/:pageId/:transactionId',TransactionController.deleteTransaction)
//update a transaction from a page 
transactionRouter.put('/updateTransaction/:pageId/:transactionId',TransactionController.updateTransaction)


export default transactionRouter







