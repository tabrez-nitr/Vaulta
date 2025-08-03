import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import RegisterForm from '../components/RegisterForm'
import ViewTransation from '../components/ViewTransation'
import Account from '../components/Account'
import { useVaulta } from '../context/VaultaContext'

function MainApp() {

   const { transactionBtn , setTransactionBtn } = useVaulta();
  

   if(transactionBtn)
    return(
      <div>
         <RegisterForm/>
      </div>
    )
   

  return (
    <div className='px-12 py-8'>
      <div className=''>
        <h1 className=' text-3xl font-semibold'>Transaction Tracker</h1>
        <p className='text-[13px] text-black/55'>Welcome back, manage your finances with ease.</p>
        </div>

        <Account/>

        <div className='flex justify-between mt-17'>
          <div className='font-semibold text-[18px]'>Recent Transactions</div>
          <button className='border px-7 py-1 bg-[#3B38A0] text-white rounded-[4px]' onClick={(e)=> {e.preventDefault(); setTransactionBtn(true);}}> <i className="ri-add-line"></i> Add Transaction</button>
        </div>
        <ViewTransation/>

       
    </div>
  )
}

export default MainApp
