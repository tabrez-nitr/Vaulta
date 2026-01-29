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


     
    const  value = {
        user,
        setUser,
        pages,
        load_pages,
        create_page,
        delete_page,
        edit_page,
    }
    return(
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);