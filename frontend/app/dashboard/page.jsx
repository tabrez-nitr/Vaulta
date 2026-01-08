'use client'
import React, { useState, useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Wallet, Plus, TrendingUp, TrendingDown, Clock, Trash2, Pencil } from 'lucide-react'
import AddTransaction from '@/components/AddTransaction'

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState(null)

    // Derived State: Calculate totals from transactions array
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

    const handleSaveTransaction = (transactionData) => {
        if (transactionData.id) {
            // Edit existing
            setTransactions(prev => prev.map(t =>
                t.id === transactionData.id
                    ? { ...t, ...transactionData }
                    : t
            ))
        } else {
            // Add new
            const newTransaction = {
                id: Date.now(),
                ...transactionData,
                date: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            setTransactions(prev => [newTransaction, ...prev])
        }
        setIsModalOpen(false)
        setEditingTransaction(null)
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            setTransactions(prev => prev.filter(t => t.id !== id))
        }
    }

    const openAddModal = () => {
        setEditingTransaction(null)
        setIsModalOpen(true)
    }

    const openEditModal = (transaction) => {
        setEditingTransaction(transaction)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-2">Overview of your finances</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95 group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add Transaction
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Balance Card */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Balance</p>
                                <h2 className={`text-3xl font-bold mt-2 transition-colors ${total >= 0 ? 'text-white group-hover:text-blue-400' : 'text-red-400 group-hover:text-red-300'}`}>
                                    ${total.toLocaleString()}
                                </h2>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Wallet className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Credit Card */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-green-500/30 transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Credit</p>
                                <h2 className="text-3xl font-bold mt-2 text-green-400">
                                    +${credit.toLocaleString()}
                                </h2>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <ArrowDownLeft className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Debit Card */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-red-500/30 transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Debit</p>
                                <h2 className="text-3xl font-bold mt-2 text-red-400">
                                    -${debit.toLocaleString()}
                                </h2>
                            </div>
                            <div className="p-3 bg-red-500/10 rounded-xl">
                                <ArrowUpRight className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                        {transactions.length > 0 && (
                            <span className="text-sm text-gray-400">{transactions.length} transactions</span>
                        )}
                    </div>

                    {transactions.length === 0 ? (
                        <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-medium text-white">No transactions yet</h3>
                            <p className="text-gray-400 mt-1">Add your first income or expense to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${tx.type === 'credit'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {tx.type === 'credit' ? (
                                                <TrendingUp className="w-6 h-6" />
                                            ) : (
                                                <TrendingDown className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                {tx.description}
                                            </h3>
                                            <p className="text-sm text-gray-400">{tx.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className={`text-lg font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(tx)}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tx.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                title="Delete"
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

            {/* Modal */}
            <AddTransaction
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTransaction}
                initialData={editingTransaction}
            />
        </div>
    )
}