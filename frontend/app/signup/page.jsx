'use client'
import React from 'react'
import Link from 'next/link'
import { Wallet, Mail, Lock, ArrowRight, User } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignUp() {
     

    const router = useRouter()

    //form data 
    const [name , setName ] = useState('')
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')

    //error 
    const [error , setError ] = useState(false)
    //server error 
    const [serverError , setServerError ] = useState(false)


   const handelSignUp = async (e) => {
    e.preventDefault()
    if(!name || !email || !password){
        setError(true)
        return
    }
    setError(false)

    const api_url = process.env.NEXT_PUBLIC_SERVER_API

    try{
         const form_data = {
            name, 
            email,
            password
         }
         console.log(`${api_url}/auth/register`)
          const response = await axios.post(`${api_url}/auth/register`,form_data,{
               headers : {
                  'Content-Type' : 'application/json'
               },
               withCredentials : true
         })
         console.log(response)
         
         router.push('/signin')


    }catch(error){
        console.log(error)
        setServerError(true)
        return
    }
   }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-160 h-160 bg-zinc-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-160 h-160 bg-zinc-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Header */}
        <div className="mb-8 text-center space-y-4">
          <Link href="/" className="inline-flex items-center justify-center group">
             <div className="relative">
                 <div className="absolute inset-0 bg-white blur-lg opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                 <div className="bg-black border border-zinc-800 p-3 rounded-xl relative z-10 group-hover:border-zinc-700 transition-colors duration-300">
                    <Wallet className="w-6 h-6 text-white" />
                </div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
            Create Account
          </h1>
          <p className="text-zinc-500 text-sm">
            Join the future of financial tracking today.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/5">
          <form className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex items-center justify-between ml-1">
                 <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Password</label>
               </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] group"
              onClick={handelSignUp}
            >
              Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="text-white font-medium hover:underline decoration-zinc-500 decoration-1 underline-offset-4 transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}