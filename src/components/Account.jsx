import React from 'react'



// all calculation profit and loss is shown here 
function Account() {
  return (
    <div className=' w-full flex justify-center mt-5'>
        <div className='flex justify-between w-300 px-5 rounded-[8px] shadow-xl p-3'>

        

            {/* for net balance */}
            <div className=''>
               <span className='text-[13px] text-black/60'>Net Balance</span>
               <h1 className='text-2xl font-semibold text-green-600'>₹ 1000</h1>
            </div>
            {/* for spent and got  */}
            <div className='flex gap-10'>

                <div>
                <span className='text-[13px] text-black/60'>You Spent <i className="text-red-600 ri-arrow-right-up-long-line"></i></span>
                <h1 className='text-xl font-semibold text-red-600'>₹ 1000</h1>
                </div> 
                
                <div>
                <span className='text-[13px] text-black/60'>You Got <i className=" text-green-700 ri-arrow-left-down-long-line"></i></span>
                <h1 className='text-xl font-semibold text-green-600'>₹ 1000</h1>
                </div>


          

        </div>
        </div>
    
    </div>
  )
}

export default Account
