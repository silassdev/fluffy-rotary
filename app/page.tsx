"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Activity, Users, ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-br from-indigo-500/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-sky-500/10 to-transparent blur-[120px]" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="text-white" size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">Hub</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold hover:text-indigo-600 transition-colors">Sign in</Link>
          <Link href="/signup" className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">Get Started</Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mb-8">
              <Sparkles className="text-indigo-600 dark:text-indigo-400" size={14} />
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">The Intelligent IDE for Prompts</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-[900] tracking-tight leading-[1.05] text-slate-900 dark:text-white mb-8">
               Engineer. Test. <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">Benchmark.</span>
            </h1>

            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-12">
              The premier SaaS platform for teams to design, iterate, and validate prompts across any LLM. Single-click benchmarks, automated pipelines, and team-wide version control.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/dashboard/designer" 
                className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/25 hover:bg-indigo-700 transition-all"
              >
                Create a prompt
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/dashboard/benchmark" 
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                Run benchmark
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4 text-slate-400 dark:text-slate-500">
               <p className="text-sm font-medium uppercase tracking-widest text-[10px]">Trusted by elite AI labs</p>
               <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/40 shadow-2xl p-2 overflow-hidden">
               <div className="bg-slate-50 dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-900">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/40" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/40" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
                     </div>
                     <span className="text-[10px] font-mono text-slate-400">blueprint_v4.prompt</span>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-slate-200/20 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-800/40">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System</p>
                       <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">You are a helpful assistant.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                       <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Template</p>
                       <p className="text-lg text-slate-800 dark:text-slate-100 font-mono leading-relaxed">
                          Summarize the text below <br />
                          in 2 sentences: <br />
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{"{{text}}"}</span>
                       </p>
                    </div>

                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
                        <span className="text-[11px] font-bold text-slate-400 uppercase mr-2">DETECTED:</span>
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">text</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100 dark:border-slate-900">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Industrial Strength Features</h2>
          <p className="text-slate-500 dark:text-slate-400">Building AI products requires more than just a playground.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Terminal size={24} />}
            title="Template Designer" 
            desc="Create reusable templates with live variable extraction and version control." 
          />
          <FeatureCard 
            icon={<Zap size={24} />}
            title="Pipelines" 
            desc="Chain complex prompts together for multi-step AI orchestration." 
          />
          <FeatureCard 
            icon={<Activity size={24} />}
            title="Benchmarking" 
            desc="Run massive parallel tests against datasets to measure cost and latency." 
          />
          <FeatureCard 
            icon={<Users size={24} />}
            title="Team Workspaces" 
            desc="Collaborate with shared environments, reviews, and role-based access." 
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
