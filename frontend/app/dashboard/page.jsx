'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useTransactionContext } from '@/context/TransactionContext'
import { useEffect } from 'react'
import Transactions from '@/components/Transactions'


function page() {
    
    const { load_pages } = useTransactionContext();
    const [collapsed, setCollapsed] = useState(false);

    //load pages when dashboard is mount 
    useEffect(() => {
        load_pages();
    }, []);


  return (
    <div className='flex min-h-screen bg-black'>
      
      {/* Sidebar (Fixed) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Transactions />
      </main>

    </div>
  )
}

export default page