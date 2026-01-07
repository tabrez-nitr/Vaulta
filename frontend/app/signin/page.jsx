'use client'
import React, { useState } from 'react'
import Link from 'next/link' // Importing Link for navigation if you have a signup page route

function Page() {
    // 1. State for Login Credentials
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const server_api = process.env.NEXT_PUBLIC_SERVER_API || 'http://localhost:8000/'

    // 2. Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // 3. Handle Login Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Sending POST request to /login endpoint
            const response = await fetch(`${server_api}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            console.log(data);

            if (response.ok) {
                // Success logic (e.g., store token, redirect)
                alert("Login Successful!"); 
                // router.push('/dashboard') -> You would typically redirect here
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.log(err)
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            
            {/* Card Container */}
            <div className="w-full max-w-md bg-black border border-white/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                
                <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-400 text-center mb-8">Please enter your details</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-neutral-900 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                            required 
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-neutral-900 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                            required 
                        />
                    </div>

                    {/* Forgot Password & Error Display */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-red-400 min-h-[20px]">{error}</span>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Forgot Password?</a>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="mt-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Toggle to Sign Up */}
                <p className="mt-8 text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-white font-semibold hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Page