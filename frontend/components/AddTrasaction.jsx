'use client'
import React, { useState } from 'react'
import { X, Check } from 'lucide-react'
import { useTransactionContext } from '@/context/TransactionContext'

function AddTrasaction({ addTransactionOpen, setAddTransactionOpen, editTransactionData }) {
  const { add_transaction, update_transaction, editTransaction, setEditTransaction } = useTransactionContext()
  
  const [formData, setFormData] = useState(() => {
    if (editTransaction && editTransactionData) {
      return {
        note: editTransactionData.title || editTransactionData.note,
        amount: editTransactionData.amount,
        date: new Date(editTransactionData.date).toISOString().split('T')[0],
        type: editTransactionData.type
      }
    }
    return {
      note: '',
      amount: '',
      date: new Date().toISOString().split('T')[0], // default to current date
      type: 'debit' // default to debit
    }
  })


  const [loading, setLoading] = useState(false)

  if (!addTransactionOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.note || !formData.amount) return

    setLoading(true)
    const success = editTransaction 
        ? await update_transaction(formData) 
        : await add_transaction(formData)
    setLoading(false)

    if (success) {
      setAddTransactionOpen(false)
      setEditTransaction(false)
      setFormData({ note: '', amount: '', date: new Date().toISOString().split('T')[0], type: 'debit' })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">
            {editTransaction ? 'Update Transaction' : 'Add Transaction'}
          </h2>
          <button 
            onClick={() => setAddTransactionOpen(false)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Type Selection */}
          <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'debit' })}
              className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                formData.type === 'debit'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Debit
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'credit' })}
              className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                formData.type === 'credit'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Credit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Title</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="e.g. Grocery Shopping"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all custom-date-icon"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.note || !formData.amount}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Check size={18} />
                <span>{editTransaction ? 'Update Transaction' : 'Save Transaction'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}



export default AddTrasaction