'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowRightLeft,
  Wallet,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Pencil,
  Trash2,
  X
} from 'lucide-react'
import { useTransactionContext } from '@/context/TransactionContext'

const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Create new page state
  const [newPage, setNewPage] = useState("")
  const [newPageOpen, setNewPageOpen] = useState(false)

  // Context data
  const { pages, create_page , delete_page, edit_page } = useTransactionContext()

  // Handle create new page
  const handleCreatePage = async (e) => {
    e.preventDefault()
    if (!newPage.trim()) return
      
    //call create page pass new page name to it 
    await create_page(newPage)
    setNewPage("")


    setNewPageOpen(false)
  }

  // Edit state
  const [editingPageId, setEditingPageId] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")
  

  const startEditing = (e, page) => {
    e.preventDefault()
    e.stopPropagation() 
    setEditingPageId(page._id)
    setEditingTitle(page.title)
  }

  const cancelEditing = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setEditingPageId(null)
    setEditingTitle("")
  }


  //handel update page 
  const handleUpdatePage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!editingTitle.trim()) return
    
    
    await edit_page(editingPageId, editingTitle)
    setEditingPageId(null)
    setEditingTitle("")
  }



  //handel delete page 
  const handleDeletePage = async (e, pageId) => {
    e.preventDefault()
    e.stopPropagation() 
    if (confirm("Are you sure you want to delete this page?")) {
      await delete_page(pageId)
    }
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-zinc-800 bg-black transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* --- Collapse Toggle --- */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* --- Header / Logo --- */}
      <div className={`flex h-20 shrink-0 items-center border-b border-zinc-800 ${
        collapsed ? 'justify-center' : 'px-6 gap-3'
      }`}>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-white">
          <Wallet className="h-5 w-5" />
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight text-white">
            Vaulta
          </span>
        )}
      </div>

      {/* --- Scrollable Content Area --- */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {/* Main Navigation */}
        <nav className="space-y-1 px-3">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center rounded-lg transition-all group ${
                  collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'
                } ${
                  active
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                }`}
                title={collapsed ? item.name : ''}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                )}
                <item.icon className={`h-5 w-5 ${active ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`} />
                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Dynamic Pages Section */}
        {pages && (
          <div className="mt-8 space-y-1 px-3">
            {!collapsed && (
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Pages
                </p>
                <button 
                  onClick={() => setNewPageOpen(!newPageOpen)}
                  className="text-zinc-500 hover:text-white transition-colors p-1 rounded hover:bg-zinc-800"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            {/* New Page Input Form */}
            {newPageOpen && !collapsed && (
              <form onSubmit={handleCreatePage} className="mb-3 px-1 animate-in slide-in-from-left-2 duration-200">
                <div className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900/50 p-1 focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500">
                  <input
                    autoFocus
                    type="text"
                    value={newPage}
                    onChange={(e) => setNewPage(e.target.value)}
                    placeholder="Page Name"
                    className="w-full bg-transparent px-2 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    disabled={!newPage.trim()}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
                  >
                    <Check size={12} />
                  </button>
                </div>
              </form>
            )}

            {/* Pages List */}
            {pages.map((page) => {
              const pageHref = `/dashboard/${page._id}` 
              const active = pathname === pageHref
              const isEditing = editingPageId === page._id

              if (isEditing) {
                return (
                 <div key={page._id} className="relative flex items-center gap-1 rounded-lg bg-zinc-900/50 p-1 border border-zinc-700 my-1">
                    <input
                      autoFocus
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full bg-transparent px-2 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button 
                      onClick={handleUpdatePage}
                      className="text-zinc-400 hover:text-green-500 p-1"
                    >
                      <Check size={12} />
                    </button>
                    <button 
                      onClick={cancelEditing}
                      className="text-zinc-400 hover:text-red-500 p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )
              }

              return (
                <Link
                  key={page._id}
                  href={pageHref}
                  className={`relative flex items-center justify-between rounded-lg transition-all group ${
                    collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'
                  } ${
                    active 
                    ? 'bg-zinc-900 text-white' 
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                  }`}
                  title={collapsed ? page.title : ''}
                >
                   {active && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                  )}

                  <div className="flex items-center gap-3 overflow-hidden">
                    <ArrowRightLeft className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`} />
                    {!collapsed && (
                      <span className="text-sm font-medium truncate">
                        {page.title}
                      </span>
                    )}
                  </div>

                  {/* Edit/Delete Actions (visible on group hover) */}
                  {!collapsed && (
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => startEditing(e, page)}
                        className="p-1 text-zinc-500 hover:text-white transition-colors"
                      >
                        <Pencil size={12} />
                      </button>
                      <button 
                        onClick={(e) => handleDeletePage(e, page._id)}
                        className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* --- Footer / User Card --- */}
      <div className="shrink-0 border-t border-zinc-800 p-4 bg-black">
        <div className={`flex items-center rounded-xl bg-zinc-900/60 p-3 transition-all hover:bg-zinc-900 cursor-pointer ${
          collapsed ? 'justify-center' : 'gap-3'
        }`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white">
            <User size={18} />
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">John Doe</p>
                <p className="truncate text-xs text-zinc-500">Free Plan</p>
              </div>
              <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar