"use client";

import React, { useState, useEffect } from 'react';
import { Save, Play, Wand2 } from 'lucide-react';

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

  // Extract variables like {{variable_name}}
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [...template.matchAll(regex)];
    const extractedVars = Array.from(new Set(matches.map(m => m[1].trim())));
    setVariables(extractedVars);
  }, [template]);

  const handleSave = () => {
    onSave({ title, template, systemInstruction, model, variables });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Prompt"
          className="bg-transparent text-lg font-semibold text-slate-900 border-none focus:ring-0 w-full placeholder:text-slate-400"
        />
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Editor Area */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* System Instruction */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              System Instruction
            </label>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              placeholder="You are a helpful assistant..."
              className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Prompt Template */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Prompt Template
              </label>
              <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-2 py-1 rounded">
                <Wand2 size={12} />
                AI Optimize
              </button>
            </div>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="Enter your prompt here. Use {{variable}} for dynamic content."
              className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-base font-mono text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Sidebar/Controls */}
        <div className="w-full md:w-80 bg-slate-50/30 p-6 flex flex-col gap-8 overflow-y-auto">
          {/* Model Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Model Configuration
            </label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <optgroup label="OpenAI">
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </optgroup>
              <optgroup label="Anthropic">
                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
              </optgroup>
            </select>
          </div>

          {/* Detected Variables */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Detected Variables
            </label>
            <div className="flex flex-wrap gap-2">
              {variables.length > 0 ? (
                variables.map((v) => (
                  <span key={v} className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-mono border border-indigo-100">
                    {v}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No variables detected</span>
              )}
            </div>
          </div>

          {/* Preview/Test Trigger (Mock) */}
          <div className="mt-auto">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-semibold shadow-md">
              <Play size={16} fill="currentColor" />
              Test Run Prompt
            </button>
            <p className="mt-3 text-[10px] text-center text-slate-400">
              Run this prompt with sample inputs to see the model output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
