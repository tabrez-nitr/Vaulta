'use client'
import React from 'react'
import Sidebar from '@/components/Sidebar'
import { TransactionProvider } from '@/context/TransactionContext'

export default function DashboardLayout({ children }) {
    return (
        <TransactionProvider>
            <div className="flex min-h-screen bg-black">
                <Sidebar />
                <main className="flex-1 ml-64 min-h-screen">
                    {children}
                </main>
            </div>
        </TransactionProvider>
    )
}
