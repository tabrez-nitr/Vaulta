'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function Sidebar() {
    const pathname = usePathname()

    const links = [
        {
            name: 'Overview',
            href: '/dashboard',
            icon: LayoutDashboard
        },
        {
            name: 'Incomes',
            href: '/dashboard/incomes',
            icon: TrendingUp
        },
        {
            name: 'Expenses',
            href: '/dashboard/expenses',
            icon: TrendingDown
        }
    ]

    return (
        <div className="w-64 border-r border-zinc-800 bg-black flex flex-col h-screen fixed left-0 top-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                    <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Vaulta</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/10 text-blue-500'
                                    : 'text-gray-400 hover:text-white hover:bg-zinc-900'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-500 group-hover:text-white'
                                }`} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User/Footer Area (Optional) */}
            <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Sam Stabrez</p>
                        <p className="text-xs text-gray-500">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
