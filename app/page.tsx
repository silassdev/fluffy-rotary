// File: app/page.tsx  (fixed)
import React from 'react';
import Link from 'next/link';

export const revalidate = 0; // dev-friendly

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
              Prompt Engineering Hub
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Design, test and benchmark prompts for any large language model. Create pipelines, run
              automated benchmarks and collaborate with your team — all in one workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard/designer" className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow hover:opacity-95">
                Get started — Create a prompt
              </Link>

              <Link href="/dashboard/benchmark" className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                Run a benchmark
              </Link>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              Trusted by teams building AI products and research labs.
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-sm text-slate-500">Live preview</h3>

              {/* IMPORTANT: Make sure we pass a plain string as children to <pre>. */}
              <div className="mt-4 rounded-md border border-slate-100 p-4 bg-slate-50">
                <pre className="text-xs text-slate-700 whitespace-pre-wrap">{`System: You are a helpful assistant.\n\nPrompt: Summarize the text below in 2 sentences.\n\n{{text}}`}</pre>
              </div>

              <div className="mt-4 text-xs text-slate-500">Example variables: <code className="bg-slate-100 px-2 py-1 rounded">{'{{text}}'}</code></div>
            </div>

            <div className="absolute -right-8 -bottom-8 hidden md:block">
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-tr from-indigo-200 to-sky-200 opacity-70 transform rotate-6 shadow-2xl" />
            </div>
          </div>
        </div>

        <section className="mt-16 bg-white rounded-2xl p-8 shadow">
          <h2 className="text-xl font-semibold">What you can do</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature title="Template Designer" desc="Create reusable prompt templates with variables, versions and descriptions." />
            <Feature title="Pipelines" desc="Chain prompts for multi-step workflows and orchestration." />
            <Feature title="Benchmarking" desc="Run automated benchmarks over datasets with cost and latency metrics." />
            <Feature title="Team Workspaces" desc="Share, fork and review prompts with role-based access and approvals." />
          </div>
        </section>

        <section className="mt-10 text-center">
          <p className="text-sm text-slate-600">Want this scaffolded into your repo? I can generate the next UI pages, API routes, or the LLM proxy. Tell me which area to scaffold next.</p>
        </section>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-lg border border-slate-100 bg-white">
      <h4 className="text-sm font-medium text-slate-800">{title}</h4>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}
