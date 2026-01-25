'use client'
import React, { useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Wallet, Plus, TrendingUp, TrendingDown, Clock, Trash2, Pencil } from 'lucide-react'
import { useTransactions } from '@/context/TransactionContext'

export default function DashboardPage() {
    const { transactions: rawData, openAddModal, openEditModal, deleteTransaction } = useTransactions()

    // 1. Data Normalization (The Fix)
    // We check if the incoming data is already an array. If not, we look for the .transactions property inside it.
    // If both fail, we fallback to an empty list [] to prevent crashes.
    const transactions = useMemo(() => {
        if (Array.isArray(rawData)) return rawData;
        if (rawData && Array.isArray(rawData.transactions)) return rawData.transactions;
        return [];
    }, [rawData]);

    // 2. Derived State: Calculate totals using the safe 'transactions' array
    const { total, credit, debit } = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            // Ensure amount is treated as a number
            const amt = Number(curr.amount) || 0;
            
            if (curr.type === 'credit') {
                acc.credit += amt
                acc.total += amt
            } else {
                acc.debit += amt
                acc.total -= amt
            }
            return acc
        }, { total: 0, credit: 0, debit: 0 })
    }, [transactions])

    return (
        <div className="p-8 font-sans space-y-8 min-h-screen bg-black text-white">
            
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Dashboard
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Overview of your finances</p>
                </div>
                
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
                <div className="bg-black border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 transition-all duration-300 group relative overflow-hidden">
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Balance</p>
                            <h2 className="text-3xl font-bold mt-2 text-white tracking-tight">
                                ${total.toLocaleString()}
                            </h2>
                        </div>
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                </div>

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

            {/* Transactions Section */}
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
                        <h3 className="text-sm font-medium text-white">No transactions yet</h3>
                        <p className="text-zinc-500 text-sm mt-1">Add your first income or expense to get started</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {transactions.map((tx) => (
                            <div
                                // Fallback to index if _id is missing, though _id should exist from Mongo
                                key={tx._id || Math.random()} 
                                className="bg-black border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-200 group"
                            >
                                <div className="flex flex-1 items-center gap-4 min-w-0">
                                    <div className={`shrink-0 p-2.5 rounded-lg border ${tx.type === 'credit'
                                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-green-400 group-hover:border-green-400/20'
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-red-400 group-hover:border-red-400/20'
                                        } transition-colors`}>
                                        {tx.type === 'credit' ? (
                                            <TrendingUp className="w-5 h-5" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors truncate">
                                            {/* Fix: Backend uses 'note', not 'description' */}
                                            {tx.note || "No description"} 
                                        </h3>
                                        {/* Fix: Backend uses timestamps, so we use 'createdAt' */}
                                        <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                                            {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'Date N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:gap-6 shrink-0 ml-2">
                                    <div className={`text-sm font-bold font-mono ${tx.type === 'credit' ? 'text-white' : 'text-zinc-400'
                                        }`}>
                                        {tx.type === 'credit' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                                    </div>

                                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(tx)}
                                            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            // Fix: Mongo uses _id, not id
                                            onClick={() => deleteTransaction(tx._id)}
                                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                                            title="Delete"
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