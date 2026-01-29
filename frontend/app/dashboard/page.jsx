'use client'
import React from 'react'
import Sidebar from '@/components/Sidebar'
import { useTransactionContext } from '@/context/TransactionContext'
import { useEffect } from 'react'


function page() {
    
    const { load_pages } = useTransactionContext();

    //load pages when dashboard is mount 
    
    useEffect(() => {
        load_pages();
    }, []);



  return (
    <div>
        <Sidebar />
    </div>
  )
}

export default page