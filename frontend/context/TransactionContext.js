'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import AddTransaction from '@/components/AddTransaction'

const TransactionContext = createContext()

export function useTransactions() {
    return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState(null)

    // Load from local storage on mount (optional but good for persistence in simple apps)
    // For now we'll stick to in-memory as per original, but can be easily extended.

    const addTransaction = (transactionData) => {
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
        setIsModalOpen(false)
    }

    const editTransaction = (transactionData) => {
        setTransactions(prev => prev.map(t =>
            t.id === transactionData.id
                ? { ...t, ...transactionData }
                : t
        ))
        setEditingTransaction(null)
        setIsModalOpen(false)
    }

    const deleteTransaction = (id) => {
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

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingTransaction(null)
    }

    const handleSave = (data) => {
        if (data.id) {
            editTransaction(data)
        } else {
            addTransaction(data)
        }
    }

    const value = {
        transactions,
        isModalOpen,
        editingTransaction,
        addTransaction,
        editTransaction,
        deleteTransaction,
        openAddModal,
        openEditModal,
        closeModal
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
            <AddTransaction
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                initialData={editingTransaction}
            />
        </TransactionContext.Provider>
    )
}
