import React, { useEffect, useState } from 'react'
import { useVaulta } from '../context/VaultaContext'
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
 import {  toast , Slide} from 'react-toastify';


function RegisterForm() {

     console.log("register form mounted")

      // take cuurent date 
      const now = new Date();
      const formattedDateTime = format(now, "do MMMM yyyy  hh:mm a");

     const [amt , setAmt] = useState("")
     const [description , setDescription] =  useState("")

     const [ isDebit , setIsDebit ] = useState(true) // checks if it is debit or credit amt intially it will be true 
    //   take all necessary  variables using provider
     const  { setStoreElem , storeElem , transactionBtn , setTransactionBtn , notionId ,totalProfit , setTotalProfit , totalpandl ,setTotalpandl, totalExpenses , setTotalExpenses} = useVaulta()

     useEffect(() => {
    console.log("storeElem updated", storeElem);
   }, [storeElem])


   //  used to store transcition 
     const addTransation = (e) =>{
      // changing transaction btn for empty page only for register form 
      setTransactionBtn(false)

      e.preventDefault();
      console.log(amt)
      if(amt == "")
        return
        // update amt and other calculation using context
        console.log("inside add Transition ")

        // maintain total profit , loss and net here 
       const amount = Number(amt)
        if(isDebit)
        {
          const tempExpense = totalExpenses + amount;
          const tempNet = totalpandl - amount;
          setTotalExpenses(tempExpense)
          setTotalpandl(tempNet)
        }
        else{
          const tempProfit = totalProfit + amount;
          const tempNet = totalpandl + amount;
          setTotalProfit(tempProfit)
          setTotalpandl(tempNet)
        }

        console.log(totalpandl)
        
            
         // create new transaction 
           const newTransaction = {
                date: formattedDateTime,
                id : uuidv4(),
                amount : amount ,
                description : description,
                isDebit : isDebit
             }
              
          

            setStoreElem((prevElem) => { // we are using prev state to get hold of all the elemes
              return prevElem.map((elem) => {  // map through each element (map gives a new array) and check which id matches
                    if (elem.id === notionId) { //when the id is matched 
                       return { //we return new object inside it with prev values and new transactions
                           ...elem,
                           totalPandL : totalpandl,
                           totalExpenses : totalExpenses,
                           totalProfit : totalProfit,
                            transactions: [...elem.transactions, newTransaction],
                             };
                          }
                     return elem;
                  });
            });
            // reset values to original values 
            setAmt("")
            setDescription("")
            setIsDebit(true)
            
             console.log(storeElem);
             console.log(amt)

             // toats feature interaction 
            toast.success('New Transaction Added', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
           });

     }

     

  return (
    <div className='flex justify-center mt-40  '>
      <div className=' flex justify-center'>
      <form onSubmit={addTransation} className=' p-9 rounded-[4px] border-1 border-[black]/20 shadow-xl' >
         <h1  className='font-semibold mb-3'>New Transaction </h1>
        <div className='flex gap-5'>
          <div className={`border-1 flex rounded-[4px] ${isDebit ? "border-[#E74C3C]" : "border-[#00A65A]"}`}>
        <div className={`pl-2 py-2 text-2xl flex justify-center ${isDebit ? 'text-[#E74C3C]' : 'text-[#00A65A]'}`}>
         ₹
       </div>
       <input type="number" className={`w-100 h-12 p-3 text-2xl focus:outline-none ${isDebit ? "text-[#E74C3C] placeholder:text-[#E74C3C]/60" : "text-[#00A65A] placeholder:text-[#00A65A]/60"}`} placeholder='Enter amount' value={amt} onChange={(e)=>setAmt(e.target.value)} />
       </div>
       <div className={` flex justify-center p-[1px] rounded-[5px]  transition-opacity ${isDebit ? "border-2 border-[#E74C3C]" : ""} `}>
      <button type='button' className={`border-1 p-2 w-50 rounded-[4px]   cursor-pointer text-white bg-[#E74C3C]`} onClick={() => setIsDebit(true)}>Debit ₹</button>
      </div>
      <div className={` flex justify-center p-[1px] rounded-[5px]  text-white transition-opacity ${isDebit ? "" : "border-2 border-[#00A65A]"}`}>
      <button type='button' className={`border-1 p-2 w-50 rounded-[4px]   cursor-pointer bg-[#00A65A] `}  onClick={() => setIsDebit(false)}>Credit ₹</button>
      </div>
        </div><br />
       <textarea className='w-full h-[10vh] p-3 border-1 mb-5 focus:outline-none rounded-[4px] border-[#113F67]'  type="text" placeholder='Enter details (Items , bill no , quantity , etc)' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />
       <div className='flex justify-end'>
       <button type='submit' className=' p-3 rounded-[4px] bg-[#3B38A0] text-white '> Add Transaction</button>
       </div>   
      </form>
      </div>
    </div>
  )
}

export default RegisterForm
