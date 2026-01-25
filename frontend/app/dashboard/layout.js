'use client'
import React from 'react'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { TransactionProvider } from '@/context/TransactionContext'
import { Menu, Wallet } from 'lucide-react'

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Initialize sidebar state based on screen size
    React.useEffect(() => {
        const handleResize = () => {
             if (window.innerWidth >= 768) {
                setIsSidebarOpen(true)
             } else {
                setIsSidebarOpen(false)
             }
        }
        
        // Set initial state
        handleResize()

        // Listen for resize events to update sidebar state
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    // Toggle sidebar function
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <TransactionProvider>
            <div className="flex min-h-screen bg-black">
                {/* Mobile Header */}
                <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center">
                             <div className="absolute inset-0 bg-white blur-md opacity-20 rounded-full"></div>
                             <div className="bg-black border border-zinc-800 p-1.5 rounded-lg shrink-0 relative z-10">
                                <Wallet className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <span className="font-bold text-white tracking-tight">Vaulta</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-zinc-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                
                {/* Main Content Area */}
                <main 
                    className={`flex-1 min-h-screen transition-all duration-300 pt-16 md:pt-0 
                    ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} 
                    ml-0`}
                >
                    {children}
                </main>

                {/* Mobile Overlay Backdrop */}
                {isSidebarOpen && (
                    <div 
                        className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </TransactionProvider>
    )
}
