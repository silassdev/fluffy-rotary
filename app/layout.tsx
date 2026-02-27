import './globals.css';
import React from 'react';


export const metadata = {
  title: 'Prompt Engineering Hub',
  description: 'Design, test and benchmark prompts across LLMs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
