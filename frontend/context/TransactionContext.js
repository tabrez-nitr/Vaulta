'use client'
import { createContext , useContext , useState } from 'react'
import axios from 'axios';

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) =>{
    
    //checks if the user is logged in 
    const [user , setUser ] = useState(null);
    const [pages, setPages] = useState([]);

    //function to load all the pages from the server 
    const load_pages = async()=>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API
        try{
            const response = await axios.get(`${api_url}/pages/all`,{
                withCredentials: true,
            })
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }



     
    const  value = {
        user,
        setUser,
        pages,
        load_pages
    }
    return(
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);