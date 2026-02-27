import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-slate-600">Welcome back — here's a quick overview.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-slate-500">Total Prompts</h3>
          <p className="text-2xl font-medium">42</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-slate-500">Pipelines</h3>
          <p className="text-2xl font-medium">8</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-slate-500">Datasets</h3>
          <p className="text-2xl font-medium">3</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-slate-500">Benchmark Runs</h3>
          <p className="text-2xl font-medium">12</p>
        </div>
      </div>

      <section className="mt-6">
        <div className="p-6 bg-white rounded-2xl shadow"> 
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-sm text-slate-500 mt-2">No recent runs. Create your first prompt or upload a dataset to get started.</p>
        </div>
      </section>
    </div>
  );
}