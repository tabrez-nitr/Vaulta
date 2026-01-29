import router from 'express'
import * as TransactionController from '../controllers/transactionController.js'

const transactionRouter = router()



//create new transaction 
transactionRouter.post('/add/:pageId',TransactionController.createTransaction)
//get all transactions of a page
transactionRouter.get('/:pageId',TransactionController.getAllTransactions)
//delete a transaction from a page 
transactionRouter.delete('/:pageId/:transactionId',TransactionController.deleteTransaction)
//update a transaction from a page 
transactionRouter.put('/:pageId/:transactionId',TransactionController.updateTransaction)


export default transactionRouter







