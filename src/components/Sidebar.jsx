import React from 'react'
import { useState } from 'react'
import { useVaulta } from '../context/VaultaContext'
import { v4 as uuidv4 } from 'uuid';

function Sidebar() {

  // this components conatain sidebar as well as creation of new notion card 


    const [sidebar , setSidebar] = useState(true)
    const { storeElem , setStoreElem  } = useVaulta();
    const [ notionCardName , setNotionCardName ] = useState(""); // to store name of pages like notion 
    const [ inputNotionCardName , setInputNotionCardName] = useState(false); // to diplay input name when the user clicks add new page 

    
    // creates new page or card like notion 
    const notionCard = () => {
      setStoreElem([ {
        id :  uuidv4(),
        name : notionCardName ,
        transactions : []
      } ,...storeElem])
    }

  return (
    <div className='border-r-1 text-[black]/70 flex-col p-2 px-5'>
        
          <div className='flex  py-2'>
            <i className="text-3xl text-[#3B38A0]/100 ri-wallet-3-fill"></i>
            <div className='flex text-[18px] font-semibold items-center ml-3'> <h1>Vaulta</h1></div> 

          </div>
            
          <div className='mt-5 border-b  px-3 flex justify-between border-[black]/20'>
            <h1 className=' font-semibold '>Transaction Book</h1>
            <button className='text-[17px] font-semibold' type='button' onClick={()=>setInputNotionCardName(!inputNotionCardName)}>+</button>
          </div>

          {/* input name for notion card  */}
          { inputNotionCardName && 
            <div className='mt-2 border-b px-1'>
              <input type="text" className='outline-none' value={notionCardName} onChange={(e) => setNotionCardName(e.target.value)} />
              <button className='text-[18px] font-semibold'><i className="ri-check-fill"></i></button>
            </div>
          }

          <div className='mt-2'>
            Jan
          </div>


          <button className='fixed bottom-5   flex gap-2 text-[black]/60 hover:text-red-400'><i className="text-[18px] ri-logout-box-r-line"></i><div className='flex items-center'>Logout</div></button>
        </div>
      
      
   
  )
}

export default Sidebar
