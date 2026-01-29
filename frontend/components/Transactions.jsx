'use client'
import React, { useEffect, useMemo, useState } from 'react'
import AddTrasaction from './AddTrasaction'
import { useTransactionContext } from '@/context/TransactionContext'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Plus,
  Calendar,
  Trash2,
  Pencil
} from 'lucide-react'

function Transactions() {
  const { transactions, load_transactions, delete_transaction, setEditTransaction, setEditTransactionId } = useTransactionContext()
  const [addTransactionOpen, setAddTransactionOpen] = useState(false)
  const [editTransactionData, setEditTransactionData] = useState(null)
  

  useEffect(() => {
    load_transactions()
  }, [])

  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    let income = 0
    let expense = 0

    if (transactions) {
      transactions.forEach(t => {
        const amount = Number(t.amount)
        if (t.type === 'credit') income += amount
        if (t.type === 'debit') expense += amount
      })
    }

    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    }
  }, [transactions])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const editTransaction = (id) => {
   setAddTransactionOpen(true)
   setEditTransaction(true)
   setEditTransactionId(id)
   const data = transactions.find(t => t._id === id)
   setEditTransactionData(data)

  }

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-black to-zinc-950 text-white px-4 md:px-6 py-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Transactions
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Track your income and expenses
            </p>
          </div>

          <button
            onClick={() => {
              setAddTransactionOpen(true)
              setEditTransaction(false)
              setEditTransactionData(null)
            }}
            className="flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded-xl font-medium
                       hover:bg-white transition active:scale-[0.97]"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Net Balance */}
          <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Net Balance</p>
              <div className="p-2 bg-zinc-800 rounded-lg">
                <Wallet size={20} />
              </div>
            </div>
            <div className="text-3xl font-semibold mt-3">
              {formatCurrency(netBalance)}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Available balance
            </p>
          </div>

          {/* Income */}
          <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Total Credit</p>
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <ArrowUpCircle size={20} className="text-emerald-500" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-emerald-500 mt-3">
              {formatCurrency(totalIncome)}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Total credited
            </p>
          </div>

          {/* Expense */}
          <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Total Debit</p>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <ArrowDownCircle size={20} className="text-red-500" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-red-500 mt-3">
              {formatCurrency(totalExpense)}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Total debited
            </p>
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>

          {transactions && transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between px-5 py-4
                             bg-zinc-900/60 border border-zinc-800 rounded-2xl
                             hover:bg-zinc-900 hover:border-zinc-700 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full
                      ${t.type === 'credit'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-red-500/10 text-red-500'}`}
                    >
                      {t.type === 'credit'
                        ? <ArrowUpCircle size={18} />
                        : <ArrowDownCircle size={18} />}
                    </div>

                    <div>
                      <p className="font-medium leading-tight">
                        {t.note || t.title}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(t.date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`text-lg font-semibold tabular-nums
                    ${t.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`}
                  >
                    {t.type === 'credit' ? '+' : '-'}
                    {formatCurrency(Number(t.amount))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => editTransaction(t._id)}
                      className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => delete_transaction(t._id)}
                      className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-14 text-zinc-500
                            bg-zinc-900/40 rounded-2xl border border-zinc-800 border-dashed">
              No transactions yet.
              <br />
              <span className="text-xs text-zinc-600">
                Your financial story starts here.
              </span>
            </div>
          )}
        </div>

        {addTransactionOpen && (
          <AddTrasaction
            addTransactionOpen={addTransactionOpen}
            setAddTransactionOpen={setAddTransactionOpen}
            editTransactionData={editTransactionData}
          />
        )}
      </div>
    </div>
  )
}

export default Transactions