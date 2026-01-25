'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname , useRouter} from 'next/navigation'
import { useTransactions } from '@/context/TransactionContext'
import { LayoutDashboard, Wallet, Plus, Check, X, Pencil, Trash2, ChevronLeft, ChevronRight, Disc, User, LogOut } from 'lucide-react'

export default function Sidebar({ isOpen = true, toggleSidebar }) {
    const pathname = usePathname()
    const router = useRouter()

    //to enter title of new input 
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [editingPageId, setEditingPageId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    //to fetch data based on page id
    const {fetchTransactions} = useTransactions()
    const api_url = process.env.NEXT_PUBLIC_SERVER_API
    const [pages, setPages] = useState([])


    const logout = async()=>{
        const api_req = `${api_url}/api/auth/logout`
        try {
            const response = await fetch(api_req, {
                method: 'POST',
                credentials: 'include',
            })
            if (response.ok) {
                console.log('Logout successful')
                router.push('/')
            }
        } catch (err) {
            console.log("Error logging out:", err)
        }
    }


    const fecthPages = async()=>{
        const api_req = `${api_url}/api/pages/all`
            try {
                const response = await fetch(api_req, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                    }
                })
                const data = await response.json()
                setPages(data.pages)
            } catch (err) {
                console.log("Error fetching pages:", err)
            }
    }

    //get all pages list 
    useEffect(() => {
        fecthPages()
    }, [])
   

    // Start editing
    const startEditing = (page) => {
        setEditingPageId(page._id)
        setEditTitle(page.title)
    }

    // Handle delete page
    const handleDeletePage = async (id) => {
        // if (!confirm("Are you sure you want to delete this page?")) return;

        try {
            const response = await fetch(`${api_url}/api/pages/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
            })
            if (response.ok) {
                setPages(pages.filter(p => p._id !== id))
                console.log(pages)
                fecthPages()
            }
          
        } catch (error) {
            console.log("Error deleting page:", error)
        }
    }

    // Handle update page
    const handleUpdatePage = async (id) => {
        try {
            console.log(`${api_url}/api/pages/${id}`)
            const response = await fetch(`${api_url}/api/pages/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title: editTitle })
            })
            if (response.ok) {
                setPages(pages.map(p => p._id === id ? { ...p, title: editTitle } : p))
                setEditingPageId(null)
                fecthPages()
            }

        } catch (error) {
            console.log("Error updating page:", error)
        }
    }

    // handel req to add new page 
    const handelAddNew = async (e) => {
        e.preventDefault();
        const api_req = `${api_url}/api/pages/create`

        try {
            const response = await fetch(api_req, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title })
            })
            if (!response.ok) return
            const newPage = await response.json()
            if (newPage && newPage._id) setPages([...pages, newPage])
        } catch (error) {
            console.log("Problem in creating new page : ", error)
        }
        setTitle("")
        setOpen(false)
        fecthPages()
    }

    const links = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    ]

    return (
        // Sidebar Container: 
        // Mobile: Fixed off-screen (-translate-x-full) when closed, slide-in (translate-x-0) when open. Always w-64.
        // Desktop: Always visible (md:translate-x-0). Width toggles between md:w-64 and md:w-20.
        <div className={`fixed left-0 top-0 h-screen z-50 bg-black border-r border-zinc-800 flex flex-col transition-all duration-300 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:${isOpen ? 'w-64' : 'w-20'}`}>
            
            {/* Logo Area */}
            <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'justify-center flex-col gap-4'}`}>
                <div className="flex items-center gap-3">
                    {/* The Glow Effect on the Icon */}
                    <div className="relative flex items-center justify-center">
                         <div className="absolute inset-0 bg-white blur-md opacity-20 rounded-full"></div>
                         <div className="bg-black border border-zinc-800 p-2 rounded-xl shrink-0 relative z-10">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    {isOpen && <h1 className="text-lg font-bold text-white tracking-tight">Vaulta</h1>}
                </div>
                
                <button 
                    onClick={toggleSidebar}
                    className={`p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors ${!isOpen && 'mt-2'}`}
                >
                    {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            // Active State: Removed hard white border, used bg-zinc-900
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-zinc-900 text-white'
                                : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
                                } ${!isOpen && 'justify-center px-2'}`}
                        >
                            <link.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                            {isOpen && <span className="text-sm font-medium">{link.name}</span>}
                        </Link>
                    )
                })}

                {/* Pages List Header */}
                {isOpen && (
                    <div className="pt-6 pb-2 px-3">
                        <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                            Pages
                        </p>
                    </div>
                )}

                {/* Pages List Items */}
                {isOpen && pages &&  pages.map((page) => (
                    //on click get all transactions of that page and set it to the transactions state
                    <div
                    onClick={()=>{fetchTransactions(page._id);}}
                     key={page._id} className="group relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-900/50 transition-all text-zinc-400 hover:text-white">
                        
                        {editingPageId === page._id ? (
                            <div className="flex flex-1 items-center gap-2 bg-black border border-zinc-800 rounded p-1">
                                <input
                                    autoFocus
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleUpdatePage(page._id);
                                        if (e.key === 'Escape') setEditingPageId(null);
                                    }}
                                    className="w-full bg-transparent text-sm text-white px-1 outline-none"
                                />
                                <button onClick={() => handleUpdatePage(page._id)} className="text-zinc-400 hover:text-white">
                                    <Check className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div
                                    className="flex-1 flex items-center gap-3 overflow-hidden cursor-pointer"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-white transition-colors shrink-0" />
                                    <span className="text-sm truncate">{page.title || 'Untitled'}</span>
                                </div>
                                
                                {/* Edit Actions - Only visible on hover */}
                                <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => startEditing(page)}
                                        className="p-1 text-zinc-500 hover:text-white transition-colors"
                                    >
                                        <Pencil className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePage(page._id)}
                                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {/* Add New Input / Button */}
                <div className="px-3 pt-2">
                    {open && isOpen ? (
                        <div className="flex w-full items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2.5 transition-all">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Name..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handelAddNew(e)
                                    if (e.key === 'Escape') setOpen(false)
                                }}
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                            />
                            <div className="flex gap-1">
                                <button onClick={handelAddNew} className="text-zinc-400 hover:text-white">
                                    <Check className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => isOpen ? setOpen(true) : toggleSidebar()}
                            className={`flex w-full items-center ${isOpen ? 'justify-start gap-2' : 'justify-center'} rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-700`}
                        >
                            <Plus className="h-4 w-4" />
                            {isOpen && "Create Page"}
                        </button>
                    )}
                </div>
            </nav>

            {/* User Footer - Styled to blend in */}
            <div className="relative">
                {isProfileMenuOpen && isOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-full px-3">
                         <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl shadow-black/50">
                            <Link 
                                href="/profile"
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                            <User className="w-4 h-4" />
                                View Profile
                            </Link>
                            <button 
                                onClick={() => logout()}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors text-left"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
                
                <div className={`p-4 border-t border-zinc-900 ${!isOpen && 'flex justify-center'}`}>
                    <div 
                        onClick={() => isOpen && setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className={`flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900/50 transition-colors cursor-pointer ${!isOpen && 'p-0'} ${isProfileMenuOpen && 'bg-zinc-900/50'}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-white font-medium shrink-0">
                            S
                        </div>
                        {isOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">sams tabrez</p>
                                <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}