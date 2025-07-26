import React, { useEffect, useState } from 'react'
import { useVaulta } from '../context/VaultaContext'
import { v4 as uuidv4 } from 'uuid';


function RegisterForm() {

     const [amt , setAmt] = useState("")
     const [description , setDescription] =  useState("")

     
     const [ isDebit , setIsDebit ] = useState(true) // checks if it is debit or credit amt intially it will be true 
    //   take all necessary  variables using provider
     const  { updateAccount , setStoreElem , storeElem } = useVaulta()

     useEffect(() => {
  console.log("storeElem updated", storeElem);
}, [storeElem])


    //  used to store transcition 
     const addTransation = (e) =>{
      e.preventDefault();
      console.log(amt)
        // update amt and other calculation using context
        console.log("inside add Transition ")
             updateAccount( amt , isDebit) // here amt will be updated 
            
             // create new transaction 
             const newTransaction = {
               id : uuidv4(),
                amount : amt ,
                description : description,
                isDebit : isDebit
             }
           
            const newStoreElem = [newTransaction , ...storeElem]
            setStoreElem(newStoreElem)
            setAmt("")
            setDescription("")
            setIsDebit(true)
            
             console.log(storeElem);
             console.log(amt)

     }

     

  return (
    <div className='flex justify-center mt-10 '>
      <div className=' flex justify-center'>
      <form onSubmit={addTransation} className='border-1 p-5' >
        <div className='flex gap-5'>
          <div className={`border-1 flex rounded-[8px] ${isDebit ? "border-[#E74C3C]" : "border-[#00A65A]"}`}>
        <div className={`pl-2 py-2 text-2xl flex justify-center ${isDebit ? 'text-[#E74C3C]' : 'text-[#00A65A]'}`}>
         ₹
       </div>
       <input type="number" className={`w-100 h-12 p-3 text-2xl focus:outline-none ${isDebit ? "text-[#E74C3C] placeholder:text-[#E74C3C]/60" : "text-[#00A65A] placeholder:text-[#00A65A]/60"}`} placeholder='Enter amount' value={amt} onChange={(e)=>setAmt(e.target.value)} />
       </div>
       <div className={` flex justify-center p-[1px] rounded-[8px]  transition-opacity ${isDebit ? "border-2 border-[#E74C3C]" : ""} `}>
      <button type='button' className={`border-1 p-2 w-22 rounded-[8px]   cursor-pointer text-white bg-[#E74C3C]`} onClick={() => setIsDebit(true)}>Debit ₹</button>
      </div>
      <div className={` flex justify-center p-[1px] rounded-[8px]  text-white transition-opacity ${isDebit ? "" : "border-2 border-[#00A65A]"}`}>
      <button type='button' className={`border-1 p-2 w-22 rounded-[8px]   cursor-pointer bg-[#00A65A] `}  onClick={() => setIsDebit(false)}>Credit ₹</button>
      </div>
        </div><br />
       <input className='w-full p-3 border-1 mb-5 focus:outline-none'  type="text" placeholder='Enter details (Items , bill no , quantity , etc)' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />

       <button type='submit' className='border-1 p-2'> Add Transition </button>   
      </form>
      </div>
    </div>
  )
}

export default RegisterForm
