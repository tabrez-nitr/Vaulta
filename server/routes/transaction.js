import router from 'express'
import * as TransactionController from '../controllers/transactionController.js'

const transactionRouter = router()

//create new transaction 
transactionRouter.post('/addTransacition',TransactionController.createTransaction)
//get all transactions of a page
transactionRouter.get('/getTransactions/:pageId',TransactionController.getAllTransactions)
//delete a transaction from a page 
transactionRouter.delete('/deleteTransaction/:pageId/:transactionId',TransactionController.deleteTransaction)
//update a transaction from a page 
transactionRouter.put('/updateTransaction/:pageId/:transactionId',TransactionController.updateTransaction)


export default transactionRouter







