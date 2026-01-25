'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import AddTransaction from '@/components/AddTransaction'

const TransactionContext = createContext()

export function useTransactions() {
    return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
    //stores the transactions 
    const [transactions, setTransactions] = useState([])
    //opens the add transaction modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    //stores the transaction to be edited
    const [editingTransaction, setEditingTransaction] = useState(null)

    //stores the page id
    const [pageId, setPageId] = useState(null)

    // Load from local storage on mount (optional but good for persistence in simple apps)
    // For now we'll stick to in-memory as per original, but can be easily extended.


    


    //fetch the transactions ref to pageId 
    const fetchTransactions = async (pageId) => {
        //set page Id
        setPageId(pageId)
        console.log("Page ID:", pageId)
        console.log("Fetching transactions for page:", pageId)
        try{
            const api_url = process.env.NEXT_PUBLIC_SERVER_API;
            const response = await fetch(`${api_url}/api/transactions/getTransactions/${pageId}`,{
                credentials : 'include',
                headers : {
                    'content-type' : 'application/json',
                    'accept' : 'application/json',
                }
            })
            if(!response.ok) return
            const data = await response.json()
            console.log("Data received from API:", data)
            setTransactions(data)
        }catch(error)
        {
            console.log("Error fetching transactions:", error)
        }
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
    
    //open the add transaction modal
    const openAddModal = () => {
        setEditingTransaction(null)
        setIsModalOpen(true)
    }

    const openEditModal = (transaction) => {
        setEditingTransaction(transaction)
        setIsModalOpen(true)
    }
    
    //close the add transaction modal 
    const closeModal = () => {
        setIsModalOpen(false)
        setEditingTransaction(null)
    }

    //handle save transaction
    const handleSave = (data) => {
        if (data.id) {
            editTransaction(data)
        } else {
            addTransaction(data)
        }
    }



    //// all functions related to add transaction ////

    const addNewTransaction = async (transactionData) =>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API;
        console.log(" Inside addNewTransaction Page ID:", pageId)
        try{
           
           
            const response = await fetch(`${api_url}/api/transactions/add/${pageId}`,{
                method : "POST",
                credentials : "include",
                headers : {
                    "content-type" : "application/json",
                    "accept" : "application/json",
                },
                body : JSON.stringify(transactionData)
            })
            if(!response.ok) return
            const data = await response.json()
            console.log("Data received from API:", data)
            //display locally 
            addTransaction(data.transaction)
        }catch(error){
            console.log("Error While Adding New Transaction",error)
        }
    }
    // show this data on the screen 
    const addTransaction = (transactionData) => { 
     // Ensure we extract the array. If data itself is the array, keep as is.
     // If data is an object containing the array, access it (e.g., data.transactions).
    // Checks if prev is an array; if not, falls back to empty array []
    setTransactions(prev => [transactionData, ...(Array.isArray(prev) ? prev : [])])
    setIsModalOpen(false)
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
        closeModal,
        fetchTransactions,
        setPageId,
        addNewTransaction
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
            <AddTransaction
                isOpen={isModalOpen}
                onClose={closeModal}
                // onSave={handleSave}
                initialData={editingTransaction}
            />
        </TransactionContext.Provider>
    )
}
