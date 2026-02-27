'use client';
import React from 'react';
import Link from 'next/link';
import {
  FiLayers,
  FiCode,
  FiDatabase,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiHome,
} from 'react-icons/fi';

type Item = {
  href: string;
  label: string;
  icon: any;
};

const items: Item[] = [
  { href: '/dashboard', label: 'Home', icon: FiHome },
  { href: '/dashboard/designer', label: 'Designer', icon: FiCode },
  { href: '/dashboard/pipelines', label: 'Pipelines', icon: FiLayers },
  { href: '/dashboard/datasets', label: 'Datasets', icon: FiDatabase },
  { href: '/dashboard/benchmark', label: 'Benchmark', icon: FiBarChart2 },
  { href: '/dashboard/community', label: 'Community', icon: FiUsers },
  { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
];

interface SidebarProps {
  onNavigate?: () => void; // called after clicking an item on mobile to close drawer
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6 px-2">
        <h2 className="text-xs text-slate-500 uppercase tracking-wider">Workspace</h2>
        <p className="text-sm font-medium mt-1">My Team</p>
      </div>

      <nav className="space-y-1 flex-1">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100"
            onClick={() => onNavigate?.()}
          >
            <it.icon className="text-lg" />
            <span className="text-sm">{it.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 px-3">
        <button className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:opacity-95">New Prompt</button>
      </div>
    </div>
  );
}