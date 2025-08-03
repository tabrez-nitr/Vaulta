import React from 'react'
import { useState } from 'react'

function Sidebar() {

    const [sidebar , setSidebar] = useState(true)

  return (
    <div className='border-r-1 text-[black]/70 flex-col p-2'>
        <div className='flex justify-end'> <i className=" text-2xl ri-sidebar-unfold-line"></i></div>
        <div className='mt-10'>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i>  January</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> Feburary</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> March</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> April</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> May</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> June</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> July</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> August</h1>
        <h1 className='p-1 hover:bg-gray-100 rounded-[4px]'><i className="ri-file-list-3-line"></i> Sept</h1>

        <div className='p-2'><button className=''>Add Page <i className="text-[18px] ri-add-line"></i></button></div>
        </div>
      
      
    </div>
  )
}

export default Sidebar
