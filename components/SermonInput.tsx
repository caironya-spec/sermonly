import React from 'react';

interface SermonInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const SermonInput: React.FC<SermonInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="relative group">
      <textarea
        className="w-full h-64 p-5 text-slate-700 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-100 focus:border-brand-400 focus:bg-white resize-none transition-all duration-300 placeholder-slate-400 text-base leading-relaxed outline-none"
        placeholder="요약하고자 하는 설교 본문을 여기에 붙여넣어주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400 bg-white/90 px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-100 backdrop-blur-sm transition-opacity opacity-70 group-hover:opacity-100">
        {value.length.toLocaleString()} 자
      </div>
    </div>
  );
};