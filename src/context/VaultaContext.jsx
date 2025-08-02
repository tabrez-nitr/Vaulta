import { Children, createContext , useContext } from "react";
import { useState } from "react";



const VaultaContext = createContext();

export const useVaulta = () =>
{
    return useContext(VaultaContext)
}

export const VaultaContextProvider = ({children}) =>{

      const [ storeElem , setStoreElem ] = useState([]) // to store indivuial tranction 
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
        <VaultaContext.Provider value={{ storeElem , setStoreElem , totalpandl , totalExpenses , setTotalExpenses , totalProfit , setTotalProfit , deleteTranscition , updateAccount }} >
            {children}
        </VaultaContext.Provider>
          )
 }