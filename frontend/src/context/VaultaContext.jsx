import { Children, createContext , useContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';



const VaultaContext = createContext();

export const useVaulta = () =>
{
    return useContext(VaultaContext)
}

export const VaultaContextProvider = ({children}) =>{


     // elemeent for better ux adding a btn to show register form inside blank page 
     const[ transactionBtn , setTransactionBtn ] = useState(false)

     //for notion card keep a variable NotionId which checks which is the current id opened and prints according to that 
     // if we do this then we need to store seprate profit and loss of each notion card 

     const [ notionId , setNotionId ] = useState(uuidv4()) // intillay keeping an id to show the default page if nothing is clicked 

      // create a default notion card to show user 
      const [ storeElem , setStoreElem ] = useState([
         {
          id: notionId ,
          name : "Default Card", 
          totalPandL : 0,  // stores indiviaul profit and loss for each card 
          totalProfit : 0,
          totalExpenses : 0,
          transactions : []
         }
      ]) // to store indivuial tranction 

      // [{
      //   id : 1,
      //   name : janurary,
      //   transactions : [
      //     {
      //       id :, 
      //       date :,
      //       amount : ,
      //       isDebit : ,
      //       description : ,
      //       category : ,
      //     }
      //   ]
      // }]
    //   id : 
    //   date : ,
    //   amount : ,
    //   isDebit : debit/credit, debit == true
    //   descrtiption : ,
    //   category,

    // maintain this variables to direclty put values inside objects 
      const [ totalpandl , setTotalpandl ] = useState(0) // to calculate total profit and loss this month
      const [ totalExpenses , setTotalExpenses] = useState(0) // to store total expenses
      const [ totalProfit , setTotalProfit ] = useState(0) // to store total profit 
    
       
      // updates the account when new transcition is added 
   




    return(
        <VaultaContext.Provider value={{ storeElem , setStoreElem , totalpandl ,setTotalpandl, totalExpenses , setTotalExpenses , totalProfit , setTotalProfit , transactionBtn , setTransactionBtn , notionId , setNotionId}} >
            {children}
        </VaultaContext.Provider>
          )
 }