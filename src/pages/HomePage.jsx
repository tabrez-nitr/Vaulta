import React from 'react'
import Navbar from '../components/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen w-full text-white bg-[#020617] relative">
  {/* Purple Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
    }}
  />
     <Navbar/>
     
</div>
  )
}

export default HomePage
