import React, { useState } from 'react'
import { useVaulta } from '../context/VaultaContext'
import { v4 as uuidv4 } from 'uuid';


function RegisterForm() {

     const [amt , setAmt] = useState("")
     const [description , setDescription] =  useState("")
     
     const [ isDebit , setIsDebit ] = useState(true) // checks if it is debit or credit amt intially it will be true 
    //   take all necessary  variables using provider
     const  { updateAmt , setStoreElem , storeElem } = useVaulta()


    //  used to store transcition 
     const addTransation = () =>{
        // update amt and other calculation using context
             updateAmt( amt , isDebit) // here amt will be updated 
             // update total transcition in array 
             setStoreElem([{
                id : uuidv4(),
                amount : amt ,
                description : description,
                isDebit : isDebit

             } , ...storeElem])

     }

  return (
    <div className=' mt-10'>
      <form >
       
       <input type="number" placeholder='Enter Amount' value={amt} onChange={(e)=>setAmt(e.target.value)} /><br />

       <div className='flex gap-10'>
       <button onClick={(e) => 
       {e.preventDefault()
        setIsDebit(!isDebit)}}>Debit</button>
       <button onClick={(e) => 
       {e.preventDefault()
        setIsDebit(!isDebit)}}>Credit</button>
        </div><br />
       <input type="text" placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />

       <button onClick={(e)=>{e.preventDefault 
        addTransation()
       }}></button>
       
      </form>
    </div>
  )
}

export default RegisterForm
