import React, { useState } from 'react';
import { Copy, Check, Feather } from 'lucide-react';

interface SummaryResultProps {
  summary: string | null;
  loading: boolean;
}

export const SummaryResult: React.FC<SummaryResultProps> = ({ summary, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center space-y-6 min-h-[400px]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <Feather className="w-6 h-6 text-brand-300 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-slate-800 font-medium text-lg">설교 말씀을 묵상하고 있습니다</p>
          <p className="text-slate-400 text-sm">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30 m-2 group">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:shadow-md transition-shadow">
          <Feather className="w-8 h-8 text-slate-300 group-hover:text-brand-400 transition-colors" />
        </div>
        <p className="text-slate-500 font-medium">왼쪽에서 설교문을 입력하고 요약하기를 눌러주세요</p>
        <p className="text-slate-400 text-sm mt-1">AI가 핵심 내용을 정리해드립니다</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col animate-fade-in relative h-full">
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
         <div className="prose prose-slate max-w-none text-slate-700 leading-loose text-lg whitespace-pre-wrap font-sans">
          {summary}
         </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0">
        <span className="text-xs text-slate-400 font-medium px-2">
          {summary.length.toLocaleString()}자 요약됨
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 shadow-sm
            ${copied 
              ? 'bg-green-50 text-green-600 border border-green-200' 
              : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
            }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>복사 완료</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>텍스트 복사</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};