'use client'
import React, { useState, useEffect } from 'react'
import { X, Check, DollarSign, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

function AddTransaction({ isOpen, onClose, onSave, initialData = null }) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('credit') // 'credit' or 'debit'

    // Reset or populate form when modal opens or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setAmount(initialData.amount.toString())
                setDescription(initialData.description || initialData.note) // Handle both description/note keys
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
            _id: initialData?._id, // Ensure we pass the ID for updates
            amount: parseFloat(amount),
            description,
            type
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 1. Backdrop: deeply blurred void */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* 2. Modal Card: Pure black with zinc border */}
            <div className="relative z-10 w-full max-w-md bg-black border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">
                            {initialData ? 'Edit Transaction' : 'New Entry'}
                        </h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Enter transaction details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* 3. Type Selection: Segmented Control Style */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
                        <button
                            type="button"
                            onClick={() => setType('credit')}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${type === 'credit'
                                    ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <ArrowDownLeft className={`w-4 h-4 ${type === 'credit' ? 'text-green-400' : ''}`} />
                            Credit
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('debit')}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${type === 'debit'
                                    ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <ArrowUpRight className={`w-4 h-4 ${type === 'debit' ? 'text-red-400' : ''}`} />
                            Debit
                        </button>
                    </div>

                    {/* 4. Amount Input: Minimalist, Mono-font */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DollarSign className="w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-xl font-mono rounded-xl pl-11 pr-4 py-3.5 focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 outline-none transition-all placeholder:text-zinc-700"
                            placeholder="Groceries, Salary, Rent..."
                            required
                        />
                    </div>

                    {/* 5. Submit Button: High Contrast White */}
                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl font-medium text-black bg-white hover:bg-zinc-200 border border-transparent active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        {initialData ? 'Update Transaction' : 'Save Transaction'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddTransaction