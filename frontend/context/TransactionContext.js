'use client'
import { createContext , useContext , useState , useEffect } from 'react'
import axios from 'axios';

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) =>{
    
    //signal for edit transaction 
    const [editTransaction , setEditTransaction] = useState(false);
    const [editTransactionId , setEditTransactionId] = useState(null);

    //stores the id of the current page clicked 
    const [currentPage , setCurrentPage] = useState(null);

    //checks if the user is logged in 
    const [user , setUser ] = useState(null);
    const [pages, setPages] = useState([]);

    //function to load all the pages from the server 
    const load_pages = async()=>{
        console.log("Loading pages");
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.get(`${api_url}/pages/all`,{
                withCredentials: true,
            })
            console.log(response.data);
            setPages(response.data.pages);
        }catch(error){
            console.log(error);
        }
    }



    //function to create a new page
    const create_page = async(title)=>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.post(`${api_url}/pages/create`,{
                title: title
            },{
                withCredentials: true,
            })
            console.log(response.data);
            if(response.status === 201){
                await load_pages(); //reload pages after creating a new one
                console.log(response.data);
                
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }

    ///delete a page from the list and database 
    const delete_page = async(id) =>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.delete(`${api_url}/pages/${id}`,{
                withCredentials: true,
            })
            console.log(response.data);
            if(response.status === 200){
                await load_pages(); //reload pages after deleting a page
                console.log(response.data);
                
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }

    //edit a page 
    const edit_page = async(id, title)=>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.put(`${api_url}/pages/${id}`,{title: title} ,{
                withCredentials: true,
            })
            if(response.status === 200)
            {
                await load_pages();
                console.log(response.data);
                return true;
            }
        }catch(error)
        {
            console.log("Error While Editing " , error)
            return false;
        }
    }


    // Transactions Logic 
    const [transactions, setTransactions] = useState([]);
   //# need to add id 
    const load_transactions = async () => {
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try {
            const response = await axios.get(`${api_url}/transactions/${currentPage}`, {
                withCredentials: true,
            })
            console.log(response.data);
            console.log(response.data.transactions)
            if(response.status === 200){
                setTransactions(response.data.transactions);
                return true;
            }
            return false;
        } catch (error) {
            console.log("Error loading transactions:", error);
            return false;
        }
    }

    //# need to add id of the page in the transaction data 
    const add_transaction = async (transactionData) => {
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try {
            const response = await axios.post(`${api_url}/transactions/add/${currentPage}`, transactionData, {
                withCredentials: true,
            })
            if(response.status === 201){
                await load_transactions();
                return true;
            }
        } catch (error) {
            console.log("Error adding transaction:", error);
            return false;
        }
    }

    // get transactions of a specific page and when the page id changes 
    useEffect(()=>{
        if(currentPage){
            load_transactions();
        }
    },[currentPage])

    //delete a transaction from a page 
    const delete_transaction = async (transactionId) =>{
          
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.delete(`${api_url}/transactions/${currentPage}/${transactionId}`,{
                withCredentials: true,
            })
            if(response.status === 200){
                console.log(response.data);
                await load_transactions();
                return true;
            }
            return false;
        }catch(error){
            console.log("Error deleting transaction:", error);
            return false;
        }
    }

    //update a transaction in db 
    const update_transaction = async(transactionData) =>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.put(`${api_url}/transactions/${currentPage}/${editTransactionId}`,
                transactionData,
                {
                withCredentials: true,
            })
            if(response.status === 200){
                console.log(response.data);
                await load_transactions();
                return true;
            }
            return false;
        }catch(error){
            console.log("Error updating transaction:", error);
            return false;
        }
    }


     
    const  value = {
        user,
        setUser,
        pages,
        load_pages,
        create_page,
        delete_page,
        edit_page,
        transactions,
        load_transactions,
        add_transaction,
        delete_transaction,
        currentPage,
        setCurrentPage,
        editTransaction,
        setEditTransaction,
        setEditTransactionId,
        update_transaction,
    }
    return(
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);