import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 text-center">
      <div className="text-slate-400 text-sm font-medium">
        <p className="mb-2">Powered by Google Gemini 3 Flash</p>
        <p className="text-slate-300">© {new Date().getFullYear()} Sermonly. All rights reserved.</p>
      </div>
    </footer>
  );
};