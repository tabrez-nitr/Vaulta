'use client'
import React from 'react'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { TransactionProvider } from '@/context/TransactionContext'

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <TransactionProvider>
            <div className="flex min-h-screen bg-black">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className={`flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    {children}
                </main>
            </div>
        </TransactionProvider>
    )
}
