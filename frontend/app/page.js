'use client'
import React from 'react'
import Link from 'next/link'
import { Wallet, Shield, Globe, ArrowRight, BarChart3, Lock, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative flex items-center justify-center group">
                 <div className="absolute inset-0 bg-white blur-md opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
                 <div className="bg-black border border-zinc-800 p-2 rounded-xl shrink-0 relative z-10">
                    <Wallet className="w-5 h-5 text-white" />
                </div>
            </div>
            <span className="text-xl font-bold tracking-tight">Vaulta</span>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/signin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                v2.0 is now live
            </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 pb-2">
            Master Your Money <br /> with Vaulta
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Smart, simple, and secure financial tracking for the modern pro. 
            Visual analytics, real-time insights, and vault-grade security.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-3.5 bg-zinc-900 text-white font-medium rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Hero Visual/Dashboard Mockup */}
        <div className="mt-20 max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 opacity-50"></div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur p-2 shadow-2xl shadow-zinc-900/50">
                 <div className="rounded-lg bg-black border border-zinc-900 aspect-video overflow-hidden relative flex items-center justify-center group">
                    <div className="text-zinc-700 text-lg font-mono flex flex-col items-center gap-4 opacity-50 group-hover:opacity-80 transition-opacity duration-700">
                        <BarChart3 className="w-16 h-16" />
                        <span>Interactive Dashboard Preview</span>
                    </div>
                    {/* Abstract UI Elements */}
                    <div className="absolute top-8 left-8 right-8 h-px bg-zinc-800"></div>
                    <div className="absolute top-8 left-20 w-px h-full bg-zinc-800"></div>
                    <div className="absolute bottom-12 right-12 w-32 h-24 bg-zinc-800/20 rounded-lg"></div>
                 </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl font-bold">Why Vaulta?</h2>
                <p className="text-zinc-500">Everything you need to control your financial future.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: BarChart3,
                        title: "Smart Analytics",
                        desc: "Visualize your spending habits with beautiful, clear charts.",
                        color: "text-blue-400"
                    },
                    {
                        icon: Lock,
                        title: "Secure Vault",
                        desc: "Bank-grade encryption keeps your financial data 100% private.",
                        color: "text-emerald-400"
                    },
                    {
                        icon: Zap,
                        title: "Real-time Sync",
                        desc: "Instant updates across all your devices, anywhere in the world.",
                        color: "text-amber-400"
                    }
                ].map((feature, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-zinc-900/20 border border-zinc-800 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300">
                        <div className={`w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-zinc-900 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-zinc-600" />
                <span className="text-zinc-600 font-medium">Vaulta</span>
            </div>
            <p className="text-sm text-zinc-600">
                &copy; {new Date().getFullYear()} Vaulta Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-zinc-600">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
        </div>
      </footer>
    </div>
  )
}
