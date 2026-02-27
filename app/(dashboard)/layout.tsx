'use client';
import React, { useState } from 'react';
import Sidebar from '@/app/components/shared/Sidebar';
import Navbar from '@/app/components/shared/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar onToggleSidebar={() => setMobileOpen((s) => !s)} mobileOpen={mobileOpen} />

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="w-72 hidden md:block border-r bg-white/60 backdrop-blur-sm">
          <Sidebar />
        </aside>

        {/* Mobile sidebar (overlay) */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileOpen}
        >
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileOpen(false)}
          />

          {/* drawer */}
          <aside className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>

        <section className="flex-1 p-6 bg-slate-50">{children}</section>
      </div>
    </div>
  );
}
