// app/dashboard/[pageId]/DashboardView.js
'use client'

import React, { useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Wallet, Plus, TrendingUp, TrendingDown, Clock, Trash2, Pencil } from 'lucide-react'
import { useTransactions } from '@/context/TransactionContext'

export default function DashboardView({ transactions = [] }) {
    const { openAddModal, openEditModal, deleteTransaction } = useTransactions()

    // Derived State
    const { total, credit, debit } = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            if (curr.type === 'credit') {
                acc.credit += curr.amount
                acc.total += curr.amount
            } else {
                acc.debit += curr.amount
                acc.total -= curr.amount
            }
            return acc
        }, { total: 0, credit: 0, debit: 0 })
    }, [transactions])

    return (
        // Main Container: Matches the black background of the sidebar
        <div className="p-8 font-sans space-y-8 min-h-screen bg-black text-white">
            
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Dashboard
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Overview of your finances</p>
                </div>
                
                {/* Primary Action: High contrast White button */}
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 active:scale-95 border border-transparent"
                >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Transaction</span>
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Balance Card */}
                <div className="bg-black border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 transition-all duration-300 group relative overflow-hidden">
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Balance</p>
                            <h2 className="text-3xl font-bold mt-2 text-white tracking-tight">
                                ${total.toLocaleString()}
                            </h2>
                        </div>
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                    {/* Subtle glow effect behind the card */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
                </div>
                
                {/* Credit Card */}
                 <div className="bg-black border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Credit</p>
                            <h2 className="text-3xl font-bold mt-2 text-white">
                                +${credit.toLocaleString()}
                            </h2>
                        </div>
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-green-400 transition-colors">
                            <ArrowDownLeft className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                 {/* Debit Card */}
                 <div className="bg-black border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Debit</p>
                            <h2 className="text-3xl font-bold mt-2 text-white">
                                -${debit.toLocaleString()}
                            </h2>
                        </div>
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-red-400 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                    {transactions.length > 0 && (
                        <span className="text-xs text-zinc-500 font-mono border border-zinc-800 px-2 py-1 rounded-md bg-zinc-900">
                            {transactions.length} ITEMS
                        </span>
                    )}
                </div>

                {transactions.length === 0 ? (
                    <div className="bg-black border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-zinc-500">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-medium text-white">No transactions found</h3>
                        <p className="text-zinc-500 text-sm mt-1">Create your first entry to activate the dashboard.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {transactions.map((tx) => (
                            <div
                                key={tx._id}
                                className="bg-black border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-lg border ${tx.type === 'credit'
                                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-green-400 group-hover:border-green-400/20'
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-red-400 group-hover:border-red-400/20'
                                        } transition-colors`}>
                                        {tx.type === 'credit' ? (
                                            <TrendingUp className="w-5 h-5" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors">
                                            {tx.note || tx.description}
                                        </h3>
                                        <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className={`text-sm font-bold font-mono ${tx.type === 'credit' ? 'text-white' : 'text-zinc-400'
                                        }`}>
                                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                                    </div>

                                    {/* Action buttons - Hidden until hover */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(tx)}
                                            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction(tx._id)}
                                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}