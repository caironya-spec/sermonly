import React from 'react';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40 shadow-sm">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-brand-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-brand-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight font-sans">Sermonly</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-slate-500 font-medium px-3 py-1 rounded-full bg-slate-100/50 border border-slate-200/50">
            Beta v1.0
          </div>
        </div>
      </div>
    </header>
  );
};