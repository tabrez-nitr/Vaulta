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
          if(isDebit == true)
          {
            setTotalPandL((prev)=> (prev-amt))
            setTotalExpenses((prev)=>(prev+amt))
          }
          else
          {
            setTotalPandL((prev)=> (prev+amt))
            setTotalProfit((prev) => (prev+amt))
          }
      }

      const deleteTranscition = (id) => {
         
        storeElem.find((el) =>{ 
        if(el.id === id){
           updateAccount(el.amt , isDebit) // to update all balance sheet before deleting 
        }
        return false; })

        setStoreElem.filter((elem) => elem.id !== id ) // deleting this transition 
      }


    return(
        <VaultaContext.Provider value={{storeElem , setStoreElem , totalpandl , totalExpenses , setTotalExpenses , totalProfit , setTotalProfit, deleteTranscition , updateAccount }} >
            {children}
        </VaultaContext.Provider>
    )
}