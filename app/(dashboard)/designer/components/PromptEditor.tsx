"use client";

import React, { useState, useEffect } from 'react';
import { Save, Play, Wand2, Sparkles, ChevronRight, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptEditorProps {
  initialData?: {
    title: string;
    template: string;
    systemInstruction: string;
    model: string;
  };
  onSave: (data: any) => void;
}

export default function PromptEditor({ initialData, onSave }: PromptEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [template, setTemplate] = useState(initialData?.template || "");
  const [systemInstruction, setSystemInstruction] = useState(initialData?.systemInstruction || "");
  const [model, setModel] = useState(initialData?.model || "gpt-4o");
  const [variables, setVariables] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Extract variables like {{variable_name}}
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [...template.matchAll(regex)];
    const extractedVars = Array.from(new Set(matches.map(m => m[1].trim())));
    setVariables(extractedVars);
  }, [template]);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave({ title, template, systemInstruction, model, variables });
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Premium Header */}
      <div className="px-8 py-5 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="text-white" size={20} fill="currentColor" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name your masterpiece..."
            className="bg-transparent text-xl font-bold text-slate-900 dark:text-white border-none focus:ring-0 w-full placeholder:text-slate-400/60 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : (
              <>
                <Save size={18} />
                Save Prompt
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-white/20 dark:bg-slate-900/10">
        {/* Editor Area */}
        <div className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto">
          {/* System Instruction */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                System Persona
              </label>
            </div>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              placeholder="Example: You are an expert Python developer who prioritizes clean code..."
              className="w-full h-28 p-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-700 dark:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner-sm resize-none"
            />
          </motion.div>

          {/* Prompt Template */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col min-h-[350px] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Prompt Blueprint
                </label>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-all border border-indigo-100/50">
                <Wand2 size={14} />
                Optimize with AI
              </button>
            </div>
            <div className="flex-1 relative group">
              <textarea
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                placeholder="Write your prompt here. Hint: use {{variable_name}} to create dynamic fields."
                className="w-full h-full p-6 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-3xl text-lg font-mono text-slate-800 dark:text-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner resize-none scroll-smooth"
              />
              <div className="absolute right-4 bottom-4 opacity-0 group-focus-within:opacity-100 transition-opacity">
                 <span className="text-[10px] text-slate-400 font-mono">MD Supported</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Panel */}
        <div className="w-full lg:w-96 bg-slate-50/80 dark:bg-slate-900/80 border-l border-slate-200/60 dark:border-slate-800/60 p-8 flex flex-col gap-10 overflow-y-auto">
          {/* Model Config */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings size={16} className="text-slate-400" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Intelligence</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <label className="block text-[10px] font-bold text-slate-400 mb-1">SELECTED MODEL</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-200 focus:ring-0 border-none p-0 cursor-pointer"
                >
                  <optgroup label="OpenAI">
                    <option value="gpt-4o">GPT-4o (Most Intelligent)</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  </optgroup>
                  <optgroup label="Anthropic">
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </section>

          {/* Variables Panel */}
          <section className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <ChevronRight size={16} className="text-slate-400" />
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interface Variables</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <AnimatePresence mode="popLayout">
                {variables.length > 0 ? (
                  variables.map((v) => (
                    <motion.span 
                      key={v}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold tracking-wide shadow-md shadow-indigo-500/20"
                    >
                      {v}
                    </motion.span>
                  ))
                ) : (
                  <div className="w-full p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                    <p className="text-xs text-slate-400 italic leading-relaxed"> No variables found in blueprint</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Action Trigger */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <motion.button 
              whileHover={{ y: -2 }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl"
            >
              <Play size={18} fill="currentColor" />
              <span className="font-extrabold text-sm tracking-tight">EXECUTE TEST RUN</span>
            </motion.button>
            <p className="mt-4 text-center text-[11px] text-slate-400 leading-normal">
              Trial the prompt logic before committing to production production.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
