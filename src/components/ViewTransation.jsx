import React from 'react'
import { useVaulta } from '../context/VaultaContext'

function ViewTransation() {

    const { storeElem , deleteTranscition , notionId} = useVaulta();
     
    // if there is no transactions presen
    if(storeElem.length === 0)
    {
      return(
         <div className='text-[black]/60 border-1 rounded-[4px]  mt-5 border-[black]/10 p-5 flex justify-center shadow-xl'> No recent transactions to display </div>
      )
    }


    const card = storeElem.find((elem) => elem.id === notionId)

  return (
    <div className=' '>
    <div className=' text-black mt-4'>  
        <div className='h-[60vh] overflow-y-auto gap-6 p-2'>
        {card.transactions && card.transactions.map((txn) => (
               
             <div key={txn.id} className={` text-[#113F67] mt-5 transition-all duration-200 ease-in-out p-3  px-7 rounded-[8px]    ${txn.isDebit ? 'border-[1px] border-red-300 bg-red-100' : 'border-[1px] border-green-500 bg-green-200'} hover:scale-[1.01] hover:shadow` }>
                <div className='flex justify-between'>
                  <div>
                <div className='flex justify-between'>
                <h1 className='text-[13px]'>{txn.date}</h1>
                </div>
                <div className=' gap-10 text-2xl mt-1'>
                <h1 className={`text-2xl font-semibold ${txn.isDebit ? "text-red-500" : "text-green-600" }`}>₹ {txn.amount}</h1>
                <h1 className=' text-[13px] text-[#113F67]/80'>{txn.description}</h1>
                
                </div>
                </div>

            
             <div className='text-[13px] flex gap-4'>
                <button className=' cursor-pointer rounded hover:opacity-70' >Edit <i className="ri-edit-fill"></i> </button>
                <button className=' cursor-pointer rounded hover:opacity-70' 
                onClick={(e) => {e.preventDefault(); deleteTranscition(txn.id , txn.isDebit , txn.amount)}}>Delete <i className="ri-delete-bin-7-fill"></i> </button>
                </div>
                </div>
            </div>
        ))}
        </div>
    
    </div>
    </div>
  )
}

export default ViewTransation
