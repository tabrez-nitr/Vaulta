import React from 'react'
import { useVaulta } from '../context/VaultaContext'



// all calculation profit and loss is shown here 
function Account() {

  const { totalpandl , totalExpenses , totalProfit } = useVaulta();

  return (
    <div className=' mt-5'>
        <div className='grid grid-cols-3 gap-10 rounded-[8px]  '>

        

            {/* for net balance */}
            <div className='border-1 p-5 rounded-[8px] shadow-xl'>
               <span className='text-[13px] text-black/60'>Net Balance</span>
               <h1 className={`text-2xl font-semibold ${ totalpandl>=0 ? 'text-green-600' : 'text-red-500'} `}>₹ {totalpandl}</h1>
            </div>
            {/* for spent and got  */}
          

                <div className='border-1 p-5 rounded-[8px] shadow-xl'>
                <span className='text-[13px] text-black/60'>You Spent <i className="text-red-600 ri-arrow-right-up-long-line"></i></span>
                <h1 className='text-xl font-semibold text-red-600'>₹ {totalExpenses}</h1>
                </div> 
                
                <div className='border-1 p-5 rounded-[8px] shadow-xl'>
                <span className='text-[13px] text-black/60'>You Got <i className=" text-green-700 ri-arrow-left-down-long-line"></i></span>
                <h1 className='text-xl font-semibold text-green-600'>₹ {totalProfit}</h1>
                </div>


          

   
        </div>
    
    </div>
  )
}

export default Account
