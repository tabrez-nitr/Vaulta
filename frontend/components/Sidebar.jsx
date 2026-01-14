'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, TrendingDown, Wallet, Plus, Check, X, Pencil, Trash2 } from 'lucide-react'

export default function Sidebar() {
    const pathname = usePathname()

    //to enter title of new input 
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [editingPageId, setEditingPageId] = useState(null)
    const [editTitle, setEditTitle] = useState('')

    const api_url = process.env.NEXT_PUBLIC_SERVER_API
    const [pages, setPages] = useState([])


    //get all pages list 
    useEffect(() => {
        const getAllPages = async () => {
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
                console.log(data)
            } catch (err) {
                console.log("Error fetching pages:", err)
            }
        }
        getAllPages()
    }, [])

    // Start editing
    const startEditing = (page) => {
        setEditingPageId(page._id)
        setEditTitle(page.title)
    }

    // Handle delete page
    const handleDeletePage = async (id) => {
        if (!confirm("Are you sure you want to delete this page?")) return;

        try {
            const response = await fetch(`${api_url}/api/pages/delete`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id })
            })

            if (response.ok) {
                setPages(pages.filter(p => p._id !== id))
            } else {
                console.log("Failed to delete")
            }
        } catch (error) {
            console.log("Error deleting page:", error)
        }
    }

    // Handle update page
    const handleUpdatePage = async (id) => {
        try {
            const response = await fetch(`${api_url}/api/pages/update`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, title: editTitle })
            })

            if (response.ok) {
                setPages(pages.map(p => p._id === id ? { ...p, title: editTitle } : p))
                setEditingPageId(null)
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
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title })
            })

            if (!response.ok) {
                console.log("There was an error")
                return
            }

            const newPage = await response.json()
            console.log(newPage)
            if (newPage && newPage._id) {
                setPages([...pages, newPage])
            }

        } catch (error) {
            console.log("Problem in creating new page : ", error)
        }


        setTitle("")
        setOpen(false)
    }

    const links = [
        {
            name: 'Overview',
            href: '/dashboard',
            icon: LayoutDashboard
        },

    ]

    return (
        <div className="w-64 border-r border-zinc-800 bg-black flex flex-col h-screen fixed left-0 top-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                    <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Vaulta</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-600/10 text-blue-500'
                                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-500 group-hover:text-white'
                                }`} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    )
                })}

                {/* Pages List */}
                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Pages
                    </p>
                    {pages.length > 0 && pages.map((page) => (
                        <div key={page._id} className="group flex items-center gap-2 px-4 py-2 hover:bg-zinc-900 rounded-xl transition-all">
                            {editingPageId === page._id ? (
                                <div className="flex flex-1 items-center gap-2">
                                    <input
                                        autoFocus
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdatePage(page._id);
                                            if (e.key === 'Escape') setEditingPageId(null);
                                        }}
                                        className="w-full bg-zinc-800 text-sm text-white rounded px-2 py-1 outline-none"
                                    />
                                    <button onClick={() => handleUpdatePage(page._id)} className="text-green-500 hover:text-green-400">
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setEditingPageId(null)} className="text-red-500 hover:text-red-400">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={`/dashboard/${page._id}`}
                                        className="flex-1 flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-blue-500 transition-colors" />
                                        <span className="text-sm font-medium truncate">{page.title || 'Untitled'}</span>
                                    </Link>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEditing(page)}
                                            className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePage(page._id)}
                                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {open ? (
                    <div className="mt-2 flex w-full items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 transition-all border border-zinc-800">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Page Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handelAddNew(e)
                                if (e.key === 'Escape') setOpen(false)
                            }}
                            className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-500"
                        />
                        <button
                            onClick={handelAddNew}
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <Check className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray-500 hover:text-gray-400"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                    >
                        <Plus className="h-5 w-5" />
                        Add New
                    </button>
                )}
            </nav>

            {/* User/Footer Area (Optional) */}
            <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Sam Stabrez</p>
                        <p className="text-xs text-gray-500">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
