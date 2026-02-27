'use client';
import React from 'react';

export default function PromptEditor({ value = '', onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Prompt template</label>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full min-h-[220px] rounded-md border border-slate-200 p-3 text-sm"
        placeholder={'Example: Generate a friendly summary for the following text: {{text}}'}
      />

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">Save</button>
        <button className="px-4 py-2 rounded-md border text-sm">Preview</button>
      </div>
    </div>
  );
}
