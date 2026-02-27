import React from 'react';
import PromptEditor from '@/app/(dashboard)/designer/components/PromptEditor';

export default function DesignerPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Prompt Designer</h1>
        <div className="text-sm text-slate-500">Create templates, add variables and preview outputs.</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          <PromptEditor />
        </div>

        <aside className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Variables</h3>
          <p className="text-sm text-slate-500 mt-2">Define variables like <code>{{'{{text}}'}}</code>, <code>{{'{{user_name}}'}}</code> and preview.</p>
        </aside>
      </div>
    </div>
  );
}