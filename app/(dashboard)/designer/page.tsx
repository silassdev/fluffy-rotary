"use client";

import React from 'react';
import PromptEditor from './components/PromptEditor';

export default function DesignerPage() {
  const handleSave = async (data: any) => {
    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save prompt');
      }

      const savedPrompt = await response.json();
      console.log("Saved prompt:", savedPrompt);
      alert("Prompt saved successfully!");
    } catch (error: any) {
      console.error("Error saving prompt:", error);
      alert(`Error saving prompt: ${error.message}`);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-[max(80vh,600px)]">
      <div className="flex flex-col h-full gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prompt Designer</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create and iterate on your LLM prompt templates.
          </p>
        </div>
        
        <div className="flex-1 min-h-0">
          <PromptEditor onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}