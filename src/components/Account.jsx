import React from 'react'
import { useVaulta } from '../context/VaultaContext'



// all calculation profit and loss is shown here 
function Account() {

  const { totalpandl , totalExpenses , totalProfit } = useVaulta();

  return (
    <div className=' mt-5'>
        <div className='grid grid-cols-3 gap-8 rounded-[8px]  '>

        

            {/* for net balance */}
            <div className='border-1 p-5 border-[black]/30 rounded-[8px] shadow-xl'>
               <span className='text-[13px] text-black/60'>Net Balance</span>
               <h1 className={` text-[30px]  font-semibold ${ totalpandl>=0 ? 'text-green-600' : 'text-red-500'} `}>₹ {totalpandl}</h1>
            </div>
            {/* for spent and got  */}
          

                <div className='border-1 border-[black]/30 p-5 rounded-[8px] shadow-xl'>
                <div className='flex justify-between'>
                <span className='text-[13px] text-black/60'>You Spent</span>
                 <i className="text-red-600 font-semibold ri-arrow-right-up-long-line"></i>
                </div>
                <h1 className='text-[30px] font-semibold text-red-600'>₹ {totalExpenses}</h1>
                </div> 
                
                <div className='border-1 p-5 border-[black]/30 rounded-[8px] shadow-xl'>
                <div className='flex justify-between'>
                <span className='text-[13px] text-black/60'>You Got </span>
                <i className=" text-green-700 font-semibold ri-arrow-left-down-long-line"></i>
                </div>
                <h1 className='text-[30px] font-semibold text-green-600'>₹ {totalProfit}</h1>
                </div>


          

   
        </div>
    
    </div>
  )
}

export default Account
