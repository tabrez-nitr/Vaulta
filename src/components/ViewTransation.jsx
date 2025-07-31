import React from 'react'
import { useVaulta } from '../context/VaultaContext'

function ViewTransation() {

    const { storeElem , deleteTranscition } = useVaulta();

  return (
     <div className='mt-12'>
     { storeElem.length !== 0 && <h1 className='font-semibold ml-50'>Recent Transactions </h1> }
    <div className='flex  justify-center text-black mt-4'>  
        <div className='grid grid-cols-2 gap-4'>
        {storeElem && storeElem.map((elem) => (
             <div key={elem.id} className={` text-[#113F67] transition-all duration-200 ease-in-out p-3 px-7 w-[36vw]   rounded-[2px] ${elem.isDebit ? 'border-l-[4px] border-red-500 bg-red-100' : 'border-l-[4px] border-green-500 bg-green-200'} hover:scale-[1.01] hover:shadow` }>
                <div className='flex justify-between'>
                <h1 className='text-[13px]'>{elem.date}</h1>
                <div className='text-[13px] flex gap-4'>
                <button className=' cursor-pointer rounded ' >Edit <i className="ri-edit-fill"></i> </button>
                <button className=' cursor-pointer rounded ' 
                onClick={(e) => {e.preventDefault(); deleteTranscition(elem.id)}}>Delete <i className="ri-delete-bin-7-fill"></i> </button>
                </div>
                </div>
                <div className=' gap-10 text-2xl mt-3'>
                <h1 className={`text-2xl font-semibold ${elem.isDebit ? "text-red-500" : "text-green-500" }`}>₹ {elem.amount}</h1>
                <h1 className='mt-2 text-[16px] text-[#113F67]/80'>{elem.description}</h1>
                
                </div>

            </div>
        ))}
        </div>
    
    </div>
    </div>
  )
}

export default ViewTransation
