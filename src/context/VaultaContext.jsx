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
      const [ totalpandl , setTotalPandL ] = useState(0) // to calculate total profit and loss this month
      const [ totalExpenses , setTotalExpenses] = useState(0) // to store total expenses
      const [ totalProfit , setTotalProfit ] = useState(0) // to store total profit 
    
       
      // updates the account when new transcition is added 
      const updateAccount = (amt , isDebit) =>{
          const amount = Number(amt)
          if(isDebit == true)
          {
            const newTotalPandL = totalpandl - amount;
            setTotalPandL(newTotalPandL)
            const newTotalExpenses = totalExpenses + amount;
            setTotalExpenses(newTotalExpenses)
          }
          else
          {
            const newTotalPandL = totalpandl + amount;
            setTotalPandL(newTotalPandL)
            const newTotalProfit = totalProfit + amount;
            setTotalProfit(newTotalProfit)

          }


          console.log("Net Amount :" +  totalpandl )
      }
        // if not defined is debit so it may show some error 


      const deleteTranscition = (id , isDebit , amt) => {
           
           const amount = Number(amt);
           
        
           if(isDebit)
            {
              setTotalPandL((prev) => prev + amount)
              setTotalExpenses((prev) => prev - amount)
            } 
            else{
              setTotalPandL((prev) => prev - amount)
              setTotalProfit((prev) => prev - amount)
            }
            // to update all balance sheet before deleting 
        setStoreElem(storeElem.filter(elem => elem.id !== id)) // deleting this transition 
      }


    return(
        <VaultaContext.Provider value={{ storeElem , setStoreElem , totalpandl , totalExpenses , setTotalExpenses , totalProfit , setTotalProfit , deleteTranscition , updateAccount , transactionBtn , setTransactionBtn , notionId , setNotionId}} >
            {children}
        </VaultaContext.Provider>
          )
 }