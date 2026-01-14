'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/router';

function Page() {
    // 1. State to manage form input values
    // const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // State for loading status and feedback messages
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const server_api = process.env.NEXT_PUBLIC_SERVER_API || 'http://localhost:8000'

    // 2. Handle input changes dynamically
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the page from reloading
        setIsLoading(true);
        setMessage('');

        console.log("Submitting:", formData);

        try {
            // 3. Changed method to POST to send data to backend
            // Appended 'signup' to the endpoint (adjust based on your actual backend route)
            const response = await fetch(`${server_api}/api/auth/register`, { 
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            console.log(data);

            if (response.ok) {
                setMessage('Account created successfully!');
            } else {
                setMessage('Registration failed. Check console.');
            }
            // useRouter.push('/')
        } catch (error) {
            console.log(error)
            setMessage('Server error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        // Main Container: Black background, centered content
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            
            {/* Card Container: White border, modern spacing */}
            <div className="w-full max-w-md bg-black border border-white/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                
                <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
                <p className="text-gray-400 text-center mb-8">Join us today</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Username Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Username</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="johndoe"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-neutral-900 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                            required 
                        />
                    </div>

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

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="mt-4 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {/* Status Message */}
                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Page