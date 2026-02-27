'use client';
import React from 'react';
import Link from 'next/link';
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
  onToggleSidebar?: () => void;
  mobileOpen?: boolean;
}

export default function Navbar({ onToggleSidebar, mobileOpen }: NavbarProps) {
  return (
    <nav className="h-16 bg-white border-b flex items-center px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        {onToggleSidebar ? (
          <button
            className="p-2 rounded-md md:hidden hover:bg-slate-100"
            onClick={onToggleSidebar}
            aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        ) : (
          <div className="w-10" />
        )}

        <Link href="/dashboard">
          <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-400">PEH</span>
        </Link>
        <span className="text-sm text-slate-500 hidden md:inline">Prompt Engineering Hub</span>
      </div>

      <div className="ml-6 flex-1">
        <div className="max-w-md">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch />
            </span>
            <input
              className="placeholder:slate-400 block w-full rounded-md border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm focus:border-indigo-300 focus:outline-none"
              placeholder="Search prompts, pipelines, datasets..."
            />
          </label>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-slate-100" aria-label="Notifications">
          <FiBell />
        </button>
        <button className="p-2 rounded-md hover:bg-slate-100" aria-label="Profile">
          <FiUser />
        </button>
      </div>
    </nav>
  );
}