'use client'
import React, { useMemo } from 'react'
import { ArrowDownLeft, TrendingUp, Clock, Trash2, Pencil, Plus } from 'lucide-react'
import { useTransactions } from '@/context/TransactionContext'

export default function IncomesPage() {
    const { transactions, openAddModal, openEditModal, deleteTransaction } = useTransactions()

    const incomeTransactions = useMemo(() => {
        return transactions.filter(t => t.type === 'credit')
    }, [transactions])

    const totalIncome = useMemo(() => {
        return incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0)
    }, [incomeTransactions])

    return (
        <div className="p-8 font-sans space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Incomes</h1>
                    <p className="text-gray-400 mt-2">Track your revenue and earnings</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    New Transaction
                </button>
            </header>

            {/* Income Stats */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-green-500/30 transition-all duration-300 group max-w-md">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">Total Income</p>
                        <h2 className="text-3xl font-bold mt-2 text-green-400">
                            +${totalIncome.toLocaleString()}
                        </h2>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl">
                        <ArrowDownLeft className="w-6 h-6 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Income History</h2>
                    <span className="text-sm text-gray-400">{incomeTransactions.length} transactions</span>
                </div>

                {incomeTransactions.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-white">No incomes yet</h3>
                        <p className="text-gray-400 mt-1">Add your first income record</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {incomeTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                                            {tx.description}
                                        </h3>
                                        <p className="text-sm text-gray-400">{tx.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-lg font-bold text-green-400">
                                        +${tx.amount.toLocaleString()}
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(tx)}
                                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction(tx.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
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
