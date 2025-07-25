import React from 'react'
import { useState } from 'react'

function Sidebar() {

    const [sidebar , setSidebar] = useState(true)

  return (
    <div>
        <div>
            {/* sidebar button to open and close */}
            <button onClick={(e)=>{
                e.preventDefault
                setSidebar(!sidebar)}
            }><i className="ri-side-bar-line text-2xl p-2"></i></button>
        </div>

        {sidebar &&  <div className='transition-all p-4 duration-200 border-r-1 border-black/10 ease-in-out w-[18%] min-h-screen '>

           <div>
                 <h2 className='flex justify-center'>VAULTA</h2>

                 <div className='mt-10'>
                     <i className="ri-home-4-line text-xl mr-5"></i> HOME
                 </div>

                 <div>

                 </div>
           </div>
        </div>}

      
    </div>
  )
}

export default Sidebar
