import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className='flex justify-center'>
    <div className='absolute top-8 '>
        <div className='text-[15px]  font-thin  flex gap-50 p-4'>
            {/* for logo */}
           <div className='cursor-pointer'>
            Vaulta
            </div> 
           {/* for other sections like home and so on */}
           <div className=''>
            <ul className='flex cursor-pointer gap-5'>
                <li><Link to="">Home</Link></li>
                <li>Features</li>
                <li>Testimonies</li>
                <li>Guide</li>
                <li>Contact us</li>
            </ul>

           </div>
           {/* for sign in and sign up */}
           <div className='flex gap-4 '>
            <button className='cursor-pointer'>
                Sign Up
            </button>
            <button className='cursor-pointer'>
                <Link to="/mainapp">Login</Link>
                
            </button>
           </div>

        </div>
    </div>
</div>
  )
}

export default Navbar
