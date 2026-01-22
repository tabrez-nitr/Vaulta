'use client'
import React, { useEffect , useState } from 'react'



function page() {
      
    const [profile, setProfile ] = useState([])

    useEffect(()=>{
      
        const fetchProfile = async() =>{
        const api_url = process.env.NEXT_PUBLIC_SERVER_API

        console.log("calling profile ")

        try{
           const response = await fetch(`${api_url}/api/profile`,{
            method : "GET",
            credentials : "include",
            header : {
                contentType : "application/json"
            }
           })
           if(!response.ok){
             throw new Error("Failed to fetch profile")
             return 
           }
           const data = await response.json()
           console.log(data)
           setProfile(data)

        }catch(error){
            console.log("There was an error while fetching the profile" , error)

        }
    }
    fetchProfile()
    },[])

  return (
    <div>

    </div>
  )
}

export default page