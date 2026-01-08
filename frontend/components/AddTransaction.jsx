'use client'
import React, { useState, useEffect } from 'react'
import { X, Check, DollarSign } from 'lucide-react'

function AddTransaction({ isOpen, onClose, onSave, initialData = null }) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('credit') // 'credit' or 'debit'

    // Reset or populate form when modal opens or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setAmount(initialData.amount.toString())
                setDescription(initialData.description)
                setType(initialData.type)
            } else {
                setAmount('')
                setDescription('')
                setType('credit')
            }
        }
    }, [isOpen, initialData])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || !description) return

        onSave({
            id: initialData?.id, // Pass back ID if editing
            amount: parseFloat(amount),
            description,
            type
        })

        // Close modal (state reset handled by useEffect on next open)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animation-fade-in-up m-4">

                {/* Header */}
                <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Type Selection */}
                    <div className="bg-zinc-950 p-1 rounded-xl flex gap-1">
                        <button
                            type="button"
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${type === 'credit'
                                    ? 'bg-zinc-800 text-green-400 shadow-sm'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                            onClick={() => setType('credit')}
                        >
                            Credit
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${type === 'debit'
                                    ? 'bg-zinc-800 text-red-400 shadow-sm'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                            onClick={() => setType('debit')}
                        >
                            Debit
                        </button>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Amount</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 text-white text-lg rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700"
                            placeholder="Ex: Groceries, Salary, Rent..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3.5 px-4 rounded-xl font-medium text-white shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${type === 'credit'
                                ? 'bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-900/20'
                                : 'bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-900/20'
                            }`}
                    >
                        <Check className="w-5 h-5" />
                        {initialData ? 'Save Changes' : (type === 'credit' ? 'Add Income' : 'Add Expense')}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddTransaction