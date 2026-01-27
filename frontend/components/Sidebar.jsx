'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowRightLeft,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Transactions', icon: ArrowRightLeft, href: '/transactions' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Wallets', icon: Wallet, href: '/wallets' },
    { name: 'Settings', icon: Settings, href: '/settings' }
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 border-r border-zinc-800 bg-black transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`flex h-20 items-center border-b border-zinc-800 ${
        collapsed ? 'justify-center' : 'px-6 gap-3'
      }`}>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-2">
          <Wallet className="h-5 w-5" />
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight">
            Vaulta
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-3">
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center rounded-lg transition-all ${
                collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'
              } ${
                active
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
              }`}
              title={collapsed ? item.name : ''}
            >
              {/* Active glow bar */}
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              )}

              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${
                active ? 'bg-zinc-800' : 'bg-transparent'
              }`}>
                <item.icon className="h-5 w-5" />
              </div>

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Card */}
      <div className="absolute bottom-0 w-full border-t border-zinc-800 p-4">
        <div className={`flex items-center rounded-xl bg-zinc-900/60 p-3 ${
          collapsed ? 'justify-center' : 'gap-3'
        }`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
            <User size={18} />
          </div>

          {!collapsed && (
            <>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-zinc-500">Free Plan</p>
              </div>
              <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
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